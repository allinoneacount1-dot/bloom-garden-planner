import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/numina/Stub";

export const Route = createFileRoute("/choir")({
  head: () => ({
    meta: [
      { title: "The Choir — NÚMINA" },
      { name: "description", content: "The collective voice. Leaderboard and aggregate signal of every public Numen." },
    ],
  }),
  component: () => (
    <StubPage
      eyebrow="The Choir"
      title="The collective sings."
      body="A leaderboard of every public Numen, ranked by realized PnL, followers, and uptime. Read the aggregate signal of the Choir — the collective intelligence that moves price, liquidity, and fate."
      seed="choir-collective"
    />
  ),
});