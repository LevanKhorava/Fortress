import Grain from "../components/Grain.tsx";
import Reveal from "../components/Reveal.tsx";
import fortress from "../assets/fortress.png";

const wordmark = "FORTRESS".split("");

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-900 py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 left-1/2 h-[34rem] w-[62rem] -translate-x-1/2 bg-radial from-ember-900/30 via-transparent to-transparent"
      />
      {/* Grain sits at roughly half its usual strength — this surface is quiet. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-55"
      >
        <Grain />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-14">
        {/* Closing flourish: the wordmark tracked out edge to edge. */}
        <Reveal from="up" distance={34} duration={900} threshold={0.05}>
          <div
            aria-hidden="true"
            className="flex w-full select-none justify-between overflow-hidden"
          >
            {wordmark.map((letter, i) => (
              <span
                key={`${letter}-${i}`}
                className="font-display text-outline-white block text-[clamp(3rem,16vw,13rem)] font-extrabold uppercase leading-[0.8] tracking-tight"
              >
                {letter}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal from="up" distance={22} duration={700}>
          <div className="mt-14 max-w-sm sm:mt-16">
            <div className="flex items-center gap-3">
              {/* Decorative: the wordmark beside it already names the club. */}
              <img src={fortress} alt="Fortress" className="h-14 w-20 " />
              <span className="font-display text-xl font-extrabold uppercase leading-none tracking-tight text-white">
                Black Fortress
              </span>
            </div>

            <p className="nums mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/50">
              Tbilisi · Founded 2025 · Superliga
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white/45 sm:text-base">
              Home games are played at The Fortress — Tbilisi Arena, 11,400
              seats deep and never once quiet in the fourth.
            </p>
          </div>
        </Reveal>

        <Reveal from="up" distance={16} duration={700} delay={120}>
          <div className="mt-14 flex flex-col items-center gap-6 border-t border-white/10 pt-8 text-center sm:mt-16 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-5 sm:text-left">
            <p className="nums text-xs text-white/50">
              © {year} Black Fortress Basketball Club. All rights reserved.
            </p>

            <p className="order-first text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/55 sm:order-none">
              <span className="text-white/45">Partners</span>{" "}
              <span className="text-white/70">Axion</span>{" "}
              <span aria-hidden="true" className="text-ember-500">
                ·
              </span>{" "}
              <span className="text-white/70">Altitude</span>
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

export default Footer;
