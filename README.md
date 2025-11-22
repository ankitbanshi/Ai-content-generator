🧠 AI Content Generator

A full-stack AI-powered content generation platform built with Next.js, Gemini API, Clerk, Drizzle ORM, and Razorpay.
It provides ready-made content templates (blogs, social posts, code utilities, etc.) and a UI to generate, edit, and manage AI-generated content.

Live demo: https://ai-content-generator-yhjc.vercel.app/sign-in?redirect_url=https%3A%2F%2Fai-content-generator-yhjc.vercel.app%2F

GitHub: https://github.com/ankitbanshi/Ai-content-generator

---

## 🚀 Features

- Generate content using Gemini API
- Rich text editor for editing and saving
- Authentication via Clerk
- PostgreSQL + Drizzle ORM backend
- Payment integration using Razorpay
- User dashboard & content management
- Save drafts and history

---

## ⚙️ Tech Stack

- Frontend: Next.js (App Router), TypeScript, Tailwind CSS
- Backend: Gemini API, Clerk Auth, Razorpay, Drizzle ORM + PostgreSQL

---

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Install

```powershell
npm install
```

### Run (development)

```powershell
npm run dev
```

### Build (production)

```powershell
npm run build
```

### Start (production)

```powershell
npm run start
```

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Run app in development mode |
| `npm run build` | Build app + type check + lint |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` / `npm run db:studio` | Drizzle DB helpers |

## 🔐 Environment Variables

Create a `.env` file (or copy `.env.example`) and set the values you need:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY` (or `GEMINI_API_KEY` per your setup)
- `NEXT_PUBLIC_DATABASE_URL` (or `DATABASE_URL`)
- `REZORPAY_KEY_ID`
- `REZORPAY_KEY_SECRET`
- `SUBSCRIPTION_PLAN_ID`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`

> Do not commit real secrets. Use environment variables or a secrets manager.

## 🧾 TypeScript & Linting

- The project uses TypeScript. `npm run build` performs type checking and ESLint validation.
- Run the linter manually:

```powershell
npm run lint
```

---

If you'd like, I can:

- Add badges (build, license, etc.)
- Create a `.env.example` (I already added one) or update it to match these names exactly
- Open a PR with this README and the recent fixes



