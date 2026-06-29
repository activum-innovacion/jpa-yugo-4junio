import Image from "next/image";
import RegistrationForm from "@/components/RegistrationForm";

export default function Home() {
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
          <a
            href="#reserva"
            className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white hover:text-aubergine"
          >
            Reservar visita
          </a>
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
              Jornada de Puertas Abiertas
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-white drop-shadow-sm sm:text-6xl">
              Te esperamos el 4 de julio
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/90 drop-shadow-sm sm:text-xl">
              Visita, reserva y consigue el mayor descuento en tu habitación.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/30 backdrop-blur">
                <PinIcon /> C. Francisco de Xerez, 41092 Sevilla
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/30 backdrop-blur">
                <ClockIcon /> 10:30 · 12:00 · 13:30
              </span>
            </div>
          </div>

          {/* Formulario */}
          <div id="reserva" className="scroll-mt-24">
            <RegistrationForm
              heading="Reserva tu visita"
              subheading="Sábado 4 de julio · Plazas limitadas"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ===================== Iconos ===================== */

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
