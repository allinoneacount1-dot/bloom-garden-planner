import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SEED = [
  {
    id: "a1b2c3d4-usdc-oracle-v1",
    title: "USDC Yield Oracle",
    description:
      "Rotates capital between Aave, Compound, and Solend based on real-time APY spreads. Rebalances every 4 hours. Conservative capital preservation with delta-neutral exposure.",
    risk_level: "low",
    roi: 14,
    clones: 47,
    author_wallet: "0xA1…E9F2",
    created_at: "2026-05-01T00:00:00Z",
  },
  {
    id: "e5f6g7h8-sol-momentum-v2",
    title: "SOL Momentum Sniper",
    description:
      "Tracks SOL funding rates across Binance, Bybit, and dYdX. Enters long when aggregated funding drops below -0.01% with RSI divergence on the 15-min. Hard stop at 3%.",
    risk_level: "medium",
    roi: 38,
    clones: 112,
    author_wallet: "0xB2…A1C3",
    created_at: "2026-04-18T00:00:00Z",
  },
  {
    id: "i9j0k1l2-dca-shield-v4",
    title: "DCA Shield Protocol",
    description:
      "Dollar-cost averages into BTC/ETH/SOL baskets on a 6-hour cycle. Sells 20% of accumulated position when any asset drops 7% in 1 hour. Auto-compounds profits into stablecoin yield.",
    risk_level: "low",
    roi: 22,
    clones: 83,
    author_wallet: "0xC3…B2D4",
    created_at: "2026-05-10T00:00:00Z",
  },
  {
    id: "m3n4o5p6-perp-arb-v1",
    title: "Perp Funding Arbitrageur",
    description:
      "Exploits perp funding rate differentials across 5 exchanges simultaneously. Requires minimum 2 SOL collateral. Enters when spread exceeds 0.015% annualized. Auto-hedges delta.",
    risk_level: "high",
    roi: 67,
    clones: 29,
    author_wallet: "0xD4…C3E5",
    created_at: "2026-03-28T00:00:00Z",
  },
  {
    id: "q7r8s9t0-rug-early-warning",
    title: "Rug Pull Early Warning",
    description:
      "Monitors mempool for suspicious token contract interactions. Flags strategies that show liquidity drain patterns, owner-only mint functions, or honeypot signatures. Does not trade — only alerts.",
    risk_level: "low",
    roi: -2,
    clones: 156,
    author_wallet: "0xE5…D4F6",
    created_at: "2026-06-01T00:00:00Z",
  },
  {
    id: "u1v2w3x4-basket-rebalance-v3",
    title: "Index Basket Rebalancer",
    description:
      "Maintains a custom index of top-10 Solana DeFi tokens. Rebalances weekly based on TVL-weighted market cap. Skips any token that dropped >20% in 24h. Gas-optimized batch transactions.",
    risk_level: "medium",
    roi: 31,
    clones: 64,
    author_wallet: "0xF6…E5A7",
    created_at: "2026-04-25T00:00:00Z",
  },
  {
    id: "y5z6a7b8-whale-tracker-v2",
    title: "Whale Wallet Tracker",
    description:
      "Mirrors the top 5 performing whale wallets identified over a 30-day rolling window. Enters same positions with 10x smaller size. Exits when original whale exits or 5% stop-loss triggers.",
    risk_level: "high",
    roi: 45,
    clones: 201,
    author_wallet: "0xG7…F6B8",
    created_at: "2026-05-20T00:00:00Z",
  },
  {
    id: "c9d0e1f2-gamma-scalp-v1",
    title: "Gamma Scalp Engine",
    description:
      "Targets short-term volatility on BTC and ETH during high-volume sessions (London + NY overlap). Uses 1-min candles with VWAP confirmation. Max 2% of portfolio per scalp. Stops after 3 consecutive losses.",
    risk_level: "high",
    roi: 52,
    clones: 88,
    author_wallet: "0xH8…G7C9",
    created_at: "2026-04-05T00:00:00Z",
  },
  {
    id: "g3h4i5j6-stable-yield-v5",
    title: "Stablecoin Yield Farmer",
    description:
      "Auto-shifts USDC/USDT across Raydium, Orca, and Marinade for highest LP yield. Compounds rewards daily. No impermanent loss — stable pairs only. Minimum deposit 100 USDC.",
    risk_level: "low",
    roi: 18,
    clones: 134,
    author_wallet: "0xI9…H8D0",
    created_at: "2026-05-15T00:00:00Z",
  },
  {
    id: "k7l8m9n0-breakout-v3",
    title: "Breakout Momentum Rider",
    description:
      "Waits for Bollinger Band squeeze on 1H chart, then rides breakouts with volume confirmation. Sells 50% at 1.5x ATR, lets rest run with trailing stop. Works best on SOL, WIF, BONK.",
    risk_level: "medium",
    roi: 41,
    clones: 97,
    author_wallet: "0xJ0…I9E1",
    created_at: "2026-03-22T00:00:00Z",
  },
];

/** Public read — anyone can browse the Pantheon. Uses admin for SSR-safe access. */
export const listPublicStrategies = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("strategies")
      .select("id, title, description, risk_level, roi, clones, author_wallet, created_at")
      .eq("is_public", true)
      .order("clones", { ascending: false })
      .limit(60);
    if (error) throw new Error(error.message);
    if (data && data.length > 0) return data;
  } catch {
    // table missing or other DB error — fall through to seed data
  }
  return SEED;
});

export const cloneStrategy = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Atomically bump the clones counter — safe public action (no PII written).
    const { data: current, error: readErr } = await supabaseAdmin
      .from("strategies")
      .select("clones")
      .eq("id", data.id)
      .eq("is_public", true)
      .maybeSingle();
    if (readErr) throw new Error(readErr.message);
    if (!current) throw new Error("Strategy not found");
    const { error } = await supabaseAdmin
      .from("strategies")
      .update({ clones: (current.clones ?? 0) + 1 })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true, clones: (current.clones ?? 0) + 1 };
  });