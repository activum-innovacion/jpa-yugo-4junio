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
| `MONDAY_BOARD_ID` | ID del tablero. Por defecto `5098228821` (Leads). |
| `MONDAY_GROUP_ID` | Grupo donde se crean los items. Por defecto `group_mm3qza6n` (Listado nuevos). |

### Mapa de campos → columnas del tablero "Leads"

| Campo del formulario | Columna monday | ID |
| --- | --- | --- |
| Nombre y apellidos | Name | `name` |
| Teléfono | Teléfono | `phone_mm3q9rmk` |
| Correo electrónico | E-mail | `email_mm3q9xk` |
| Horario | Fecha y hora inicio visita | `date_mm3qtz5n` |
| Universidad | Centro Estudios | `dropdown_mm3qh2w7` |
| _(constante)_ Tipo de gestión = **Mail** | Tipo de gestión | `color_mm3qmhtv` |
| _(constante)_ Origen del contacto = **JPA** | Origen del contacto | `color_mm3qd8bq` |
| _(constante)_ Estado Lead = **Lead Nuevo** | Estado Lead | `color_mm3qa08v` |
| _(automático)_ Fecha Entrada = fecha de registro | Fecha Entrada | `date_mm3qyzm1` |

> El horario se guarda como fecha+hora del **4 de julio de 2026**. La hora se
> envía en UTC (la cuenta de monday es CEST/UTC+2 en julio) para que se muestre
> la hora local correcta. Las etiquetas de "Centro Estudios" se crean
> automáticamente si no existen (`create_labels_if_missing`).

## Despliegue en Vercel

1. Importa el proyecto en Vercel.
2. Añade `MONDAY_API_TOKEN` en *Settings → Environment Variables*.
3. Deploy.
