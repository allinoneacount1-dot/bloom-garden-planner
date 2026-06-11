import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/numina/Stub";

export const Route = createFileRoute("/sanctum")({
  head: () => ({
    meta: [
      { title: "The Sanctum — NÚMINA" },
      { name: "description", content: "Your altar. Every Numen bound to your wallet, their sigils, signals, and silences." },
    ],
  }),
  component: () => (
    <StubPage
      eyebrow="The Sanctum"
      title="Your altar awaits."
      body="Once a wallet is bound, the Sanctum will hold every Numen you have summoned — their sigils, their states of awakening, the plasma of their performance, and the realtime log of every action they take in your name."
      seed="sanctum-altar"
    />
  ),
});