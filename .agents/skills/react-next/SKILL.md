---
name: react-next
description: Best practices for building scalable React & Next.js (App Router) web applications, UI design systems, client/server component architecture, and responsive UX.
---

# React & Next.js (App Router) Standard Operating Skill

When developing React and Next.js applications in this monorepo, follow these guidelines:

## 1. App Router & Architecture
- **Server Components by Default**: Default to React Server Components (RSC) for data fetching, SEO, and bundle reduction. Use `'use client'` only when state, effects, or browser event listeners are required.
- **File Structure**: Group features logically inside `app/` and shared UI components inside `components/` or `@toy-exchange/ui`.
- **Styling**: Use CSS Modules, standard CSS custom properties (variables), or framework-agnostic design tokens. Avoid un-scoped bare HTML element selectors in CSS Modules to prevent build errors.

## 2. Component Design & Performance
- **Composition**: Keep components focused, reusable, and single-responsibility.
- **Type Safety**: Define TypeScript interfaces for all props and state objects.
- **Glassmorphism & Rich Aesthetics**: Use curated color palettes (HSL variables), subtle micro-animations, glassmorphism (`backdrop-filter`), and mobile-responsive layouts.

## 3. Data Fetching & Integration
- **Server Actions & API Routes**: Use Next.js Route Handlers (`app/api/.../route.ts`) for public REST APIs or integrate with backend services via type-safe clients.
- **State Management**: Use React Hooks (`useState`, `useCallback`, `useMemo`) for local state and custom hooks for async/real-time state (e.g., Firestore listeners).
