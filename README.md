# Movie Explorer

A beginner-friendly React + Vite movie search project using the OMDb API.

## Features

- Search movies by title using the OMDb `s` parameter
- Display movie results as responsive cards
- Show loading and error states
- Use React Router routes:
  - `/`
  - `/movies?search=Batman`
  - `/movie/:id`
- Fetch full movie details using the OMDb `i` parameter
- Clean Tailwind CSS responsive UI

## React concepts used

- Functional components
- JSX
- Props and parent-child data flow
- `useState`
- `useEffect`
- Controlled form input
- `onChange`, `onSubmit`
- Conditional rendering
- `.map()` and `key`
- React Router: `BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate`, `useParams`, `useSearchParams`
- Fetch API
- Loading and error states

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_OMDB_API_KEY=your_omdb_api_key_here
```

You can get an OMDb key from:

```txt
https://www.omdbapi.com/apikey.aspx
```

Important: Vite exposes `VITE_*` variables to the frontend browser. This is okay for a college frontend project, but do not treat it as a private backend secret.

Run the project:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Main data flow

```txt
User searches movie
        ↓
SearchBar controlled input stores text
        ↓
Form submit calls onSearch
        ↓
Home or Movies page navigates to /movies?search=movieName
        ↓
Movies page reads query string using useSearchParams
        ↓
useEffect calls OMDb search API
        ↓
movies state updates
        ↓
MovieList maps over movies
        ↓
MovieCard receives one movie through props
        ↓
User clicks View Details
        ↓
React Router opens /movie/:id
        ↓
MovieDetails reads id using useParams
        ↓
useEffect calls OMDb details API
        ↓
Full movie details display
```
