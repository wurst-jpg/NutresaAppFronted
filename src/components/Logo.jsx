export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8" role="img" aria-label="Logo de VideoCorp">
        <rect width="32" height="32" rx="8" fill="#4f46e5" />
        <path d="M12 9l12 7-12 7z" fill="#22d3ee" />
      </svg>
      <span className="text-lg font-bold tracking-tight text-white">
        Video<span className="text-cyan-400">Corp</span>
      </span>
    </div>
  );
}
