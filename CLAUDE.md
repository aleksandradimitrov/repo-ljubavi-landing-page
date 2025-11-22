# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**RepoLjubavi** is a multi-language landing page for an event photo sharing service. The application is built with Vite + React + TypeScript, using shadcn/ui components and Tailwind CSS. It features internationalization support for English, Serbian (Cyrillic), and Bulgarian.

**Key characteristics:**
- Generated and managed through [Lovable](https://lovable.dev/projects/cd73a865-311f-4230-930b-1546f7b9ccf4) - changes pushed to this repo are reflected in Lovable
- Uses path alias `@/` that resolves to `./src/`
- Dev server runs on port 8080 (not the default Vite port)
- TypeScript with relaxed compiler options (noImplicitAny: false, strictNullChecks: false)
- Integrated with Supabase for backend services (database + edge functions)
- Dark theme by default with light/dark/system theme switching capability

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

### Tech Stack

**Frontend:**
- **Framework:** Vite 5.4+ with React 18.3+
- **Language:** TypeScript 5.8+
- **Styling:** Tailwind CSS 3.4+ with custom theme configuration
- **UI Components:** shadcn/ui (50+ Radix UI primitives)
- **State Management:** TanStack Query (React Query) for server state, React Context for global state
- **Routing:** React Router DOM 6.30+
- **Forms:** React Hook Form with Zod validation
- **Icons:** Lucide React
- **Notifications:** Sonner (toast notifications)
- **Theme:** next-themes for dark/light mode

**Backend:**
- **Database & Auth:** Supabase
- **Edge Functions:** Deno-based Supabase Edge Functions
- **Email:** Nodemailer via edge function with Google SMTP

### Routing Structure

The app uses React Router with the following page hierarchy defined in `src/App.tsx`:
- `/` - Index (home page with hero, features, showcase, testimonials, CTA)
- `/about` - About page (story, mission, values)
- `/contact` - Contact page (form + contact info)
- `/demo` - Demo page (under active development)
- `*` - NotFound (404 page)

**Important:** Custom routes must be added ABOVE the catch-all `*` route in `src/App.tsx`.

### Provider Hierarchy

The application wraps components in this provider order (outer to inner):
1. `QueryClientProvider` - TanStack Query for data fetching
2. `ThemeProvider` - next-themes for dark/light mode (default: dark)
3. `LanguageProvider` - Custom i18n context
4. `TooltipProvider` - Radix UI tooltips
5. `BrowserRouter` - React Router

### Internationalization (i18n)

Multi-language support is implemented via a custom Context API solution:

- **Translations file:** `src/i18n/translations.ts` - Contains all text content for 'en' | 'sr' | 'bg'
- **Context:** `src/contexts/LanguageContext.tsx` - Provides `language`, `setLanguage(lang)`, and `t` (translation object)
- **Hook:** Use `useLanguage()` to access current language and translations
- **Component:** `LanguageSwitcher.tsx` - UI for switching languages

**Adding new translated strings:**
1. Add the key-value pairs to all three language objects in `src/i18n/translations.ts`
2. Access in components via `const { t } = useLanguage()` then `t.section.key`

**Translation structure:**
```typescript
translations = {
  en: { nav, hero, features, showcase, testimonials, cta, footer, about, contact },
  sr: { /* same structure in Serbian Cyrillic */ },
  bg: { /* same structure in Bulgarian */ }
}
```

### Component Organization

- **`src/components/ui/`** - shadcn/ui primitives (49 components including accordion, button, card, dialog, form, input, textarea, toast, etc.)
- **`src/components/`** - App-specific components:
  - `Navigation.tsx` - Main navigation bar with language switcher and theme toggle
  - `LanguageSwitcher.tsx` - Language selection dropdown
  - `ThemeProvider.tsx` - Theme context provider
  - `ThemeToggle.tsx` - Light/dark/system theme toggle button
  - `NavLink.tsx` - Custom navigation link component
- **`src/pages/`** - Page-level components:
  - `Index.tsx` - Home page (11.8KB - hero, features, showcase, testimonials, CTA)
  - `About.tsx` - About page (3.5KB - story, mission, values)
  - `Contact.tsx` - Contact page (7.4KB - form with Supabase integration)
  - `Demo.tsx` - Demo page (2.6KB - placeholder for demo)
  - `NotFound.tsx` - 404 page
- **`src/hooks/`** - Custom hooks (use-mobile, use-toast)
- **`src/lib/utils.ts`** - Utility functions including `cn()` for className merging
- **`src/integrations/supabase/`** - Supabase client configuration
- **`src/types/`** - TypeScript type definitions
- **`src/contexts/`** - React Context providers

### Styling & Theming

- **Tailwind CSS** with custom configuration in `tailwind.config.ts`
- **Dark mode:** Class-based dark mode with `next-themes`
- **Custom gradients:** `gradient-hero` and `gradient-soft` defined in CSS variables
- **Color system:** HSL-based color tokens for light/dark themes
- **Plugins:** 
  - `@tailwindcss/typography` for rich text styling
  - `tailwindcss-animate` for animations
- **Utility:** Use `cn()` from `@/lib/utils` to merge Tailwind classes

**Theme variables** are defined in `src/index.css` with separate light/dark mode values.

### Supabase Integration

**Configuration:**
- Environment variables in `.env.local`:
  - `VITE_SUPABASE_URL` - Supabase project URL
  - `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- Client initialized in `src/integrations/supabase/client.ts`

**Database:**
- Table: `requests` - Stores contact form submissions
  - Fields: `from_name`, `from_email`, `message`, timestamps

**Edge Functions:**
- Location: `supabase/functions/send-request-email/`
- Runtime: Deno
- Purpose: Send email notifications when contact form is submitted
  - Sends confirmation email to user (in their language)
  - Sends notification emails to admin team
- Email provider: Google SMTP via nodemailer
- Secrets required:
  - `SMTP_HOST` (default: smtp.gmail.com)
  - `SMTP_PORT` (default: 465)
  - `SMTP_USER` - Gmail address
  - `SMTP_PASS` - Gmail app password
  - `ADMIN_EMAILS` - Comma-separated list of admin emails

**Contact Form Flow:**
1. User submits form on `/contact` page
2. Form data inserted into `requests` table in Supabase
3. Edge function `send-request-email` invoked with user data
4. Function sends:
   - Confirmation email to user (translated to their language)
   - Notification email(s) to admin team with request details

### State Management

- **Server State:** TanStack Query (React Query) for async data fetching
- **Global State:** React Context API for:
  - Language preference (persisted in localStorage)
  - Theme preference (persisted in localStorage via next-themes)
- **Form State:** React Hook Form with Zod validation
- **Toast Notifications:** Sonner + shadcn/ui toaster

## Code Conventions

- **Path imports:** Use `@/` alias (e.g., `@/components/ui/button`)
- **Component files:** PascalCase naming (e.g., `Navigation.tsx`)
- **TypeScript:** Loose checking enabled - type errors may not block builds
- **ESLint:** Configured with TypeScript, React Hooks, and React Refresh plugins
- **Unused variables:** Rule is disabled (`@typescript-eslint/no-unused-vars: off`)
- **File structure:** Group by feature/type, not by file extension

## Project Structure

```
repo-landing/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui primitives (49 components)
│   │   ├── Navigation.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── NavLink.tsx
│   ├── pages/
│   │   ├── Index.tsx        # Home page
│   │   ├── About.tsx        # About page
│   │   ├── Contact.tsx      # Contact page with form
│   │   ├── Demo.tsx         # Demo page (WIP)
│   │   └── NotFound.tsx     # 404 page
│   ├── contexts/
│   │   └── LanguageContext.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── i18n/
│   │   └── translations.ts  # All translations (en, sr, bg)
│   ├── integrations/
│   │   └── supabase/
│   │       └── client.ts
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── types/
│   │   └── emailFunctionRequest.type.ts
│   ├── App.tsx              # Root component with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles + theme variables
├── supabase/
│   ├── functions/
│   │   ├── send-request-email/
│   │   │   └── index.ts     # Email edge function
│   │   └── deno.json
│   └── config.toml          # Supabase function config
├── public/                  # Static assets
├── .env.local              # Environment variables (not in git)
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Important Notes

### Lovable Integration
- This project uses Lovable's component tagger in development mode (see `vite.config.ts`)
- Changes made in Lovable are automatically committed to this repo
- Changes pushed to this repo are reflected in Lovable

### Development Server
- The dev server listens on all interfaces (`host: "::"`) for container/network access
- Runs on port 8080 instead of default Vite port (5173)

### Multi-language Requirement
- **CRITICAL:** Every feature must support all three languages (English, Bulgarian, Serbian)
- Always update all three language objects in `translations.ts` when adding new text
- Serbian uses Cyrillic script

### Adding shadcn/ui Components
- Use the standard shadcn/ui CLI or manually add to `src/components/ui/`
- Components are configured in `components.json`

### Email Functionality
- Email sending is handled by Supabase Edge Function (Deno runtime)
- Uses nodemailer with Google SMTP
- Supports multi-language email templates
- Requires proper SMTP credentials in Supabase secrets

### Theme System
- Default theme is dark mode
- Users can switch between light, dark, and system themes
- Theme preference is persisted in localStorage
- Theme toggle is in the navigation bar

## Common Tasks

### Adding a New Page
1. Create page component in `src/pages/YourPage.tsx`
2. Add route in `src/App.tsx` (above the `*` catch-all route)
3. Add navigation link in `src/components/Navigation.tsx`
4. Add translations for the page in `src/i18n/translations.ts` (all 3 languages)

### Adding Translations
1. Open `src/i18n/translations.ts`
2. Add the same key-value structure to `en`, `sr`, and `bg` objects
3. Use in components: `const { t } = useLanguage()` then access via `t.section.key`

### Working with Supabase
1. Ensure `.env.local` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
2. Import client: `import { supabase } from '@/integrations/supabase/client'`
3. Use Supabase client for database operations and edge function calls

### Deploying Edge Functions
```bash
# Login to Supabase
supabase login

# Deploy specific function
supabase functions deploy send-request-email

# Set secrets
supabase secrets set SMTP_USER=your-email@gmail.com
supabase secrets set SMTP_PASS=your-app-password
supabase secrets set ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

## Recent Development History

Based on recent conversation history:

1. **Supabase Connection Setup** (Nov 19, 2024)
   - Set up Supabase connection with credentials in `.env.local`
   - Configured Supabase client

2. **Demo Page, Branding, Theme Switch** (Nov 19, 2024)
   - Created Demo page with placeholder content
   - Renamed application from "EventSnap" to "RepoLjubavi"
   - Implemented theme switching (light/dark/system) with persistence
   - Set default theme to dark

3. **Supabase Email Edge Function** (Nov 19-20, 2024)
   - Created edge function to handle email notifications
   - Sends confirmation email to user (translated to their language)
   - Sends notification emails to admin team
   - Integrated with Google SMTP servers
   - Uses Supabase secrets for configuration

4. **Deno Module Import Fix** (Nov 20-21, 2024)
   - Resolved Deno module import errors in edge function
   - Fixed TypeScript declarations for Deno standard library

## Troubleshooting

### Deno Edge Function Issues
- Clear Deno cache if module imports fail: `deno cache --reload`
- Ensure proper import URLs for Deno standard library
- Check Supabase function logs for runtime errors

### Email Not Sending
- Verify SMTP credentials in Supabase secrets
- Check that Gmail app password is used (not regular password)
- Ensure edge function is deployed: `supabase functions deploy send-request-email`
- Check function logs in Supabase dashboard

### Theme Not Persisting
- Verify localStorage is enabled in browser
- Check that `ThemeProvider` wraps the app in `App.tsx`
- Ensure `storageKey="vite-ui-theme"` is set in ThemeProvider

### Translation Missing
- Verify the key exists in all three language objects (en, sr, bg)
- Check for typos in translation keys
- Use browser console to debug: `console.log(t)` to see available translations