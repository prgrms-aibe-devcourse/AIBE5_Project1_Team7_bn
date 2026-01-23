hello again

## Frontend Submodule: team-fe/FE

The `team-fe/FE` directory contains the frontend for this project, built with **React** and **Vite**. Key features and structure:

- **Modern React (v19)** with Vite for fast development and HMR.
- Uses **React Router v7** for page navigation.
- Integrates **Google Maps** via `@googlemaps/js-api-loader` and custom logic for location-based features (e.g., finding hotels near festivals).
- **Tailwind CSS** is set up for styling.
- Main pages include Home, Login, Signup, Calendar, and multiple Map views.
- Data-driven: uses a local JSON file for festival data and dynamic Google Places API queries.
- See `team-fe/FE/README.md` for more details on setup and development scripts.

### Quick Start

```sh
cd team-fe/FE
npm install
npm run dev
```

### Notable Packages
- `react`, `react-dom`, `react-router-dom`
- `@googlemaps/js-api-loader`, `@react-oauth/google`
- `tailwindcss`, `vite`, `eslint`

---
For more, see the FE submodule's README and source files.
