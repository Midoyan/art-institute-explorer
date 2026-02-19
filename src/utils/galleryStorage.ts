import type { Artwork } from "../schema/artworks";
import { GallerySchema, type Gallery } from "../schema/gallery";
import { NoteSchema } from "../schema/note";

const STORAGE_KEY = "art_institute_gallery";

export function readGallery(): Gallery {

    const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);

    return GallerySchema.parse(parsed);
  } catch {
    return [];
  }
}

export function writeGallery(gallery: Gallery) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gallery));
}

export function addToGallery(artwork: Artwork): Gallery {
  const current = readGallery();

  const exists = current.some((item) => item.artwork.id === artwork.id);
  if (exists) return current;

  const updated: Gallery = [{ artwork, note: "" }, ...current];

  writeGallery(updated);

  return updated;
}

export function removeFromGallery(artworkId: number): Gallery {
  const current = readGallery();

  const updated = current.filter((item) => item.artwork.id !== artworkId);

  writeGallery(updated);
  return updated;
}

export function updateNote(artworkId: number, noteInput: string): Gallery {
  const current = readGallery();

  const safeNote = NoteSchema.parse(noteInput);

  const updated = current.map((item) => {
    if (item.artwork.id !== artworkId) return item;
    return { ...item, note: safeNote };
  });

  writeGallery(updated);
  return updated;
}