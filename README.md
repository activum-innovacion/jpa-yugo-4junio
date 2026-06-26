# Yugo Cartuja — Jornada de Puertas Abiertas

Landing de la jornada de puertas abiertas de **Yugo Cartuja** (residencia de
estudiantes en Sevilla), con formulario de reserva conectado a **monday.com**.

- **Evento:** Sábado 4 de julio · Horarios 10:30 / 12:00 / 13:30
- **Stack:** Next.js (App Router) + Tailwind CSS v4, desplegable en Vercel.

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # añade tu MONDAY_API_TOKEN
npm run dev
```

Abre http://localhost:3000

## Conexión con monday.com

El formulario envía los datos a `app/api/register/route.ts`, que crea un item en
el tablero mediante la API de monday. Configura estas variables de entorno:

| Variable | Descripción |
| --- | --- |
| `MONDAY_API_TOKEN` | Token personal de la API de monday (**obligatorio**). |
| `MONDAY_BOARD_ID` | ID del tablero. Por defecto `5099259590`. |
| `MONDAY_GROUP_ID` | Grupo donde se crean los items. Por defecto `topics`. |

### Mapa de campos → columnas del tablero

| Campo del formulario | Columna monday | ID |
| --- | --- | --- |
| Nombre y apellidos | Name | `name` |
| Teléfono | Teléfono | `phone_mm4pnqyh` |
| Correo electrónico | Correo electrónico | `email_mm4pmf8v` |
| Horario | Horario | `dropdown_mm4pn6jb` |
| Universidad | Universidad | `dropdown_mm4pwqm8` |

## Despliegue en Vercel

1. Importa el proyecto en Vercel.
2. Añade `MONDAY_API_TOKEN` en *Settings → Environment Variables*.
3. Deploy.
