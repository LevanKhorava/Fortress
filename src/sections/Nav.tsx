import { useEffect, useState } from "react";
import Grain from "../components/Grain.tsx";
import crowd from "../assets/crowd-duotone.jpg";
import { navLinks, sectionIds } from "../data/team.ts";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll.ts";
import { useReducedMotion } from "../hooks/useReducedMotion.ts";
import { useScrollSpy } from "../hooks/useScrollSpy.ts";
import fortress from "../assets/fortress.png";

function Nav() {
  const { progress, active, scrolled } = useScrollSpy(sectionIds);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useLockBodyScroll(open);

  // Escape closes the panel; so does crossing up to the lg breakpoint, where the
  // panel's own `lg:hidden` would otherwise leave `open` stale behind the bar.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    if (typeof matchMedia !== "function")
      return () => window.removeEventListener("keydown", onKey);
    const desktop = matchMedia("(min-width: 1024px)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <a
        href="#home"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-5 focus-visible:top-5 focus-visible:z-[60] focus-visible:bg-ember-500 focus-visible:px-4 focus-visible:py-2.5 focus-visible:font-display focus-visible:text-xs focus-visible:font-bold focus-visible:uppercase focus-visible:tracking-[0.2em] focus-visible:text-ink-950"
      >
        Skip to content
      </a>

      {/* The bar tightens once you leave the top. Only the colours are tweened —
          padding is a layout property, so it snaps rather than reflowing the
          header subtree every frame. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ease-[var(--ease-out-expo)] ${
          scrolled
            ? "border-white/10 bg-ink-950/95 py-2.5 sm:bg-ink-950/80 sm:backdrop-blur-xl"
            : "border-transparent bg-transparent py-4 sm:py-6"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-14">
          <a
            href="#home"
            onClick={close}
            className="group flex items-center gap-3 py-1.5"
            aria-label="Black Fortress — home"
          >
            <img
              src={fortress}
              alt="Black Fortress"
              className="h-[80px] w-[100px] shrink-0"
            />
          </a>

          <nav
            aria-label="Primary"
            className="hidden lg:flex lg:items-center lg:gap-1"
          >
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative px-4 py-3 font-display text-xs font-bold uppercase tracking-[0.28em] transition-colors duration-500 ease-[var(--ease-out-expo)] ${
                    isActive ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-4 bottom-1.5 h-px origin-left bg-ember-500 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="-mr-2 grid h-11 w-11 shrink-0 place-items-center lg:hidden"
            >
              <span aria-hidden="true" className="relative block h-3.5 w-6">
                <span
                  className={`absolute inset-x-0 top-0 h-[2px] origin-center bg-white transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-[6px] h-[2px] origin-left bg-ember-500 transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] ${
                    open ? "scale-x-0 opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-[12px] h-[2px] origin-center bg-white transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll progress. scaleX keeps it off the layout path entirely. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-linear-to-r from-ember-700 via-ember-500 to-ember-300"
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* Kept mounted so it can animate out; `invisible` also takes it out of the
          tab order and the accessibility tree while closed. */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 transition-[opacity,visibility] duration-500 ease-[var(--ease-out-expo)] lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden bg-ink-950"
        >
          <img
            src={crowd}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-[0.13] mask-fade-b"
          />
          <div className="absolute inset-0 bg-radial from-ember-900/25 to-transparent to-70%" />
          <Grain />
        </div>

        <div className="relative h-full overflow-y-auto overscroll-contain">
          <div className="mx-auto flex min-h-full w-full max-w-[1400px] flex-col px-5 pb-12 pt-28 sm:px-8 sm:pt-32">
            <nav aria-label="Mobile">
              <ul>
                {navLinks.map((link, index) => {
                  const isActive = active === link.id;
                  const delay = open && !reduced ? index * 70 : 0;
                  return (
                    <li
                      key={link.id}
                      className="border-b border-white/10 first:border-t"
                    >
                      <a
                        href={link.href}
                        onClick={close}
                        aria-current={isActive ? "page" : undefined}
                        className="group flex items-baseline gap-4 py-3 sm:gap-6"
                        style={{
                          opacity: open ? 1 : 0,
                          transform: open
                            ? "translate3d(0, 0, 0)"
                            : "translate3d(0, 30px, 0)",
                          transition: `opacity 620ms var(--ease-out-expo) ${delay}ms, transform 620ms var(--ease-out-expo) ${delay}ms`,
                        }}
                      >
                        <span className="font-display nums w-7 shrink-0 text-[0.68rem] font-bold tracking-[0.24em] text-ember-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-[clamp(2.2rem,11vw,4rem)] font-extrabold uppercase leading-[1.05] tracking-tight transition-colors duration-500 ease-[var(--ease-out-expo)] ${
                            isActive
                              ? "text-white"
                              : "text-white/70 group-hover:text-white"
                          }`}
                        >
                          {link.label}
                        </span>
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 12"
                          className={`ml-auto h-3 w-6 shrink-0 self-center transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 ${
                            isActive ? "text-ember-500" : "text-white/25"
                          }`}
                        >
                          <path
                            d="M0 6h21M16 1l5 5-5 5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div
              className="mt-auto pt-12"
              style={{
                opacity: open ? 1 : 0,
                transform: open
                  ? "translate3d(0, 0, 0)"
                  : "translate3d(0, 24px, 0)",
                transition: `opacity 620ms var(--ease-out-expo) ${
                  open && !reduced ? navLinks.length * 70 : 0
                }ms, transform 620ms var(--ease-out-expo) ${
                  open && !reduced ? navLinks.length * 70 : 0
                }ms`,
              }}
            >
              <p className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/50">
                The Fortress · Tbilisi Arena
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
