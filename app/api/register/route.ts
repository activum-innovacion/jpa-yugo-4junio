import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MONDAY_API_URL = "https://api.monday.com/v2";

// Columnas del tablero "Leads" (board 5098228821)
const COLUMN_IDS = {
  telefono: "phone_mm3q9rmk", // Teléfono
  email: "email_mm3q9xk", // E-mail
  visita: "date_mm3qtz5n", // Fecha y hora inicio visita
  centroEstudios: "dropdown_mm3qh2w7", // Centro Estudios
  idiomaPreferido: "dropdown_mm3qwkc7", // Idioma preferido (dropdown)
  campana: "dropdown_mm50d5ca", // Campaña (dropdown)
  tipoGestion: "color_mm3qmhtv", // Tipo de gestión (status)
  origenContacto: "color_mm3qd8bq", // Origen del contacto (status)
  estadoLead: "color_mm3qa08v", // Estado Lead (status)
  ubicacionVisita: "color_mm3qyqsn", // Ubicación visita (status)
  fechaEntrada: "date_mm3qyzm1", // Fecha Entrada (date)
} as const;

// Valores por defecto para todos los leads de la JPA
const DEFAULT_TIPO_GESTION = "Mail";
const DEFAULT_ORIGEN_CONTACTO = "JPA";
const DEFAULT_ESTADO_LEAD = "Lead Nuevo";
const DEFAULT_UBICACION_VISITA = "Presencial";
const DEFAULT_CAMPANA = "Landing JPA 17/07/26";

// Fecha del evento (Viernes 17 de julio de 2026)
const EVENT_DATE = "2026-07-17";

// La API de monday interpreta la hora como UTC y la muestra en la zona horaria
// de la cuenta. En julio España es CEST (UTC+2), así que enviamos la hora en UTC
// para que se vea correctamente la hora local de la visita.
const HORARIO_TO_UTC: Record<string, string> = {
  "10:30": "08:30:00",
  "12:00": "10:00:00",
  "13:30": "11:30:00",
};

const HORARIOS = Object.keys(HORARIO_TO_UTC);
const UNIVERSIDADES = ["ETSI", "FCOM", "DTX", "CESUR", "Otros"];

// Idioma del formulario -> etiqueta de la columna "Idioma preferido"
const IDIOMA_TO_LABEL: Record<string, string> = {
  es: "Castellano",
  en: "Inglés",
};

type Payload = {
  nombre?: string;
  telefono?: string;
  email?: string;
  horario?: string;
  universidad?: string;
  idioma?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  const nombre = (body.nombre || "").trim();
  const telefono = (body.telefono || "").trim();
  const email = (body.email || "").trim();
  const horario = (body.horario || "").trim();
  const universidad = (body.universidad || "").trim();
  const idiomaLabel = IDIOMA_TO_LABEL[(body.idioma || "").trim().toLowerCase()] || "Castellano";

  // --- Validación de servidor ---
  if (!nombre) {
    return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
  }
  if (!email || !isEmail(email)) {
    return NextResponse.json({ error: "Introduce un correo electrónico válido." }, { status: 400 });
  }
  if (!telefono || telefono.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ error: "Introduce un teléfono válido." }, { status: 400 });
  }
  if (!HORARIOS.includes(horario)) {
    return NextResponse.json({ error: "Selecciona un horario válido." }, { status: 400 });
  }
  const uni = UNIVERSIDADES.includes(universidad) ? universidad : "Otros";

  const token = process.env.MONDAY_API_TOKEN;
  const boardId = process.env.MONDAY_BOARD_ID || "5098228821";
  const groupId = process.env.MONDAY_GROUP_ID || "group_mm3qza6n";

  if (!token) {
    console.error("[register] Falta la variable de entorno MONDAY_API_TOKEN");
    return NextResponse.json(
      { error: "El formulario no está configurado todavía." },
      { status: 500 }
    );
  }

  // Fecha de registro del lead (fecha local de España, sin hora)
  const fechaEntrada = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  // --- Valores de columna para monday.com ---
  const phoneDigits = telefono.replace(/[^\d+]/g, "");
  const columnValues = {
    [COLUMN_IDS.telefono]: { phone: phoneDigits, countryShortName: "ES" },
    [COLUMN_IDS.email]: { email, text: email },
    [COLUMN_IDS.visita]: { date: EVENT_DATE, time: HORARIO_TO_UTC[horario] },
    [COLUMN_IDS.centroEstudios]: { labels: [uni] },
    [COLUMN_IDS.idiomaPreferido]: { labels: [idiomaLabel] },
    [COLUMN_IDS.campana]: { labels: [DEFAULT_CAMPANA] },
    [COLUMN_IDS.tipoGestion]: { label: DEFAULT_TIPO_GESTION },
    [COLUMN_IDS.origenContacto]: { label: DEFAULT_ORIGEN_CONTACTO },
    [COLUMN_IDS.estadoLead]: { label: DEFAULT_ESTADO_LEAD },
    [COLUMN_IDS.ubicacionVisita]: { label: DEFAULT_UBICACION_VISITA },
    [COLUMN_IDS.fechaEntrada]: { date: fechaEntrada },
  };

  // create_labels_if_missing crea las etiquetas ETSI/FCOM/DTX/CESUR/Otros en
  // "Centro Estudios" si aún no existen.
  const query = `
    mutation CreateLead($boardId: ID!, $groupId: String!, $itemName: String!, $columnValues: JSON!) {
      create_item(
        board_id: $boardId,
        group_id: $groupId,
        item_name: $itemName,
        column_values: $columnValues,
        create_labels_if_missing: true
      ) { id }
    }
  `;

  try {
    const res = await fetch(MONDAY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        "API-Version": "2024-10",
      },
      body: JSON.stringify({
        query,
        variables: {
          boardId,
          groupId,
          itemName: nombre,
          columnValues: JSON.stringify(columnValues),
        },
      }),
    });

    const result = await res.json();

    if (result.errors || result.error_message) {
      console.error("[register] Error de la API de monday:", JSON.stringify(result));
      return NextResponse.json(
        { error: "No hemos podido registrar tu reserva." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { ok: true, id: result?.data?.create_item?.id ?? null },
      { status: 200 }
    );
  } catch (err) {
    console.error("[register] Fallo de red con monday:", err);
    return NextResponse.json(
      { error: "No hemos podido conectar con el servidor." },
      { status: 502 }
    );
  }
}
