import { useEffect } from 'react';
import { DEPARTAMENTO_LABELS } from '../utils/constants';
import { formatBytes, formatViews } from '../utils/format';

export default function VideoModal({ video, onClose }) {
  // Cierra con Escape y bloquea el scroll del fondo mientras está abierto.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative my-6 w-full max-w-3xl overflow-hidden rounded-xl border border-slate-700 bg-navy-800 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          autoFocus
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-xl text-white hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          ×
        </button>

        <video
          src={video.videoUrl}
          poster={video.thumbnail}
          controls
          className="aspect-video w-full bg-black"
        >
          Tu navegador no puede reproducir este video.
        </video>

        <div className="space-y-4 p-5">
          <div>
            <h2 id="modal-title" className="text-xl font-bold text-white">{video.titulo}</h2>
            <p className="text-sm text-slate-400">
              {video.autor} · {DEPARTAMENTO_LABELS[video.departamento]} · {formatViews(video.vistas)}
            </p>
          </div>
          <p className="text-slate-200">{video.descripcion}</p>

          <div>
            <h3 className="mb-2 font-semibold text-white">Recursos adjuntos</h3>
            <ul className="divide-y divide-slate-700 rounded-lg border border-slate-700">
              {video.recursos.map((r) => (
                <li key={r.nombre} className="flex items-center justify-between gap-3 p-3 text-sm">
                  <span className="text-slate-200">
                    {r.nombre} <span className="text-slate-500">({r.tipo}, {formatBytes(r.tamano)})</span>
                  </span>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 underline hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    Descargar
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
