import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import MangaGrid from "../components/MangaGrid";
import type { Manga } from "../types/manga";

export default function Favorites() {
  const { ids } = useSelector((state: RootState) => state.favorites);
  const [favItems, setFavItems] = useState<Manga[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ids.length) {
      setFavItems([]);
      return;
    }

    const fetchFavorites = async () => {
      setStatus("loading");
      try {
        const responses = await Promise.all(
          ids.map((id) =>
            axios.get<{ data: Manga }>(`https://api.jikan.moe/v4/manga/${id}`)
          )
        );
        const mangas = responses.map((res) => res.data.data);
        setFavItems(mangas);
        setStatus("idle");
      } catch (err) {
        console.error(err);
        setError("ไม่สามารถโหลดข้อมูลมังงะโปรดได้");
        setStatus("error");
      }
    };

    fetchFavorites();
  }, [ids]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Favorite Manga</h1>

      {status === "loading" && (
        <div className="text-center">
          <span className="loading loading-lg loading-spinner"></span>
        </div>
      )}

      {status === "error" && (
        <div className="alert alert-error mb-4">{error}</div>
      )}

      {status === "idle" && favItems.length > 0 && (
        <MangaGrid items={favItems} />
      )}

      {status === "idle" && !favItems.length && (
        <div className="text-center opacity-70 p-10">
          ยังไม่มีรายการโปรด — ไปที่หน้า Home แล้วกด “Favorite” ที่การ์ดมังงะ
        </div>
      )}
    </div>
  );
}
