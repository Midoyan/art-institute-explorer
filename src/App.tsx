// src/App.tsx
import "./App.css";
import { useState } from "react";
import type { Artwork } from "./schema/artworks";
import { addToGallery } from "./utils/galleryStorage";
import Gallery from "./components/Gallery";
import ArtworkCard from "./components/ArtworkCard";

function App() {
  // This number forces Gallery to reload when it changes
  const [refreshSignal, setRefreshSignal] = useState(0);

  // TEMP example results (your peer will replace this with API search results)
  const exampleResults: Artwork[] = [
    { id: 1, title: "Example Artwork 1", artist_title: "Example Artist", image_id: null },
    { id: 2, title: "Example Artwork 2", artist_title: "Another Artist", image_id: null },
  ];

  function handleAdd(artwork: Artwork) {
    // (FR008) save to localStorage
    addToGallery(artwork);

    // Trigger Gallery reload by increasing refreshSignal
    setRefreshSignal((prev) => prev + 1);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Art Institute Explorer</h1>
        <p className="muted">Search + save artworks to your gallery.</p>
      </header>

      {/* TEMP results section (will become real search results by your peer) */}
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

      {/* Your part FR007–FR012 */}
      <Gallery refreshSignal={refreshSignal} />
    </div>
  );
}

export default App;