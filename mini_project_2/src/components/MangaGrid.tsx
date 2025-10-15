import type { Manga } from "../types/manga";
import MangaCard from "./MangaCard";

export default function MangaGrid({ items }: { items: Manga[] }) {
  if (!items?.length)
    return <div className="text-center opacity-70 p-10">No manga found.</div>;

  return (
    <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {items.map(m => <MangaCard key={m.mal_id} manga={m} />)}
    </div>
  );
}
