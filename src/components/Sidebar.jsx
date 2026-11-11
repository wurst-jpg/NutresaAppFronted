export const SIDEBAR_ITEMS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'onboarding', label: 'Onboarding' },
  { id: 'comunicados', label: 'Comunicados' },
  { id: 'cursos', label: 'Cursos técnicos' },
];

export default function Sidebar({ open, active, onSelect, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-60 transform border-r border-slate-800 bg-navy-800 pt-16 transition-transform lg:static lg:z-auto lg:translate-x-0 lg:pt-4 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav aria-label="Secciones">
          <ul className="space-y-1 px-3">
            {SIDEBAR_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  aria-current={active === item.id ? 'page' : undefined}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                    active === item.id
                      ? 'bg-indigo-500/20 text-cyan-300'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
