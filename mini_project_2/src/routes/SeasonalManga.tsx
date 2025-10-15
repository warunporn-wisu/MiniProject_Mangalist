import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SeasonalManga() {
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);
  const seasons = ['winter', 'spring', 'summer', 'fall'];
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedSeason, setSelectedSeason] = useState('fall'); 

  useEffect(() => {
    const fetchSeasonalManga = async () => {
      setLoading(true); 
      setError(null);   

      let startDate, endDate;
      switch (selectedSeason) {
        case 'winter':
          startDate = `${selectedYear}-01-01`;
          endDate = `${selectedYear}-03-31`;
          break;
        case 'spring':
          startDate = `${selectedYear}-04-01`;
          endDate = `${selectedYear}-06-30`;
          break;
        case 'summer':
          startDate = `${selectedYear}-07-01`;
          endDate = `${selectedYear}-09-30`;
          break;
        case 'fall':
          startDate = `${selectedYear}-10-01`;
          endDate = `${selectedYear}-12-31`;
          break;
        default:
          return;
      }

      try {
        const response = await axios.get('https://api.jikan.moe/v4/manga', {
          params: {
            start_date: startDate,
            end_date: endDate,
            order_by: 'start_date', 
            sort: 'asc',             
            sfw: true,             
            limit: 24               
          }
        });
        setMangaList(response.data.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchSeasonalManga();
  }, [selectedYear, selectedSeason]); 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Seasonal Manga</h1>

      <div className="flex gap-4 mb-6 p-4 bg-base-200 rounded-lg">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Year</span>
          </label>
          <select
            className="select select-bordered"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Season</span>
          </label>
          <select
            className="select select-bordered"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
          >
            {seasons.map(season => (
              <option key={season} value={season} className="capitalize">{season}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <div className="text-center"><span className="loading loading-lg"></span></div>}
      {error && <div role="alert" className="alert alert-error">{error}</div>}
      
      {!loading && !error && (
        <>
          {mangaList.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mangaList.map(manga => (
                <div key={manga.mal_id} className="card bg-base-100 shadow-xl transition-transform hover:scale-105">
                  <figure className="relative"> 
                    <img src={manga.images.webp.image_url} alt={manga.title} className="aspect-[2/3] w-full object-cover" />
                               
                    <div 
                      className={`badge absolute top-2 right-2 font-bold ${
                        manga.status === 'Finished' ? 'badge-primary' : 'badge-accent'
                      }`}
                    >
                      {manga.status}
                    </div>
                  </figure>
                  <div className="card-body p-3">
                    <h2 className="card-title text-sm truncate" title={manga.title}>
                      {manga.title}
                    </h2>
                    <p className="text-xs">
                      Start: {new Date(manga.published.from).toLocaleDateString()}
                    </p>
                    <div className="badge badge-secondary">{manga.score ? `⭐ ${manga.score}` : 'N/A'}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg">No manga found for the selected season.</p>
          )}
        </>
      )}
    </div>
  );
}