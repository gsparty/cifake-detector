# CI Fake Detector

Monorepo for a fake-content detection project with separate backend and frontend applications.

## Repository layout

- `cifake-detector/` - backend service (Java/Maven project)
- `fake-detector-ui/` - frontend app (React + Vite)
- `libs/` - shared libraries/assets used by project components

## Frontend

The UI app lives in `fake-detector-ui/` and includes its own setup files:

- `package.json`
- `vite.config.js`
- `src/`

## Backend

The backend service lives in `cifake-detector/` and includes:

- `pom.xml`
- `src/`
- Maven wrapper files

## Notes

This repository is organized as a multi-part project. Start each component from its own subdirectory.
