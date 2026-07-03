# Cloudfare Website

An interactive, non-technical explainer site for the Vuln Harness tool: what
it does, how its discovery (VDH) and validation/scoring (VVS) pipeline works,
and what each stage actually means — with a searchable glossary.

## Develop

npm install
npm run dev

## Test

npm test

## Build

npm run build

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages via the `gh-pages` branch.
