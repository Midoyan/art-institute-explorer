import "./App.css";
import { useState } from "react";
import type { Artwork } from "./schema/artworks";
import { addToGallery } from "./utils/galleryStorage";
import Gallery from "./components/Gallery";
import ArtworkCard from "./components/ArtworkCard";

function App() {
  const [refreshSignal, setRefreshSignal] = useState(0);

  const exampleResults: Artwork[] = [
    { id: 1, title: "Example Artwork 1", artist_title: "Example Artist", image_id: null },
    { id: 2, title: "Example Artwork 2", artist_title: "Another Artist", image_id: null },
  ];

  function handleAdd(artwork: Artwork) {
    addToGallery(artwork);

    setRefreshSignal((prev) => prev + 1);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Welcome to the Art Institute Explorer</h1>
        <p className="muted">Search + Save artworks to your gallery.</p>
      </header>

      <section className="section">
        <h2 className="section__title">Results (temporary)</h2>

        <div className="grid">
          {exampleResults.map((art) => (
            <div key={art.id} className="galleryItem">
              <ArtworkCard artwork={art} />

              <button className="btn" onClick={() => handleAdd(art)}>
                Add to Gallery
              </button>
            </div>
          ))}
        </div>
      </section>

      <Gallery refreshSignal={refreshSignal} />
    </div>
  );
}

export default App;