import Image from "next/image";
import Reveal from "@/components/Reveal";
import RegistrationForm from "@/components/RegistrationForm";

const ESPACIOS = [
  { src: "/images/habitacion-1.jpg", titulo: "Habitaciones", desc: "Estudios individuales con baño y cocina propios" },
  { src: "/images/sala-estudio.jpg", titulo: "Salas de estudio", desc: "Espacios pensados para concentrarte" },
  { src: "/images/sala-juegos.jpg", titulo: "Sala de juegos", desc: "Ping-pong, futbolín y zonas para desconectar" },
  { src: "/images/salon.jpg", titulo: "Zonas comunes", desc: "Salones para compartir y hacer comunidad" },
  { src: "/images/piscina.jpg", titulo: "Piscina", desc: "Piscina y solárium para disfrutar del verano sevillano" },
  { src: "/images/habitacion-2.jpg", titulo: "Tu nuevo hogar", desc: "Listo para que solo tengas que llegar y vivir" },
];

const HIGHLIGHTS = [
  { num: "232", label: "habitaciones individuales con baño y cocina" },
  { num: "0", label: "preocupaciones: agua, luz y gas incluidos" },
  { num: "24/7", label: "recepción y seguridad en la residencia" },
  { num: "1", label: "ubicación inmejorable, en pleno campus" },
];

const SERVICIOS = [
  "Piscina y terrazas",
  "Gimnasio",
  "Cine",
  "Sala de juegos",
  "Salas de estudio",
  "Cafetería",
  "Lavandería",
  "Wifi de alta velocidad",
  "Limpieza periódica",
  "En pleno campus universitario",
];

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
            Reservar plaza
          </a>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <Image
          src="/images/terraza.jpg"
          alt="Terraza de Yugo Cartuja en Sevilla con estudiantes"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-coral px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
              Jornada de Puertas Abiertas
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-white drop-shadow-sm sm:text-6xl">
              Puertas Abiertas en
              <br />
              Yugo Cartuja
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/90 sm:text-xl">
              ¿Estás buscando dónde vivir durante tu etapa universitaria? Ven a
              descubrir tu posible nuevo hogar en Sevilla.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/30 backdrop-blur">
                <CalendarIcon /> Sábado 4 de julio
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/30 backdrop-blur">
                <PinIcon /> Yugo Cartuja, Sevilla
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/30 backdrop-blur">
                <ClockIcon /> 10:30 · 12:00 · 13:30
              </span>
            </div>

            <a
              href="#reserva"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral px-7 py-4 text-lg font-bold text-white shadow-xl shadow-coral/30 transition hover:bg-coral-dark"
            >
              Reserva tu plaza
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* ============ INTRO ============ */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
              Comienza extraordinario
            </p>
            <h2 className="mt-4 text-3xl font-bold text-aubergine sm:text-4xl">
              Te invitamos a conocer Yugo Cartuja
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-aubergine/75">
              Durante nuestra jornada de puertas abiertas podrás visitar las
              habitaciones, descubrir todos los espacios comunes, conocer el
              ambiente de la residencia y resolver cualquier duda sobre tu futura
              experiencia universitaria.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ DETALLES DEL EVENTO ============ */}
      <section className="bg-lilac-bg py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="grid gap-5 md:grid-cols-3">
            <DetailCard
              icon={<CalendarIcon className="h-7 w-7" />}
              label="Fecha"
              value="Sábado 4 de julio"
            />
            <DetailCard
              icon={<PinIcon className="h-7 w-7" />}
              label="Lugar"
              value="Yugo Cartuja, Sevilla"
            />
            <DetailCard
              icon={<ClockIcon className="h-7 w-7" />}
              label="Horarios disponibles"
              value="10:30 · 12:00 · 13:30 h"
            />
          </Reveal>

          <Reveal className="mt-6 flex items-start gap-3 rounded-xl2 bg-amber/15 px-6 py-5 ring-1 ring-amber/30">
            <span className="mt-0.5 text-xl">⚠️</span>
            <p className="text-aubergine">
              <strong>Las plazas son limitadas.</strong> Te recomendamos reservar
              tu horario cuanto antes para poder organizar las visitas y atenderte
              de la mejor manera posible.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ ESPACIOS / GALERÍA ============ */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
              Descubre la residencia
            </p>
            <h2 className="mt-4 text-3xl font-bold text-aubergine sm:text-4xl">
              Todos los espacios que vas a vivir
            </h2>
            <p className="mt-4 text-lg text-aubergine/70">
              Desde tu habitación hasta la piscina: esto es solo una parte de lo
              que verás en la visita.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ESPACIOS.map((e, i) => (
              <Reveal
                key={e.titulo}
                delay={(i % 3) * 90}
                className="group relative overflow-hidden rounded-xl2 shadow-md"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={e.src}
                    alt={e.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-aubergine-deep/85 via-aubergine-deep/10 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 p-5 text-white">
                  <h3 className="text-xl font-bold">{e.titulo}</h3>
                  <p className="mt-1 text-sm text-white/85">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POR QUÉ YUGO ============ */}
      <section className="bg-aubergine py-20 text-white sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Mucho más que una habitación
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Una residencia nueva, en pleno campus, con todo lo que necesitas
              para vivir tu etapa universitaria al máximo.
            </p>
          </Reveal>

          <Reveal className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="text-center">
                <div className="font-display text-5xl font-extrabold text-amber">
                  {h.num}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  {h.label}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-16 flex flex-wrap justify-center gap-3">
            {SERVICIOS.map((s) => (
              <span
                key={s}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15"
              >
                {s}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ FORMULARIO ============ */}
      <section id="reserva" className="scroll-mt-8 bg-lilac-bg py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-coral">
                Reserva tu plaza
              </p>
              <h2 className="mt-4 text-3xl font-bold text-aubergine sm:text-4xl">
                Completa el formulario y te esperamos
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-aubergine/75">
                Rellena tus datos para que podamos reservarte una plaza en el
                horario que prefieras y enviarte toda la información necesaria
                para tu visita.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Visita las habitaciones y los espacios comunes",
                  "Conoce el ambiente de la residencia en persona",
                  "Resuelve todas tus dudas con nuestro equipo",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-aubergine/80">
                    <CheckBadge />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 hidden overflow-hidden rounded-xl2 lg:block">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/terraza.jpg"
                    alt="Estudiantes en la terraza de Yugo Cartuja"
                    fill
                    sizes="(max-width: 1024px) 0px, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <RegistrationForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-aubergine-deep py-14 text-white/80">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Image
                src="/yugo-logo-white.png"
                alt="Yugo"
                width={155}
                height={68}
                className="h-9 w-auto"
              />
              <p className="mt-4 max-w-sm text-sm text-white/60">
                Yugo Cartuja · Residencia de estudiantes en Sevilla. Comienza
                extraordinario.
              </p>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-white">Yugo Cartuja</p>
              <p className="mt-2 text-white/60">
                Francisco de Xerez, n.º 2
                <br />
                41092 Sevilla
              </p>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/45">
            © {new Date().getFullYear()} Yugo Cartuja · Jornada de Puertas Abiertas
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ===================== Sub-componentes ===================== */

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl2 bg-white p-7 text-center shadow-sm ring-1 ring-aubergine/5">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-coral/15 text-coral">
        {icon}
      </div>
      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-aubergine/50">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold text-aubergine">{value}</p>
    </div>
  );
}

/* ===================== Iconos ===================== */

function CalendarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CheckBadge() {
  return (
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral/15 text-coral">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}
