import { ArtworkSchema, type Artwork } from "../schema/artworks";

export function fetchArtworkSearch(query: string): Promise<Artwork[]> {
    const trimmed = query.trim();
    if (!trimmed) return Promise.resolve([]);

    const url = new URL("https://api.artic.edu/api/v1/artworks/search");
    url.searchParams.set("q", trimmed);
    url.searchParams.set("fields", "id,title,artist_title,image_id");
    url.searchParams.set("limit", "12");

    return fetch(url.toString())
        .then((res) => {
            if (!res.ok) throw new Error("Failed to search artworks");
            return res.json();
        })
        .then((data) => {
            if (!data || !Array.isArray(data.data)) {
                throw new Error("Invalid search results");
            }

            const validated: Artwork[] = [];
            for (const item of data.data) {
                const parsed = ArtworkSchema.safeParse(item);
                if (parsed.success) validated.push(parsed.data);
            }

            return validated;
        });
}