# StudioSpace

Peer-to-peer marketplace for booking creative studios: photo studios, sound stages, podcast rooms, music suites and art workshops.

**Live site:** https://YOUR-APP.vercel.app
**Server repo:** https://github.com/jferdous222318/studiospace

## Features
- Secure authentication with email/password and Google, using JWT in HTTPOnly cookies
- Browse, search, filter and sort studios with a gallery carousel
- Host tools: add, update and delete listings with a confirmation modal
- Booking system with a live price summary and double-booking prevention
- Host dashboard to confirm, complete or cancel booking requests
- Light and dark theme toggle that remembers your choice
- Fully responsive with skeleton loaders, empty states and toast notifications

## Tech Stack
Next.js (App Router), Tailwind CSS, daisyUI, Swiper, React Hot Toast, Express.js, MongoDB, JWT, bcrypt

## Examiner Test Credentials
- Email: examiner@studiospace.com
- Password: Studio123

## Local Setup
1. Clone both repos
2. Server: `npm install`, create `.env` (see below), then `npm run dev`
3. Client: `npm install`, create `.env.local` with `API_URL=http://localhost:5000` and `NEXT_PUBLIC_GOOGLE_CLIENT_ID=...`, then `npm run dev`
4. Open http://localhost:3000

Server `.env` keys: `PORT`, `MONGODB_URI`, `DB_NAME`, `JWT_SECRET`, `CLIENT_URL`, `GOOGLE_CLIENT_ID`, `NODE_ENV`