import { useEffect } from 'react';

const STYLES = {
  success: 'border-emerald-400 bg-emerald-950 text-emerald-100',
  error: 'border-red-400 bg-red-950 text-red-100',
};

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [onClose, duration]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 right-4 z-[60] flex max-w-sm items-start gap-3 rounded-lg border px-4 py-3 shadow-xl ${STYLES[type] ?? STYLES.success}`}
    >
      <p className="text-sm">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar notificación"
        className="rounded text-lg leading-none opacity-70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        ×
      </button>
    </div>
  );
}
