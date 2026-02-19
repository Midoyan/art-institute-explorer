import { useEffect, useState } from "react";
import type { Gallery as GalleryType } from "../schema/gallery";
import ArtworkCard from "./ArtworkCard";
import { readGallery, removeFromGallery, updateNote } from "../utils/galleryStorage";

type Props = {
  refreshSignal: number;
};

export default function Gallery({ refreshSignal }: Props) {
  const [gallery, setGallery] = useState<GalleryType>([]);

  useEffect(() => {
    setGallery(readGallery());
  }, []);

  useEffect(() => {
    setGallery(readGallery());
  }, [refreshSignal]);

  function handleDelete(id: number) {
    const updated = removeFromGallery(id);

    setGallery(updated);
  }

  function handleNoteChange(id: number, newNote: string) {
    const updated = updateNote(id, newNote);

    setGallery(updated);
  }

  return (
    <section className="section">
      <h2 className="section__title">My Gallery</h2>

      {gallery.length === 0 ? (
        <p className="muted">No saved artworks yet. Add some from results.</p>
      ) : (
        <div className="grid">
          {gallery.map((item) => (
            <div key={item.artwork.id} className="galleryItem">
              <ArtworkCard artwork={item.artwork} />
              <label className="label">
                Note
                <textarea
                  className="textarea"
                  value={item.note}
                  onChange={(e) => handleNoteChange(item.artwork.id, e.target.value)}
                  placeholder="Write a short note..."
                  rows={3}
                />
              </label>

              <button className="btn btn--danger" onClick={() => handleDelete(item.artwork.id)}>
                Remove from Gallery
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}