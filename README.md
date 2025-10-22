# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Firebase Hosting CI/CD

This repo is configured to deploy the Vite build output to Firebase Hosting whenever you push to the `main` branch.

What was added:

- `firebase.json` - Hosting configuration (serves `dist` and rewrites to `index.html`).
- `.firebaserc` - Default Firebase project id (`mhm-builders-inc-website`). Update if your project id is different.
- `.github/workflows/firebase-hosting-deploy.yml` - GitHub Actions workflow that runs `npm ci`, `npm run build`, and deploys to Firebase Hosting.

Setup steps:

1. Create a Firebase project (or use an existing one). Make note of the project id (e.g. `mhm-builders-inc-website`).
2. Enable Hosting in the Firebase Console.
3. Create a service account with the `Firebase Hosting Admin` role:
	- Go to Console > Project settings > Service accounts > Generate new private key.
	- This downloads a JSON file. Keep it safe.
4. Add the service account JSON as a GitHub secret in your repository settings named `FIREBASE_TOKEN`.
	- Copy the entire JSON file contents into the secret value.
5. Push to `main`. The GitHub Actions workflow will build and deploy automatically.

Alternative (local deploy):

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Authenticate: `firebase login`
3. Initialize if needed: `firebase init hosting` (choose `dist` as the public directory and single-page app = yes).
4. Build and deploy: `npm run build` then `firebase deploy --only hosting`.
