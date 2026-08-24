# AURA — Online Clothing Store

A modern, responsive online clothing store built with React, React Router, and Tailwind CSS, powered by Vite.

## Features

- Product browsing, search, filtering, and sorting
- Product detail pages
- Shopping cart and wishlist
- Login, registration, and account pages
- Checkout flow
- Toast notifications
- Responsive, mobile-friendly UI with dark mode

## Tech Stack

- React 19
- React Router 7
- Vite 8
- Tailwind CSS 4

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
├── components/   # Reusable UI components (Header, Footer, ProductCard, Toast)
├── pages/        # Route-level pages (Home, Shop, Cart, Checkout, Account, etc.)
├── store/        # App-wide state (AppContext)
├── data/         # Static product data
├── App.jsx       # Root component and route definitions
├── main.jsx      # Application entry point
└── index.css     # Global styles and Tailwind import
```
