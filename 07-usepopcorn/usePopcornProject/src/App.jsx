import { useEffect, useState } from "react";
import "./App.css";
import { MovieDetails } from "./MovieDetails";
import { WatchedMoviesList } from "./WatchedMoviesList";
import { WatchedSummary } from "./WatchedSummary";
import { MovieList } from "./MovieList";

const KEY = "356c3b5c";
export const api_url = `http://www.omdbapi.com/?apikey=${KEY}&`;

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Nav({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function SearchResult() {
  return (
    <p className="num-results">
      {/* Found <strong>{movies.length}</strong> results */}
      Found <strong>X</strong> results
    </p>
  );
}

function WatchedList({ watched, onDeleteWatched }) {
  return (
    <>
      <WatchedSummary watched={watched} />
      <WatchedMoviesList watched={watched} onDeleteWatched={onDeleteWatched} />
    </>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Loader() {
  return <p className="loader">Loading</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

export default function App() {
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("batman");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  const HandleCloseMovie = () => {
    setSelectedID(false);
  };

  const HandleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    const controller = new AbortController();

    if (query.length < 3) return;
    setIsLoading(true);
    setMovies([]);
    async function fetchMovieData() {
      try {
        const res = await fetch(api_url + "s=" + query, {
          signal: controller.signal,
        });
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setError("");
        setMovies(data.Search);
        console.log(data.Search);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieData();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Nav>
        <Search query={query} setQuery={setQuery} />
        <SearchResult />
      </Nav>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} setSelectedID={setSelectedID} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <>
            {selectedID ? (
              <MovieDetails
                watched={watched}
                selectedID={selectedID}
                setError={setError}
                onAddWatched={HandleAddWatched}
                onCloseMovie={HandleCloseMovie}
              />
            ) : (
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            )}
          </>
        </Box>
      </Main>
    </>
  );
}
