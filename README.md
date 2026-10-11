# Bazar Dor (বাজার দর) 🛒

A modern web application built with **Next.js App Router** to explore daily market prices, product categories, and manage secure user authentication.

---

## 🚀 Features (বৈশিষ্ট্যসমূহ)
- **Dynamic Category Navigation:** Interactive category bar with custom icons/emojis (🍚 চাল, 🫘 ডাল, 🛢️ তেল, 🥬 সবজি, 🐟 মাছ, 🍗 মাংস, 🥛 ডিম-দুধ, 🌶️ মসলা).
- **Authentication (Better Auth):** Secure Email/Password registration/login alongside **Google** and **GitHub** social logins.
- **Responsive Design:** Clean, modern, and mobile-friendly UI crafted with **Tailwind CSS**.
- **Interactive Feedback:** Smooth loading states, active animations, and toast notifications using `react-hot-toast`.
- **API Integration:** Dynamic product and category fetching from the Bazar Dor API.

---

## 🛠️ Tech Stack (প্রযুক্তিসমূহ)
- **Framework:** Next.js (App Router)
- **Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Better Auth (`better-auth/react`)
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

---

## ⚙️ Environment Variables (`.env.local`)
Create a `.env.local` file in the root directory and add the following environment variables:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
