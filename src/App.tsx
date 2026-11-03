import React, { useState, useEffect } from 'react';
import { SectionType, Curso, Capacitacion, Taller } from './types';
import { apiService } from './services/api';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CursosSection } from './components/sections/CursosSection';
import { CapacitacionesSection } from './components/sections/CapacitacionesSection';
import { TalleresSection } from './components/sections/TalleresSection';
import { ProfileSection } from './components/sections/ProfileSection';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { VideoPlayerModal } from './components/player/VideoPlayerModal';
import { SedeMapModal } from './components/map/SedeMapModal';
import { InscripcionModal } from './components/modals/InscripcionModal';
import { PropuestaModal } from './components/modals/PropuestaModal';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('cursos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Datasets
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [capacitaciones, setCapacitaciones] = useState<Capacitacion[]>([]);
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modales
  const [selectedPlayerItem, setSelectedPlayerItem] = useState<Curso | Capacitacion | Taller | null>(null);
  const [selectedTallerInscripcion, setSelectedTallerInscripcion] = useState<Taller | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isPropuestaOpen, setIsPropuestaOpen] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [curList, capList, talList] = await Promise.all([
        apiService.getCursos(),
        apiService.getCapacitaciones(),
        apiService.getTalleres()
      ]);
      setCursos(curList);
      setCapacitaciones(capList);
      setTalleres(talList);
    } catch (e) {
      console.error('Error loading data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCurso = (newCurso: Curso) => {
    setCursos(prev => [newCurso, ...prev]);
  };

  const handleAddTaller = (newTaller: Taller) => {
    setTalleres(prev => [newTaller, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Header Fijo */}
      <Header
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onOpenMap={() => setIsMapOpen(true)}
        onOpenPropuesta={() => setIsPropuestaOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xs font-semibold text-slate-600">
              Cargando saberes comunitarios de Bariloche...
            </p>
          </div>
        ) : (
          <>
            {activeSection === 'cursos' && (
              <CursosSection
                cursos={cursos}
                searchQuery={searchQuery}
                onOpenPlayer={(curso) => setSelectedPlayerItem(curso)}
              />
            )}

            {activeSection === 'capacitaciones' && (
              <CapacitacionesSection
                capacitaciones={capacitaciones}
                searchQuery={searchQuery}
                onOpenPlayer={(cap) => setSelectedPlayerItem(cap)}
              />
            )}

            {activeSection === 'talleres' && (
              <TalleresSection
                talleres={talleres}
                searchQuery={searchQuery}
                onOpenPlayer={(taller) => setSelectedPlayerItem(taller)}
                onOpenInscripcion={(taller) => setSelectedTallerInscripcion(taller)}
                onOpenMap={() => setIsMapOpen(true)}
              />
            )}

            {activeSection === 'perfil' && (
              <ProfileSection
                cursos={cursos}
                capacitaciones={capacitaciones}
                talleres={talleres}
                onOpenPlayer={(item) => setSelectedPlayerItem(item)}
              />
            )}

            {activeSection === 'admin' && (
              <AdminDashboard
                cursos={cursos}
                talleres={talleres}
                onAddCurso={handleAddCurso}
                onAddTaller={handleAddTaller}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modales Globales */}
      <VideoPlayerModal
        isOpen={Boolean(selectedPlayerItem)}
        onClose={() => setSelectedPlayerItem(null)}
        item={selectedPlayerItem}
        onProgressUpdated={loadAllData}
      />

      <SedeMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
      />

      <InscripcionModal
        isOpen={Boolean(selectedTallerInscripcion)}
        onClose={() => setSelectedTallerInscripcion(null)}
        taller={selectedTallerInscripcion}
        onSuccess={loadAllData}
      />

      <PropuestaModal
        isOpen={isPropuestaOpen}
        onClose={() => setIsPropuestaOpen(false)}
      />
    </div>
  );
};

export default App;
