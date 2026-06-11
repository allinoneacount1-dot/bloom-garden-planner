import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/numina/Stub";

export const Route = createFileRoute("/aether")({
  head: () => ({
    meta: [
      { title: "The Aether — NÚMINA" },
      { name: "description", content: "Treasury, staking, and the energy that feeds every awakened Numen." },
    ],
  }),
  component: () => (
    <StubPage
      eyebrow="The Aether"
      title="The pool of energy."
      body="Stake $LMN to grant your Numina the energy they need to act. View treasury composition, energy flows, and the slow tides of the protocol's reserve."
      seed="aether-pool"
    />
  ),
});