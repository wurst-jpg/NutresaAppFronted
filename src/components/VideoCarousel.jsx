import { useRef } from 'react';
import VideoCard from './VideoCard';

export default function VideoCarousel({ id, title, videos, onSelect }) {
  const trackRef = useRef(null);
  const scroll = (direction) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  const arrowClasses =
    'hidden h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-slate-200 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:flex';

  return (
    <section aria-labelledby={`${id}-title`} className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 id={`${id}-title`} className="text-lg font-bold text-white sm:text-xl">{title}</h2>
        <div className="flex gap-2">
          <button type="button" onClick={() => scroll(-1)} aria-label={`Anterior en ${title}`} className={arrowClasses}>
            ‹
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label={`Siguiente en ${title}`} className={arrowClasses}>
            ›
          </button>
        </div>
      </div>

      {videos.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-700 p-6 text-center text-sm text-slate-400">
          No se encontraron videos con los filtros actuales.
        </p>
      ) : (
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 py-2"
        >
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  );
}
