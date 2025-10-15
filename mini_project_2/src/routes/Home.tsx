import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchManga, setOffset, setQuery } from "../store/mangaSlice";
import { toggleFavorite } from "../store/favoritesSlice";
import { Link } from "react-router-dom";
import type { Manga } from "../types/manga";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error, offset, limit, query } = useSelector(
    (state: RootState) => state.manga
  );
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);

  useEffect(() => {
    dispatch(fetchManga({ offset, limit }));
  }, [dispatch, offset, limit]);

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
      (m: Manga) =>
        m.title?.toLowerCase().includes(q) ||
        m.title_english?.toLowerCase().includes(q) ||
        m.title_japanese?.toLowerCase().includes(q)
    );
  }, [items, query]);

  const handlePageChange = (newPage: number) => {
    dispatch(setOffset((newPage - 1) * limit));
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="ค้นหาชื่อมังงะ (TH/EN/JP)"
          className="input input-bordered flex-1 max-w-sm"
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
        />
        <button className="btn" onClick={() => dispatch(setOffset(0))}>
          Refresh
        </button>
      </div>

      {status === "loading" && (
        <div className="text-center">
          <span className="loading loading-lg loading-spinner"></span>
        </div>
      )}
      {status === "failed" && (
        <div className="alert alert-error mb-4">{error}</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((m: Manga) => {
          const isFavorite = favoriteIds.includes(m.mal_id);
          return (
            <div
              key={m.mal_id}
              className="card bg-base-100 shadow hover:shadow-lg transition relative overflow-hidden"
            >
              <figure className="aspect-[2/3] overflow-hidden">
                <img
                  src={m.images?.jpg?.image_url || "https://placehold.co/400x600?text=No+Cover"}
                  alt={m.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </figure>

              <div className="card-body p-4">
                <h3 className="card-title text-base line-clamp-2 h-12">{m.title}</h3>
                {m.score && (
                  <p className="text-sm opacity-70">⭐ {m.score}</p>
                )}

                <div className="card-actions justify-start mt-3">
                  <Link
                    to={`/manga/${m.mal_id}`}
                    className="btn btn-sm btn-primary"
                  >
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>

              <button
                className={`absolute bottom-3 right-3 btn btn-sm  shadow-md transition-all duration-300 ${
                  isFavorite
                    ? "btn-secondary text-white hover:btn-error"
                    : "btn-outline border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
                }`}
                onClick={() => dispatch(toggleFavorite(m.mal_id))}
                title={isFavorite ? "ลบออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}
              >
                {isFavorite ? "Favourite ★" : "Favourite ☆"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: 10 }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${offset / limit === i ? "btn-primary" : ""}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
