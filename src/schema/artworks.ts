import z from "zod";

export const ArtworkSchema = z.object({
    id: z.number(),
    title: z.string().nullable().default("Untitled"),
    artist_title: z.string().nullable().default("Unknown Artist"),
    image_id: z.string().nullable().default(null)
});

export type Artwork = z.infer<typeof ArtworkSchema>;