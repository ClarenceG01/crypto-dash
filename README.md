# React + Vite

# Crypto‑Dash 🚀

A clean, real-time cryptocurrency dashboard built with modern web technologies, offering live price updates, historical charts, and portfolio tracking.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

## Demo

- **Live demo**: [https://crypto-dash-pied.vercel.app/]
- ![Dashboard screenshot](./public/screenshot.png)

---

## Features

- **Real-time price updates** for major cryptocurrencies
- **Historical price charts** with interactive UI & charts
- **Dark & Light mode** for personalized experience
- **Responsive design**: mobile, tablet, desktop ready

---

## Tech Stack

- **Frontend**: React + Vite
- **Charts**: Recharts
- **State Management**: React Context for theme
- **API**: CoinGecko
- **Styling**: Tailwind CSS

---

## Prerequisites

Ensure you have installed:

- [Node.js](https://nodejs.org/) v16+
- npm v8+ (or yarn v1.22+)
- API keys for data provider (CoinGecko)

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ClarenceG01/crypto-dash.git
   cd crypto-dash
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```

## or yarn install

3. **Configure environment variables**
   ```bash
   VITE_API_KEY='your api key from coingecko'
   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```

## or yarn dev

5. **Open http://localhost:5173 to explore Crypto‑Dash**

---

## Contributing

Contributions are welcomed. If you'd like to make changes:

- Fork or Clone the repo
- Create a feature branch. Name it according to the feature
  e.g feature/add-dark-theme
- Make your changes
- Submit a PR for review

---

## Recent Contributions

### Firebase Authentication & Firestore Watchlist

- **User Authentication**: Added full support for user sign-up, login, and logout using Firebase Authentication. The app now features dedicated Login and Signup pages, and the navigation bar updates based on authentication state.
- **Persistent Watchlist**: The watchlist is now stored in Firestore for authenticated users, allowing favorites to sync across devices. For guests, the watchlist is stored in localStorage.
- **Context-Driven State**: Implemented modular React Contexts for both authentication and watchlist management, ensuring clean, maintainable, and scalable state management.
- **UI/UX Consistency**: The watchlist UI matches the homepage for a seamless user experience. Users can add/remove coins to their watchlist from the coin detail page with a single click.
- **Detailed Comments & Documentation**: All new code is well-documented with clear comments, making it easy for future contributors to understand and extend the features.

These enhancements make Crypto‑Dash a more robust, user-friendly, and collaborative platform for tracking and managing favorite cryptocurrencies.
