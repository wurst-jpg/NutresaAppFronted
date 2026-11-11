import { DEPARTAMENTO_LABELS } from '../utils/constants';
import { formatDuration, formatViews } from '../utils/format';

export default function VideoCard({ video, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(video)}
      aria-label={`Reproducir ${video.titulo}`}
      className="group w-64 shrink-0 snap-start text-left transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:scale-105 focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg sm:w-72"
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-800">
        <img
          src={video.thumbnail}
          alt={`Miniatura de ${video.titulo}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          {formatDuration(video.duracion)}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/90 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </span>
      </div>
      <div className="mt-2 px-1">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-100">{video.titulo}</h3>
        <p className="text-xs text-slate-400">
          {video.autor} · {DEPARTAMENTO_LABELS[video.departamento]}
        </p>
        <p className="text-xs text-slate-500">{formatViews(video.vistas)}</p>
      </div>
    </button>
  );
}
