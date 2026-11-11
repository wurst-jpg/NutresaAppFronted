const decimal = (n) => String(Math.round(n * 10) / 10).replace('.', ',');

export function formatViews(count) {
  if (count >= 1_000_000) return `${decimal(count / 1_000_000)} M vistas`;
  if (count >= 1_000) return `${decimal(count / 1_000)} mil vistas`;
  return `${count} ${count === 1 ? 'vista' : 'vistas'}`;
}

export function formatDuration(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  const ss = String(s).padStart(2, '0');
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${ss}`;
  return `${m}:${ss}`;
}

export function getInitials(name) {
  const parts = (name ?? '').trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (parts.length === 0) return '?';
  return parts.map((p) => p[0].toUpperCase()).join('');
}

export function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${decimal(bytes / (1024 * 1024))} MB`;
  if (bytes >= 1024) return `${decimal(bytes / 1024)} KB`;
  return `${bytes} B`;
}
