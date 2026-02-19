import { z } from "zod";
import { ArtworkSchema } from "./artworks";
import { NoteSchema } from "./note";

export const GalleryItemSchema = z.object({
  artwork: ArtworkSchema,
  note: NoteSchema,
});

export const GallerySchema = z.array(GalleryItemSchema);

export type GalleryItem = z.infer<typeof GalleryItemSchema>;
export type Gallery = z.infer<typeof GallerySchema>;
