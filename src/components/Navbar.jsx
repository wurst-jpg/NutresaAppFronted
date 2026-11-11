import Logo from './Logo';
import { DEPARTAMENTOS, DEPARTAMENTO_LABELS } from '../utils/constants';
import { getInitials } from '../utils/format';

export default function Navbar({
  user,
  query,
  onQueryChange,
  departamento,
  onDepartamentoChange,
  onLogout,
  onToggleSidebar,
  sidebarOpen,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-navy-900/95 backdrop-blur">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Abrir menú de navegación"
          aria-expanded={sidebarOpen}
          aria-controls="sidebar"
          className="rounded p-2 text-slate-200 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>

        <Logo />

        <div className="order-last flex w-full gap-2 sm:order-none sm:w-auto sm:flex-1 sm:justify-center">
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar videos…"
            aria-label="Buscar videos"
            className="min-w-0 flex-1 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:max-w-md"
          />
          <select
            value={departamento}
            onChange={(e) => onDepartamentoChange(e.target.value)}
            aria-label="Filtrar por departamento"
            className="rounded-md border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <option value="">Todos los departamentos</option>
            {DEPARTAMENTOS.map((d) => (
              <option key={d} value={d}>{DEPARTAMENTO_LABELS[d]}</option>
            ))}
          </select>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white"
          >
            {getInitials(user.nombre)}
          </div>
          <span className="hidden text-sm font-medium text-slate-200 md:inline">{user.nombre}</span>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-md border border-slate-600 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
