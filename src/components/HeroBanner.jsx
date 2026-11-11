import { useState } from 'react';

export default function HeroBanner({ video, onPlay }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden rounded-xl border border-slate-800"
    >
      <img
        src={video.thumbnail}
        alt={`Imagen del video ${video.titulo}`}
        className="h-72 w-full object-cover sm:h-96"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          Video institucional del mes
        </p>
        <h2 id="hero-title" className="text-2xl font-bold text-white sm:text-4xl">
          {video.titulo}
        </h2>
        <p className={`mt-2 max-w-2xl text-sm text-slate-200 sm:text-base ${expanded ? '' : 'line-clamp-2'}`}>
          {video.descripcion}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onPlay(video)}
            className="rounded-md bg-white px-5 py-2 font-semibold text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Reproducir ahora
          </button>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="rounded-md bg-slate-700/80 px-5 py-2 font-semibold text-white hover:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {expanded ? 'Menos información' : 'Más información'}
          </button>
        </div>
      </div>
    </section>
  );
}
