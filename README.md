# Recipe Hub

Recipe Hub is a React and Vite single-page application for browsing recipes, saving favorites, planning meals, and managing a recipe community.

## Run locally

```sh
npm install
npm run dev
```

The application starts at the Vite URL shown in the terminal. React Router handles in-app navigation and direct page URLs.

## Demo accounts

- User: `foodie` / `password123`
- Admin: `admin` / `admin123`

Administrator registration is intentionally disabled. These demo credentials are for evaluation only.

## Features

- User registration and role-specific sign-in, persisted in browser Local Storage.
- Recipe search, recipe submissions, favorites, collections, ratings, written reviews, and ingredient scaling.
- Cooking instructions with per-step timers and optional browser text-to-speech.
- Shopping lists generated from selected recipes and a saved weekly meal planner.
- Admin recipe management, account access management, analytics, ratings, and submission review.

The application is a front-end demonstration. Accounts and recipe data are stored in the current browser and are not a production authentication or server-side authorization system. Nutrition information is shown only when a recipe includes verified data and a source.

`sample.html` and `registration.html` are retained as legacy backups. They are not Vite entry pages; the active application starts from `index.html` and `/src/main.jsx`.

## Build and tests

```sh
npm test
npm run build
```

Vercel is configured to route direct application URLs to the React entry page.
