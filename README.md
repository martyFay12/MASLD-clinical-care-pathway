# MASLD-clinical-care-pathway
Knowledge translation project for easing the use of the MASLD clinical care pathway

## Run the app

Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Run the tests

Run the typed pathway-engine tests with Vitest:

```sh
npm test
```

## Configure clinical assumptions

All development assumptions are grouped in `src/config.ts`. Review and
validate these thresholds before using the application for patient care.

The implemented logical branches are documented in
[`docs/pathway-logic.md`](docs/pathway-logic.md).

## Deploy

The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` tests,
builds, and deploys the app to GitHub Pages after changes are pushed to `main`.

Before the first deployment, enable the workflow as the repository's Pages
source:

1. Open the GitHub repository's **Settings** tab.
2. Select **Pages** under **Code and automation**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Run **Deploy to GitHub Pages** from the repository's **Actions** tab if the
   initial push occurred before Pages was enabled.
