import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { toggleFavorite } from "../store/favoritesSlice";
import type { Manga } from "../types/manga";

export default function MangaDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const mangaList = useSelector((state: RootState) => state.manga.items);
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  const manga: Manga | undefined = mangaList.find(
    (m) => String(m.mal_id) === id
  );

  if (!manga) {
    return <div className="text-center text-red-500">ไม่พบมังงะนี้</div>;
  }

  const isFavorite = favoriteIds.includes(manga.mal_id);

  const authors =
    manga.authors?.length > 0
      ? manga.authors.map((a) => a.name).join(", ")
      : "ไม่ระบุ";

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow relative space-y-4">
      {manga.images?.jpg?.image_url && (
        <div className="relative">
          <img
            src={manga.images.jpg.image_url}
            alt={manga.title}
            className="w-full max-w-sm mx-auto rounded"
          />
          <button
            className={`absolute top-2 right-2 btn btn-sm shadow-md transition-all duration-300 ${
              isFavorite
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "btn-outline border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
            }`}
            onClick={() => dispatch(toggleFavorite(manga.mal_id))}
            title={isFavorite ? "ลบออกจากรายการโปรด" : "เพิ่มในรายการโปรด"}
          >
            {isFavorite ? "Favourite ★" : "Favourite ☆"}
          </button>
        </div>
      )}

      <h2 className="text-2xl font-bold">{manga.title}</h2>

      <p>
        <strong>English Title:</strong> {manga.title_english || "ไม่มีข้อมูล"}
      </p>
      <p>
        <strong>Japanese Title:</strong> {manga.title_japanese || "ไม่มีข้อมูล"}
      </p>
      <p>
        <strong>Chapters:</strong> {manga.chapters || "ไม่ระบุ"}
      </p>
      <p>
        <strong>Volumes:</strong> {manga.volumes || "ไม่ระบุ"}
      </p>
      <p>
        <strong>Status:</strong> {manga.status || "ไม่ระบุ"}
      </p>
      <p>
        <strong>ผู้แต่ง (Author):</strong> {authors}
      </p>

      <p className="whitespace-pre-line">{manga.synopsis}</p>
    </div>
  );
}
