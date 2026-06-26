import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MONDAY_API_URL = "https://api.monday.com/v2";

// Columnas del tablero "JPA 4 Junio" (board 5099259590)
const COLUMN_IDS = {
  telefono: "phone_mm4pnqyh",
  email: "email_mm4pmf8v",
  horario: "dropdown_mm4pn6jb",
  universidad: "dropdown_mm4pwqm8",
} as const;

const HORARIOS = ["10:30", "12:00", "13:30"];
const UNIVERSIDADES = ["ETSI", "FCOM", "DTX", "CESUR", "Otros"];

type Payload = {
  nombre?: string;
  telefono?: string;
  email?: string;
  horario?: string;
  universidad?: string;
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
  const boardId = process.env.MONDAY_BOARD_ID || "5099259590";
  const groupId = process.env.MONDAY_GROUP_ID || "topics";

  if (!token) {
    console.error("[register] Falta la variable de entorno MONDAY_API_TOKEN");
    return NextResponse.json(
      { error: "El formulario no está configurado todavía." },
      { status: 500 }
    );
  }

  // --- Valores de columna para monday.com ---
  const phoneDigits = telefono.replace(/[^\d+]/g, "");
  const columnValues = {
    [COLUMN_IDS.telefono]: { phone: phoneDigits, countryShortName: "ES" },
    [COLUMN_IDS.email]: { email, text: email },
    [COLUMN_IDS.horario]: { labels: [horario] },
    [COLUMN_IDS.universidad]: { labels: [uni] },
  };

  const query = `
    mutation CreateLead($boardId: ID!, $groupId: String!, $itemName: String!, $columnValues: JSON!) {
      create_item(
        board_id: $boardId,
        group_id: $groupId,
        item_name: $itemName,
        column_values: $columnValues,
        create_labels_if_missing: false
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
