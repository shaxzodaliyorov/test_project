# Test Project

RBAC demo admin panel built with React, TypeScript, Vite, and Ant Design. Sign in with a demo account below to explore role-based navigation and permissions. The app uses MSW for a local mock API — not for production.

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

Use these credentials on the login page during local development:

| Label           | Email              | Password  | Roles                   |
| --------------- | ------------------ | --------- | ----------------------- |
| Admin           | admin@test.com     | Admin@123 | admin, payment, reports |
| Payment         | payment@test.com   | Payment@1 | payment                 |
| Reports         | reports@test.com   | Reports@1 | reports                 |
| Users only      | usersonly@test.com | Users@123 | users                   |
| User (no roles) | user@test.com      | User@1234 | —                       |
