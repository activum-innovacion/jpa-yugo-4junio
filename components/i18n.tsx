"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

const es = {
  nav: { back: "Volver" },
  hero: {
    badge: "Jornada de Puertas Abiertas",
    title: "Te esperamos el 4 de julio",
    subtitle: "Visita, reserva y consigue el mayor descuento en tu habitación.",
    address: "C. Francisco de Xerez, 41092 Sevilla",
    times: "10:30 · 12:00 · 13:30",
  },
  form: {
    heading: "Reserva tu visita",
    subheading: "Sábado 4 de julio · Plazas limitadas",
    name: "Nombre y apellidos",
    namePlaceholder: "Tu nombre completo",
    phone: "Teléfono",
    phonePlaceholder: "600 123 456",
    email: "Correo electrónico",
    emailPlaceholder: "tucorreo@email.com",
    schedule: "Elige tu horario de visita",
    scheduleError: "Selecciona un horario para tu visita.",
    hSuffix: " h",
    university: "¿Dónde vas a estudiar?",
    universityPlaceholder: "Selecciona tu centro",
    consent:
      "Acepto que Yugo Cartuja se ponga en contacto conmigo para gestionar mi visita y enviarme información sobre la residencia.",
    submit: "Reservar mi visita",
    sending: "Enviando...",
    limited: "Plazas limitadas",
    error: "No hemos podido enviar tu reserva. Vuelve a intentarlo o escríbenos directamente.",
    successTitle: "¡Visita reservada!",
    successDate: "sábado 4 de julio",
    successAt: "a las",
    successPre: "Hemos recibido tu reserva para la jornada de puertas abiertas del ",
    successPost: ". Te enviaremos por email toda la información para tu visita.",
    successFooter: "¡Nos vemos en Yugo Cartuja!",
  },
};

const en: typeof es = {
  nav: { back: "Back" },
  hero: {
    badge: "Open House",
    title: "See you on July 4th",
    subtitle: "Visit, book and get the biggest discount on your room.",
    address: "C. Francisco de Xerez, 41092 Sevilla",
    times: "10:30 · 12:00 · 13:30",
  },
  form: {
    heading: "Book your visit",
    subheading: "Saturday, July 4th · Limited spots",
    name: "Full name",
    namePlaceholder: "Your full name",
    phone: "Phone",
    phonePlaceholder: "600 123 456",
    email: "Email",
    emailPlaceholder: "youremail@email.com",
    schedule: "Choose your visit time",
    scheduleError: "Please choose a time for your visit.",
    hSuffix: "",
    university: "Where will you study?",
    universityPlaceholder: "Select your campus",
    consent:
      "I agree that Yugo Cartuja may contact me to manage my visit and send me information about the residence.",
    submit: "Book my visit",
    sending: "Sending...",
    limited: "Limited spots",
    error: "We couldn't submit your booking. Please try again or contact us directly.",
    successTitle: "Visit booked!",
    successDate: "Saturday, July 4th",
    successAt: "at",
    successPre: "We've received your booking for the open house on ",
    successPost: ". We'll email you all the information for your visit.",
    successFooter: "See you at Yugo Cartuja!",
  },
};

export const dict: Record<Lang, typeof es> = { es, en };

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof es;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  // Idioma inicial: ?lang= en la URL (para abrir desde el popup) > guardado > es
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search)
      .get("lang")
      ?.toLowerCase();
    const fromStorage = window.localStorage.getItem("lang");
    const initial = fromUrl || fromStorage || "es";
    if (initial === "en" || initial === "es") setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem("lang", next);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  return ctx;
}
