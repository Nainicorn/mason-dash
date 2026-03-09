# Mason Dash

A responsive student dashboard for George Mason University, giving students quick access to their courses, schedules, campus map, academic progress, and more — all in one place.

**Live Demo:** [masondash.sreenaina.com](https://masondash.sreenaina.com/)

## Features

- **Course Schedule** — Weekly calendar view with color-coded course blocks. Click any course to see details (professor, location, room, credits).
- **Student Info** — View major, year, term, GPA, advisor, and enrollment status at a glance.
- **Future Schedule Builder** — Plan future semesters by adding/removing courses to a visual weekly calendar.
- **Campus Map** — Interactive map that pans and zooms to building locations with building photos.
- **Academic Progress** — Track finished, current, and future courses with credit counts.
- **Themes** — 5 color themes: Mason (green & gold), Light, Night, Ocean, and Dark. Persisted across sessions.

## Tech Stack

- **Vanilla JavaScript** (ES6 modules, dynamic imports for code splitting)
- **Handlebars** (HTML templating)
- **SCSS** (styling with CSS custom properties for theming)
- **Webpack 5** (bundling, dev server, hot reload)
- **AWS** (DynamoDB, API Gateway, Lambda)
- **Jest** (testing)

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

```bash
git clone https://github.com/nainicorn/MasonDash.git
cd MasonDash
npm install
```

### Development

```bash
npm start
```

Opens the app at `http://localhost:5001` with hot reload.

### Production Build

```bash
npm run build
```

Outputs to the `dist/` directory.

### Tests

```bash
npm test
```

## Project Structure

```
src/
├── components/
│   ├── courses/      # Weekly course schedule calendar
│   ├── credits/      # Academic progress tracker
│   ├── future/       # Future schedule builder
│   ├── info/         # Student info pills
│   ├── layout/       # App shell, header, accordion navigation
│   ├── login/        # Authentication page
│   ├── map/          # Interactive campus map
│   └── user/         # User display in header
├── services/
│   ├── aws.js            # API endpoint configuration
│   ├── cookieService.js  # Cookie management
│   ├── coursesService.js # Course data fetching
│   ├── studentsService.js # Student data fetching
│   └── usersService.js   # User session management
├── images/           # Logos, campus map, building photos
├── tests/            # Jest test files
├── index.js          # App entry point
├── index.scss        # Global styles & theme definitions
├── index.html        # Main app HTML
└── login.html        # Login page HTML
```

## Architecture

Each feature is a self-contained module (JS + Handlebars template + SCSS). Modules are **dynamically imported** on demand when a user opens a section, keeping the initial bundle small.

The theme system uses **CSS custom properties** scoped to `data-theme` attributes on the body, allowing instant theme switching without re-rendering.

Authentication uses a cookie-based session (`mason-user`) with a 30-minute expiration.

## Team

- **Sreenaina Koujala** — Team Lead
- Sima Karsli
- Saif Murad
- Matthew Roberts
- Vaibhav Sonnakul
- Ryan Sullivan
- Thomas Tucker
