import { Link } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sigil } from "./Sigil";

export function StubPage({
  eyebrow,
  title,
  body,
  seed,
}: {
  eyebrow: string;
  title: string;
  body: string;
  seed: string;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="relative isolate overflow-hidden">
        <div className="starfield absolute inset-0 -z-10 opacity-50" aria-hidden />
        <section className="mx-auto grid min-h-[70vh] max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
          <div>
            <div className="font-display text-[11px] uppercase tracking-[0.4em] text-gold">{eyebrow}</div>
            <h1 className="font-display mt-4 text-5xl text-hi md:text-6xl">{title}</h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-mid">{body}</p>
            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-aether/40 bg-aether/5 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-aether">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-aether" />
              Awaiting consecration · v0.1 devnet
            </div>
            <div className="mt-10">
              <Link to="/" className="text-xs uppercase tracking-[0.25em] text-mid hover:text-hi">
                ← Return to the Gate
              </Link>
            </div>
          </div>
          <div className="relative flex items-center justify-center opacity-80">
            <div className="animate-pulse-glow">
              <Sigil seed={seed} size={420} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}