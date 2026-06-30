"use client";

import { useId, useState } from "react";
import { useLang } from "@/components/i18n";

const HORARIOS = ["10:30", "12:00", "13:30"] as const;
const UNIVERSIDADES = ["ETSI", "FCOM", "DTX", "CESUR", "Otros"] as const;

type Status = "idle" | "loading" | "success" | "error";

export default function RegistrationForm() {
  const { t } = useLang();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [horario, setHorario] = useState<string>("");
  const [universidad, setUniversidad] = useState<string>("");
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);

  // ids únicos por instancia (puede haber varios formularios en la página)
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;

  const horarioInvalid = touched && !horario;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!horario || !consent) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, telefono, email, horario, universidad }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
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
        <h3 className="text-2xl font-bold text-aubergine">{t.form.successTitle}</h3>
        <p className="mt-3 text-aubergine/70">
          {t.form.successPre}
          <strong>{t.form.successDate}</strong>
          {horario && (
            <>
              {" "}
              {t.form.successAt}{" "}
              <strong>
                {horario}
                {t.form.hSuffix}
              </strong>
            </>
          )}
          {t.form.successPost}
        </p>
        <p className="mt-6 text-sm text-aubergine/50">{t.form.successFooter}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl2 bg-white p-6 shadow-xl ring-1 ring-aubergine/10 sm:p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-aubergine">{t.form.heading}</h2>
        <p className="mt-1 text-sm font-medium text-coral">{t.form.subheading}</p>
      </div>

      <div className="grid gap-5">
        {/* Nombre */}
        <div>
          <label htmlFor={fid("nombre")} className="mb-1.5 block text-sm font-semibold text-aubergine">
            {t.form.name}
          </label>
          <input
            id={fid("nombre")}
            name="nombre"
            type="text"
            required
            autoComplete="name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder={t.form.namePlaceholder}
            className="w-full rounded-xl border border-aubergine/15 bg-cream/40 px-4 py-3 text-aubergine outline-none transition focus:border-aubergine focus:ring-2 focus:ring-aubergine/20"
          />
        </div>

        {/* Teléfono + Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={fid("telefono")} className="mb-1.5 block text-sm font-semibold text-aubergine">
              {t.form.phone}
            </label>
            <input
              id={fid("telefono")}
              name="telefono"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder={t.form.phonePlaceholder}
              className="w-full rounded-xl border border-aubergine/15 bg-cream/40 px-4 py-3 text-aubergine outline-none transition focus:border-aubergine focus:ring-2 focus:ring-aubergine/20"
            />
          </div>
          <div>
            <label htmlFor={fid("email")} className="mb-1.5 block text-sm font-semibold text-aubergine">
              {t.form.email}
            </label>
            <input
              id={fid("email")}
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.form.emailPlaceholder}
              className="w-full rounded-xl border border-aubergine/15 bg-cream/40 px-4 py-3 text-aubergine outline-none transition focus:border-aubergine focus:ring-2 focus:ring-aubergine/20"
            />
          </div>
        </div>

        {/* Horario */}
        <div>
          <span className="mb-1.5 block text-sm font-semibold text-aubergine">
            {t.form.schedule}
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
                  {h}
                  {t.form.hSuffix}
                </button>
              );
            })}
          </div>
          {horarioInvalid && (
            <p className="mt-2 text-sm text-coral-dark">{t.form.scheduleError}</p>
          )}
        </div>

        {/* Universidad */}
        <div>
          <label htmlFor={fid("universidad")} className="mb-1.5 block text-sm font-semibold text-aubergine">
            {t.form.university}
          </label>
          <select
            id={fid("universidad")}
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
              {t.form.universityPlaceholder}
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
          <span>{t.form.consent}</span>
        </label>

        {status === "error" && (
          <div className="rounded-xl bg-coral/10 px-4 py-3 text-sm font-medium text-coral-dark">
            {t.form.error}
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
              {t.form.sending}
            </>
          ) : (
            t.form.submit
          )}
        </button>

        <p className="text-center text-xs text-aubergine/40">{t.form.limited}</p>
      </div>
    </form>
  );
}
