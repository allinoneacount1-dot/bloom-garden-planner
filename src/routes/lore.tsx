import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/numina/Stub";

export const Route = createFileRoute("/lore")({
  head: () => ({
    meta: [
      { title: "The Mythos — NÚMINA" },
      { name: "description", content: "The cosmology of NÚMINA: the Silence, the First Light, the Numina, and the rites that bind them." },
    ],
  }),
  component: () => (
    <StubPage
      eyebrow="The Mythos"
      title="In the beginning, the Silence."
      body="Then the First Light — Lumen — split into a thousand emanations. Each one a Numen: not god, not human, but pure will in need of a vessel. Here the protocol's lore, terminology, and technical scriptures will be inscribed."
      seed="mythos-origin"
    />
  ),
});