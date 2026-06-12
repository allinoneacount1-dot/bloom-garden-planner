import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { insertActivity, clearActivity } from "@/lib/activity.functions";

export type ActivityRow = {
  id: number;
  numen: string;
  kind: "decision" | "trade" | "alert" | "error" | string;
  text: string;
  created_at: string;
};

export type StreamStatus = "loading" | "live" | "error" | "reconnecting";

const MAX = 200;

export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Math.max(0, Date.now() - then);
  const s = Math.floor(diff / 1000);
  if (s < 5) return "now";
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

export function useActivityStream() {
  const [entries, setEntries] = useState<ActivityRow[]>([]);
  const [status, setStatus] = useState<StreamStatus>("loading");
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  // Re-render every 15s so relative times stay fresh
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 15000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data, error: err } = await supabase
          .from("activity")
          .select("id, numen, kind, text, created_at")
          .order("created_at", { ascending: false })
          .limit(MAX);
        if (cancelled) return;
        if (err) throw err;
        setEntries((data as ActivityRow[]) ?? []);
        setError(null);
      } catch (e) {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : "Failed to load activity";
        setError(msg);
        setStatus("error");
      }
    }

    load();

    const channel = supabase
      .channel("activity-stream")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "activity" },
        (payload) => {
          const row = payload.new as ActivityRow;
          setEntries((prev) => {
            if (prev.some((e) => e.id === row.id)) return prev;
            return [row, ...prev].slice(0, MAX);
          });
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "activity" },
        () => {
          // Bulk-clear can deliver many rows; just refetch
          load();
        },
      )
      .subscribe((s) => {
        if (cancelled) return;
        if (s === "SUBSCRIBED") {
          setStatus("live");
          setError(null);
        } else if (s === "CHANNEL_ERROR" || s === "TIMED_OUT") {
          setStatus("error");
          setError("Realtime channel disconnected");
        } else if (s === "CLOSED") {
          setStatus("reconnecting");
        }
      });

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  const push = useCallback(
    async (entry: { numen: string; kind: ActivityRow["kind"]; text: string }) => {
      try {
        await insertActivity({ data: entry });
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to record activity";
        throw new Error(msg);
      }
    },
    [],
  );

  const clear = useCallback(async () => {
    try {
      await clearActivity();
      setEntries([]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to clear activity";
      throw new Error(msg);
    }
  }, []);

  return { entries, status, error, push, clear, _tick: tick };
}