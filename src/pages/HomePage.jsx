import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import HeroBanner from '../components/HeroBanner';
import VideoCarousel from '../components/VideoCarousel';
import VideoModal from '../components/VideoModal';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import { videoService } from '../services/videoService';
import { HERO_VIDEO } from '../data/videos';
import { filterVideos } from '../utils/filterVideos';

export default function HomePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [secciones, setSecciones] = useState(null);
  const [query, setQuery] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [activeSection, setActiveSection] = useState('inicio');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let cancelled = false;
    videoService.getCatalog().then((data) => {
      if (!cancelled) setSecciones(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };
  const closeModal = useCallback(() => setSelected(null), []);

  const visibles = (secciones ?? []).filter(
    (s) => activeSection === 'inicio' || s.id === activeSection,
  );
  const showHero = activeSection === 'inicio' && !query.trim() && !departamento;

  return (
    <div className="min-h-screen bg-navy-900">
      <Navbar
        user={user}
        query={query}
        onQueryChange={setQuery}
        departamento={departamento}
        onDepartamentoChange={setDepartamento}
        onLogout={handleLogout}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          active={activeSection}
          onSelect={(id) => {
            setActiveSection(id);
            setSidebarOpen(false);
          }}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="min-w-0 flex-1 space-y-8 p-4 sm:p-6">
          {showHero && <HeroBanner video={HERO_VIDEO} onPlay={setSelected} />}

          {secciones === null ? (
            <div className="flex items-center justify-center gap-2 py-16 text-slate-300" role="status">
              <Spinner className="h-6 w-6" /> Cargando videos…
            </div>
          ) : (
            visibles.map((s) => (
              <VideoCarousel
                key={s.id}
                id={s.id}
                title={s.titulo}
                videos={filterVideos(s.videos, query, departamento)}
                onSelect={setSelected}
              />
            ))
          )}
        </main>
      </div>
      {selected && <VideoModal video={selected} onClose={closeModal} />}
    </div>
  );
}
