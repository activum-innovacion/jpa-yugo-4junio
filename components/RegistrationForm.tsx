"use client";

import { useState } from "react";

const HORARIOS = ["10:30", "12:00", "13:30"] as const;
const UNIVERSIDADES = ["ETSI", "FCOM", "DTX", "CESUR", "Otros"] as const;

type Status = "idle" | "loading" | "success" | "error";

export default function RegistrationForm() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [horario, setHorario] = useState<string>("");
  const [universidad, setUniversidad] = useState<string>("");
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [touched, setTouched] = useState(false);

  const horarioInvalid = touched && !horario;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!horario || !consent) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, telefono, email, horario, universidad }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "No hemos podido enviar tu reserva.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "No hemos podido enviar tu reserva."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl2 bg-white p-8 text-center shadow-xl ring-1 ring-aubergine/10 sm:p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-coral/15">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-8 w-8 text-coral"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-aubergine">
          ¡Plaza reservada!
        </h3>
        <p className="mt-3 text-aubergine/70">
          Hemos recibido tu reserva para la jornada de puertas abiertas del{" "}
          <strong>sábado 4 de julio</strong>
          {horario && (
            <>
              {" "}
              a las <strong>{horario} h</strong>
            </>
          )}
          . Te enviaremos por email toda la información para tu visita.
        </p>
        <p className="mt-6 text-sm text-aubergine/50">
          ¡Nos vemos en Yugo Cartuja!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl2 bg-white p-6 shadow-xl ring-1 ring-aubergine/10 sm:p-8"
    >
      <div className="grid gap-5">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="mb-1.5 block text-sm font-semibold text-aubergine">
            Nombre y apellidos
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            autoComplete="name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre completo"
            className="w-full rounded-xl border border-aubergine/15 bg-cream/40 px-4 py-3 text-aubergine outline-none transition focus:border-aubergine focus:ring-2 focus:ring-aubergine/20"
          />
        </div>

        {/* Teléfono + Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="telefono" className="mb-1.5 block text-sm font-semibold text-aubergine">
              Teléfono
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="600 123 456"
              className="w-full rounded-xl border border-aubergine/15 bg-cream/40 px-4 py-3 text-aubergine outline-none transition focus:border-aubergine focus:ring-2 focus:ring-aubergine/20"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-aubergine">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@email.com"
              className="w-full rounded-xl border border-aubergine/15 bg-cream/40 px-4 py-3 text-aubergine outline-none transition focus:border-aubergine focus:ring-2 focus:ring-aubergine/20"
            />
          </div>
        </div>

        {/* Horario */}
        <div>
          <span className="mb-1.5 block text-sm font-semibold text-aubergine">
            Elige tu horario de visita
          </span>
          <div className="grid grid-cols-3 gap-3">
            {HORARIOS.map((h) => {
              const selected = horario === h;
              return (
                <button
                  type="button"
                  key={h}
                  onClick={() => setHorario(h)}
                  aria-pressed={selected}
                  className={`rounded-xl border px-2 py-3 text-center font-semibold transition ${
                    selected
                      ? "border-aubergine bg-aubergine text-white shadow-md"
                      : "border-aubergine/15 bg-cream/40 text-aubergine hover:border-aubergine/40"
                  }`}
                >
                  {h} h
                </button>
              );
            })}
          </div>
          {horarioInvalid && (
            <p className="mt-2 text-sm text-coral-dark">
              Selecciona un horario para tu visita.
            </p>
          )}
        </div>

        {/* Universidad */}
        <div>
          <label htmlFor="universidad" className="mb-1.5 block text-sm font-semibold text-aubergine">
            ¿Dónde vas a estudiar?
          </label>
          <select
            id="universidad"
            name="universidad"
            required
            value={universidad}
            onChange={(e) => setUniversidad(e.target.value)}
            className="w-full appearance-none rounded-xl border border-aubergine/15 bg-cream/40 bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat px-4 py-3 text-aubergine outline-none transition focus:border-aubergine focus:ring-2 focus:ring-aubergine/20"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233f2d51' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              Selecciona tu centro
            </option>
            {UNIVERSIDADES.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        {/* Consentimiento */}
        <label className="flex items-start gap-3 text-sm text-aubergine/70">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-aubergine/30 text-aubergine accent-aubergine"
          />
          <span>
            Acepto que Yugo Cartuja se ponga en contacto conmigo para gestionar mi
            visita y enviarme información sobre la residencia.
          </span>
        </label>

        {status === "error" && (
          <div className="rounded-xl bg-coral/10 px-4 py-3 text-sm font-medium text-coral-dark">
            {errorMsg} Vuelve a intentarlo o escríbenos directamente.
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading" || !consent}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-coral px-6 py-4 text-lg font-bold text-white shadow-lg shadow-coral/30 transition hover:bg-coral-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Enviando...
            </>
          ) : (
            "Reservar mi plaza"
          )}
        </button>

        <p className="text-center text-xs text-aubergine/40">
          Plazas limitadas · Recibirás la confirmación por email
        </p>
      </div>
    </form>
  );
}
