"use client";

import Image from "next/image";
import RegistrationForm from "@/components/RegistrationForm";
import { useLang, type Lang } from "@/components/i18n";

export default function Landing() {
  const { lang, setLang, t } = useLang();

  return (
    <main className="overflow-x-hidden">
      {/* ============ HEADER ============ */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Image
            src="/yugo-logo-white.png"
            alt="Yugo"
            width={155}
            height={68}
            priority
            className="h-8 w-auto sm:h-9"
          />

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher lang={lang} setLang={setLang} />
            <a
              href="https://yugolacartuja.com/"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white hover:text-aubergine"
            >
              <ArrowLeftIcon />
              {t.nav.back}
            </a>
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <Image
          src="/images/terraza.jpg"
          alt="Terraza de Yugo Cartuja en Sevilla con estudiantes"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-14 pt-28 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:pb-20 lg:pt-32">
          {/* Texto */}
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-coral px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
              {t.hero.badge}
            </span>
            <p className="mt-5 max-w-lg text-lg font-semibold text-white/90 drop-shadow-sm sm:text-xl">
              {t.hero.subtitle}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] text-white drop-shadow-sm sm:text-6xl">
              {t.hero.title}
            </h1>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/30 backdrop-blur">
                <PinIcon /> {t.hero.address}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/30 backdrop-blur">
                <ClockIcon /> {t.hero.times}
              </span>
            </div>
          </div>

          {/* Formulario */}
          <div id="reserva" className="scroll-mt-24">
            <RegistrationForm />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ===================== Selector de idioma ===================== */

function LanguageSwitcher({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div className="flex items-center rounded-full bg-white/15 p-0.5 ring-1 ring-white/30 backdrop-blur">
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase transition ${
            lang === l
              ? "bg-white text-aubergine"
              : "text-white/90 hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

/* ===================== Iconos ===================== */

function ArrowLeftIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function PinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
