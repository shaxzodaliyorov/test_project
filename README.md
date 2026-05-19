# Test Project

## Tech stack

- **React 19** — UI
- **TypeScript** — typing
- **Vite** — dev server and build
- **Ant Design** — components and layout
- **React Router** — routing
- **TanStack Query** — server state / API requests
- **Zustand** — client state (auth, theme, appearance)
- **i18next / react-i18next** — locales (en, ru, uz)
- **Recharts** & **@ant-design/plots** — charts
- **MSW** — mock API in development
- **ESLint** + **typescript-eslint** — linting

## Requirements

- Node.js 18+
- npm or yarn

## Setup

```bash
npm install
# or
yarn
```

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start dev server (Vite)  |
| `npm run build`   | Type-check and production build |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Demo accounts

| Label           | Email              | Password  | Roles                   |
| --------------- | ------------------ | --------- | ----------------------- |
| Admin           | admin@test.com     | Admin@123 | admin, payment, reports |
| Payment         | payment@test.com   | Payment@1 | payment                 |
| Reports         | reports@test.com   | Reports@1 | reports                 |
| Users only      | usersonly@test.com | Users@123 | users                   |
| User (no roles) | user@test.com      | User@1234 | —                       |
