## Weather App AI — Next.js + StepZen + Apollo + OpenAI

An AI-assisted weather dashboard built with Next.js 13 (App Router) and TypeScript. It fetches forecast data from Open‑Meteo via a StepZen GraphQL endpoint (queried with Apollo Client), then generates a friendly daily summary using OpenAI. Charts are rendered with Tremor and styled with Tailwind CSS.

### Highlights
- Next.js 13 App Router with TypeScript
- StepZen REST-to-GraphQL schema for Open‑Meteo
- Apollo Client for GraphQL queries
- OpenAI for AI-written weather summaries
- Tremor charts and responsive Tailwind UI

## Tech Stack
- Next.js 13, React 18, TypeScript
- Apollo Client, GraphQL
- StepZen (GraphQL endpoint over Open‑Meteo)
- OpenAI Node SDK
- Tailwind CSS, @tremor/react, Heroicons

## Project Structure
- `app/` — App Router pages and API routes
	- `api/getWeatherSummary/route.ts` — Calls OpenAI to generate the daily summary
	- `location/[city]/[lat]/[long]/page.tsx` — Fetches weather via Apollo and renders charts
- `components/` — UI components and charts
- `grapghql/queries/` — GraphQL query for weather data
- `lib/` — Data shaping and utilities
- `stepzen/` — StepZen schema files
- `apollo-client.ts` — Apollo client configured with StepZen endpoint
- `openai.ts` — OpenAI client initialization

## Prerequisites
- Node.js 18+ and npm (or Yarn / pnpm)
- Accounts/keys:
	- OpenAI API key
	- StepZen account and API key, plus a deployed endpoint

## Environment Variables
Create a `.env` file in the project root (already added with placeholders). Update the values as needed:

- `OPENAI_API_KEY` — Your OpenAI API key. Example: `sk-...`
- `API_URL` — Your StepZen GraphQL endpoint URL. Example: `https://<username>.stepzen.net/api/nomadic-hamster/__graphql`
- `STEPZEN_API_KEY` — Your StepZen API key used for the `Authorization` header.
- `BASE_URL` — Base URL of your app, used to call the Next.js API route. Use `http://localhost:3000` in development, or your deployed URL on Vercel.

Example `.env` (placeholders):

```
OPENAI_API_KEY=sk-your-openai-api-key
API_URL=https://your-username.stepzen.net/api/nomadic-hamster/__graphql
STEPZEN_API_KEY=your-stepzen-api-key
BASE_URL=http://localhost:3000
```

Note: Next.js also supports `.env.local`; you can move secrets there if you prefer not to commit `.env`.

## Getting Started
Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

Open http://localhost:3000 to view the app.

## How It Works
1. The client-side page at `app/location/[city]/[lat]/[long]/page.tsx` uses Apollo Client to query your StepZen endpoint for weather data from Open‑Meteo.
2. The results are shaped via `lib/cleanData.ts` and sent to the API route `app/api/getWeatherSummary/route.ts`.
3. The API route calls OpenAI to generate a human-friendly summary/joke and returns the message for display.

## Deployment
Deploy on Vercel (recommended). Set these environment variables in your project settings:
- `OPENAI_API_KEY`
- `API_URL`
- `STEPZEN_API_KEY`
- `BASE_URL` (e.g., `https://your-app.vercel.app`)

## Troubleshooting
- 401 from StepZen: Verify `API_URL` and `STEPZEN_API_KEY` and ensure `Authorization: apikey <key>` header is accepted by your endpoint.
- OpenAI errors: Ensure `OPENAI_API_KEY` is valid and the selected model (e.g., `gpt-3.5-turbo`) is available to your account.
- Empty charts: Check the StepZen schema and query variables (lat/long/timezone) and confirm Open‑Meteo is returning data.

## Scripts
- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Lint the codebase

## Acknowledgements
- Weather data: Open‑Meteo
- GraphQL gateway: StepZen
- Charts: Tremor
