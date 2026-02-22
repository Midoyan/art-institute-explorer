import "./App.css";
import { useState, type FormEvent } from "react";
import type { Artwork } from "./schema/artworks";
import { addToGallery } from "./utils/galleryStorage";
import Gallery from "./components/Gallery";
import ArtworkCard from "./components/ArtworkCard";
import { fetchArtworkSearch } from "./utils/fetchArtwork";
import { readGallery } from "./utils/galleryStorage";
import type { Gallery as GalleryType } from "./schema/gallery";

function App() {
  const [gallery, setGallery] = useState<GalleryType>(() => readGallery());
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleAdd(artwork: Artwork) {
    addToGallery(artwork);
    setGallery(prev => [{ artwork, note: "" }, ...prev]);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetchArtworkSearch(trimmed)
      .then((items) => {
        setResults(items);
      })
      .catch((err: Error) => {
        setError(err.message || "Search failed");
        setResults([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Welcome to the Art Institute Explorer</h1>
        <p className="muted">Search + Save artworks to your gallery.</p>
      </header>

      <section className="section">
        <h2 className="section__title">Search the collection</h2>

        <form className="searchForm" onSubmit={handleSearch}>
          <input
            className="input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Portrait, landscape, Picasso..."
          />
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        {error ? <p className="muted">{error}</p> : null}

        <div className="grid">
          {results.map((art) => (
            <div key={art.id} className="galleryItem">
              <ArtworkCard artwork={art} />

              <button className="btn" onClick={() => handleAdd(art)}>
                Add to Gallery
              </button>
            </div>
          ))}
        </div>

        {!isLoading && !error && results.length === 0 ? (
          <p className="muted">No results yet. Run a search to see artworks.</p>
        ) : null}
      </section>

      <Gallery gallery={gallery} setGallery={setGallery} />
    </div>
  );
}

export default App;