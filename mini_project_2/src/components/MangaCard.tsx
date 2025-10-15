import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import type { RootState, AppDispatch } from "../store/store";
import type { Manga } from "../types/manga";

type Props = { manga: Manga };

export default function MangaCard({ manga }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { ids } = useSelector((state: RootState) => state.favorites);

  const isFavorited = ids.includes(manga.mal_id);

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition">
      <figure className="aspect-[2/3] overflow-hidden">
        <img
          src={manga.images?.jpg?.image_url || "https://placehold.co/400x600?text=No+Cover"}
          alt={manga.title}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base line-clamp-2 h-12">{manga.title}</h2>
        {manga.score && <p className="text-sm opacity-70">⭐ {manga.score}</p>}
        <div className="card-actions justify-between items-center mt-3">
          <Link to={`/manga/${manga.mal_id}`} className="btn btn-primary btn-sm">
            Details
          </Link>
          <button
            className={`btn btn-outline btn-sm ${isFavorited ? "btn-secondary" : ""}`}
            onClick={() => dispatch(toggleFavorite(manga.mal_id))} // ✅ ใช้ mal_id
          >
            {isFavorited ? "★ Favorited" : "☆ Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}
