# CabRide - Cab Booking System

A modern, full-scale cab booking application built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

### Frontend
- **Next.js 16** (App Router) — React framework with SSR/SSG
- **TypeScript** — Type-safe development
- **Tailwind CSS v4** — Utility-first CSS framework
- **Zustand** — Lightweight state management
- **React Hook Form + Zod** — Form handling and validation
- **Lucide React** — Icon library
- **React Hot Toast** — Toast notifications

### Planned Backend
- **FastAPI** (Python) — REST API
- **PostgreSQL + PostGIS** — Database with geospatial support
- **Redis** — Caching and real-time pub/sub
- **Socket.IO** — WebSocket support for live tracking

## Getting Started

### Prerequisites
- Node.js 20+ 
- npm

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Landing page
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   ├── book/             # Ride booking page
│   │   ├── tracking/         # Live ride tracking
│   │   ├── history/          # Ride history
│   │   └── profile/          # User profile
│   ├── components/           # Shared UI components
│   │   ├── navbar.tsx        # Navigation bar
│   │   └── footer.tsx        # Footer
│   ├── stores/               # Zustand state stores
│   │   ├── auth-store.ts     # Authentication state
│   │   └── booking-store.ts  # Booking & ride state
│   └── lib/                  # Utilities and constants
│       ├── constants.ts      # App-wide constants
│       └── utils.ts          # Helper functions
```

## Features

- **Landing Page** — Hero section, features showcase, stats, how-it-works, CTA
- **Authentication** — Login and registration with form validation
- **Ride Booking** — Location search, cab type selection, fare estimation
- **Live Tracking** — Simulated real-time ride tracking with driver info
- **Ride History** — View past rides with filtering
- **User Profile** — Stats, settings, and recent rides
- **Responsive Design** — Mobile-first, works on all devices
- **Dark Mode** — Automatic dark mode support

## License

MIT
