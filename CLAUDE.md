# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vite + React + TypeScript landing page project built with shadcn/ui components and Tailwind CSS. The application is a multi-page website for "EventSnap" (an event photo sharing service) with internationalization support for English, Serbian, and Bulgarian.

**Key characteristics:**
- Generated and managed through Lovable (lovable.dev) - changes pushed to this repo are reflected in Lovable
- Uses path alias `@/` that resolves to `./src/`
- Dev server runs on port 8080 (not the default Vite port)
- TypeScript with relaxed compiler options (noImplicitAny: false, strictNullChecks: false)

## Development Commands

```bash
# Install dependencies
npm i

# Start development server (runs on http://localhost:8080)
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Lint the codebase
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Routing Structure

The app uses React Router with the following page hierarchy defined in `src/App.tsx`:
- `/` - Index (home page)
- `/about` - About page
- `/contact` - Contact page
- `*` - NotFound (404 page)

**Important:** Custom routes must be added ABOVE the catch-all `*` route in `src/App.tsx`.

### Provider Hierarchy

The application wraps components in this provider order (outer to inner):
1. `QueryClientProvider` - TanStack Query for data fetching
2. `LanguageProvider` - Custom i18n context
3. `TooltipProvider` - Radix UI tooltips
4. `BrowserRouter` - React Router

### Internationalization (i18n)

Multi-language support is implemented via a custom Context API solution:

- **Translations file:** `src/i18n/translations.ts` - Contains all text content for 'en' | 'sr' | 'bg'
- **Context:** `src/contexts/LanguageContext.tsx` - Provides `language`, `setLanguage(lang)`, and `t` (translation object)
- **Hook:** Use `useLanguage()` to access current language and translations
- **Component:** `LanguageSwitcher.tsx` - UI for switching languages

**Adding new translated strings:**
1. Add the key-value pairs to all three language objects in `src/i18n/translations.ts`
2. Access in components via `const { t } = useLanguage()` then `t.section.key`

### Component Organization

- **`src/components/ui/`** - shadcn/ui primitives (50+ components including accordion, button, card, dialog, form, etc.)
- **`src/components/`** - App-specific components (Navigation, LanguageSwitcher, NavLink)
- **`src/pages/`** - Page-level components (Index, About, Contact, NotFound)
- **`src/hooks/`** - Custom hooks (use-mobile, use-toast)
- **`src/lib/utils.ts`** - Utility functions including `cn()` for className merging

### Styling

- Tailwind CSS with custom configuration in `tailwind.config.ts`
- `@tailwindcss/typography` plugin available
- `tailwindcss-animate` for animations
- Use `cn()` utility from `@/lib/utils` to merge Tailwind classes

### State Management

- TanStack Query (React Query) for server state
- React Context API for global state (currently only language)
- Toast notifications via sonner + shadcn/ui toaster

## Code Conventions

- Path imports use `@/` alias (e.g., `@/components/ui/button`)
- Component files use PascalCase naming
- Loose TypeScript checking enabled - type errors may not block builds
- ESLint configured with TypeScript, React Hooks, and React Refresh plugins
- Unused variables rule is disabled (`@typescript-eslint/no-unused-vars: off`)

## Important Notes

- This project uses Lovable's component tagger in development mode (see `vite.config.ts`)
- The dev server listens on all interfaces (`host: "::"`) for container/network access
- When adding new shadcn/ui components, use the standard shadcn/ui CLI or manually add to `src/components/ui/`
