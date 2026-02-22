import type { Artwork } from "../schema/artworks";

type Props = {
  artwork: Artwork;
};

export default function ArtworkCard({ artwork }: Props) {
  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`
    : null;

  return (
    <div className="card">
      {imageUrl ? (
        <img className="card__img" src={imageUrl} alt={artwork.title ?? "Artwork"} />
      ) : (
        <div className="card__img card__img--empty">No Image</div>
      )}

      <h3 className="card__title">{artwork.title ?? "Untitled"}</h3>
      <p className="card__artist">{artwork.artist_title ?? "Unknown Artist"}</p>
    </div>
  );
}