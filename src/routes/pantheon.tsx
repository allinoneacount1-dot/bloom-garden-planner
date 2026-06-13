import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/numina/Header";
import { Footer } from "@/components/numina/Footer";
import { Sigil } from "@/components/numina/Sigil";
import { listPublicStrategies, cloneStrategy } from "@/lib/strategies.functions";
import { useAuth } from "@/lib/useAuth";

export const Route = createFileRoute("/pantheon")({
  head: () => ({
    meta: [
      { title: "The Pantheon — NÚMINA" },
      { name: "description", content: "Marketplace of strategies. Clone the Numina that have proven themselves before the Choir." },
    ],
  }),
  component: Pantheon,
});

type Risk = "all" | "low" | "medium" | "high";

function Pantheon() {
  const list = useServerFn(listPublicStrategies);
  const clone = useServerFn(cloneStrategy);
  const qc = useQueryClient();
  const { user } = useAuth();
  const [risk, setRisk] = useState<Risk>("all");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["strategies", "public"],
    queryFn: () => list(),
  });

  const cloneMut = useMutation({
    mutationFn: (id: string) => clone({ data: { id } }),
    onSuccess: () => {
      toast.success("Strategy cloned to your altar");
      qc.invalidateQueries({ queryKey: ["strategies", "public"] });
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error("Could not clone", { description: msg });
    },
  });

  const filtered = (data ?? []).filter((s) => risk === "all" || s.risk_level === risk);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="relative isolate">
        <div className="starfield absolute inset-0 -z-10 opacity-40" aria-hidden />
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-20">
          <div className="mb-10">
            <div className="font-display text-[11px] uppercase tracking-[0.4em] text-gold">The Pantheon</div>
            <h1 className="font-display mt-2 text-3xl text-hi md:text-4xl">Strategies of the elder Numina.</h1>
            <p className="mt-3 max-w-2xl text-sm text-mid">
              Clone a proven Numen with a single rite, or contribute your own to be judged by the Choir.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            {(["all", "low", "medium", "high"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRisk(r)}
                className={`rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-widest transition-all ${
                  risk === r ? "border-aether/60 bg-aether/10 text-hi" : "border-line bg-surface/40 text-mid hover:text-hi"
                }`}
              >
                {r === "all" ? "All risks" : r}
              </button>
            ))}
            <div className="ml-auto font-mono text-[10px] uppercase tracking-widest text-low">
              {isLoading ? "Reading the ledger…" : `${filtered.length} strateg${filtered.length === 1 ? "y" : "ies"}`}
            </div>
          </div>

          {error ? (
            <div className="ritual-border rounded-3xl p-8 text-center">
              <div className="font-display text-[10px] uppercase tracking-[0.4em] text-danger">The Pantheon is silent</div>
              <p className="mt-2 text-sm text-mid">{error instanceof Error ? error.message : "Failed to load"}</p>
              <button onClick={() => refetch()} className="mt-4 rounded-full border border-aether/60 bg-aether/10 px-5 py-2 text-xs uppercase tracking-widest text-aether hover:bg-aether/20">
                Try again
              </button>
            </div>
          ) : isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 animate-pulse rounded-3xl border border-line bg-surface/30" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="ritual-border rounded-3xl p-12 text-center">
              <div className="mx-auto w-fit opacity-40"><Sigil seed="empty-pantheon" size={120} /></div>
              <p className="mt-4 font-display text-sm text-mid">No strategies match this filter.</p>
              <p className="mt-1 text-xs text-low">Be the first to inscribe one.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s) => (
                <article key={s.id} className="ritual-border group flex flex-col rounded-3xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0"><Sigil seed={s.id} size={56} /></div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display truncate text-base text-hi">{s.title}</h3>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-low">
                        risk · {s.risk_level} · {s.clones} clones
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 line-clamp-3 text-xs text-mid">{s.description || "No description."}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-4">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-low">ROI</div>
                      <div className={`font-display text-sm ${(s.roi ?? 0) >= 0 ? "text-plasma" : "text-danger"}`}>
                        {s.roi != null ? `${s.roi >= 0 ? "+" : ""}${s.roi}%` : "—"}
                      </div>
                    </div>
                    {user ? (
                      <button
                        onClick={() => cloneMut.mutate(s.id)}
                        disabled={cloneMut.isPending}
                        className="rounded-full border border-gold/60 bg-gold/10 px-4 py-2 text-[10px] uppercase tracking-widest text-gold hover:shadow-[var(--glow-gold)] disabled:opacity-40"
                      >
                        {cloneMut.isPending && cloneMut.variables === s.id ? "Cloning…" : "Clone"}
                      </button>
                    ) : (
                      <Link to="/auth" className="rounded-full border border-aether/60 bg-aether/10 px-4 py-2 text-[10px] uppercase tracking-widest text-aether hover:bg-aether/20">
                        Sign in to clone
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}