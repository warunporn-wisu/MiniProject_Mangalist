export type MangaResponse = {
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
  data: Manga[];
};

// Main type for manga data
export type Manga = {
  mal_id: number;
  title: string;
  title_english?: string;
  title_japanese?: string;
  type?: string;
  chapters?: number | null;
  volumes?: number | null;
  status?: string;
  publishing?: boolean;
  score?: number | null;
  rank?: number | null;
  synopsis?: string;
  authors?: MangaAuthor[];
  genres?: MangaGenre[];
  images: MangaImages;
};

// Type for authors
export type MangaAuthor = {
  mal_id: number;
  name: string;
  type?: string;
  url?: string;
};

// Type for genres
export type MangaGenre = {
  mal_id: number;
  name: string;
  type?: string;
  url?: string;
};

// Type for images
export type MangaImages = {
  jpg: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
  webp: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
};