## AI Weather App — Next.js 13 + OpenAI + Open‑Meteo

A modern, AI‑assisted weather dashboard built with Next.js 13 (App Router) and TypeScript. The app fetches forecast data directly from Open‑Meteo and uses OpenAI to generate a friendly daily summary. Responsive UI is styled with Tailwind CSS and visualized with Tremor charts.

### Features

- Direct weather data from Open‑Meteo (no server token required)
- AI‑written daily summary via OpenAI
- Interactive charts (temperature, rain, humidity) using Tremor
- City/latitude/longitude routing and a location picker
- Fast, SSR/ISR rendering with Next.js 13

## Tech Stack

- Next.js 13, React 18, TypeScript
- OpenAI Node SDK
- Tailwind CSS, @tremor/react, Heroicons

Optional (legacy) integrations still present in the codebase:

- StepZen + Apollo Client (GraphQL gateway over Open‑Meteo)

## Project Structure

- `app/` — App Router pages and API routes
  - `api/getWeatherSummary/route.ts` — Calls OpenAI to generate a daily summary
  - `location/[city]/[lat]/[long]/page.tsx` — Fetches Open‑Meteo directly and renders charts
- `components/` — UI components and charts
- `lib/` — Data shaping (`cleanData.ts`) and helpers
- `stepzen/` — StepZen config and schema (optional/legacy)
- `grapghql/queries/` — Legacy GraphQL query (unused if using direct fetch)
- `apollo-client.ts` — Legacy Apollo client (unused by default)
- `openai.ts` — OpenAI client initialization

## Prerequisites

- Node.js 18+
- OpenAI API key

## Environment Variables

Create a `.env` file in the project root and set the following.

Required:

- `OPENAI_API_KEY` — Your OpenAI API key. Example: `sk-...`
- `BASE_URL` — Base URL of your app for calling the API route. Use `http://localhost:3000` in development.

Optional (legacy StepZen/Apollo path):

- `API_URL` — StepZen GraphQL endpoint URL, e.g., `https://<user>.stepzen.net/api/<endpoint>/__graphql`
- `STEPZEN_API_KEY` — StepZen API key for the `Authorization` header

Example `.env`:

```
OPENAI_API_KEY=sk-your-openai-api-key
BASE_URL=http://localhost:3000

# Optional: only if you switch back to StepZen/Apollo
# API_URL=https://your-username.stepzen.net/api/nomadic-hamster/__graphql
# STEPZEN_API_KEY=your-stepzen-api-key
```

## Getting Started

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open http://localhost:3000 in your browser.

## How It Works

1. The dynamic page at `app/location/[city]/[lat]/[long]/page.tsx` fetches forecast data directly from Open‑Meteo using the provided lat/long and a fixed set of hourly/daily fields. The request uses Next.js fetch caching with `revalidate: 60`.
2. The result is shaped via `lib/cleanData.ts` for charts and display.
3. The shaped data is posted to `app/api/getWeatherSummary/route.ts`, which calls OpenAI to produce a concise, friendly summary.
4. The UI renders stats, charts, and the AI message.

## Acknowledgements

- Weather data: Open‑Meteo
- Charts: Tremor
