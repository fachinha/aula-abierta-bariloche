import React, { useState } from 'react';
import { Taller } from '../../types';
import { ESPACIOS_BARILOCHE } from '../../data/espaciosBariloche';
import { Hammer, MapPin, Calendar, Users, Play, Compass, CheckCircle } from 'lucide-react';

interface TalleresSectionProps {
  talleres: Taller[];
  searchQuery: string;
  onOpenPlayer: (taller: Taller) => void;
  onOpenInscripcion: (taller: Taller) => void;
  onOpenMap: () => void;
}

export const TalleresSection: React.FC<TalleresSectionProps> = ({
  talleres,
  searchQuery,
  onOpenPlayer,
  onOpenInscripcion,
  onOpenMap
}) => {
  const [filterType, setFilterType] = useState<'all' | 'convocatoria' | 'taller'>('all');

  const filtered = (talleres || []).filter(t => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.area.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filterType !== 'all' && t.type !== filterType) return false;

    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Banner de Presentación */}
      <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold mb-3 border border-amber-400/30">
            <Hammer className="w-4 h-4 text-amber-400" />
            Actividades Prácticas y Presenciales
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Talleres Comunitarios y Espacios de Bariloche
          </h2>
          <p className="text-sm text-amber-100/90 leading-relaxed mb-4">
            Espacios de aprendizaje práctico en oficios manuales y tecnología. Vinculamos talleres con sedes comunitarias reales de la ciudad como <strong>FabLab Bariloche, Escuela La Llave y Sala Frey</strong>.
          </p>

          <button
            onClick={onOpenMap}
            className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-transform hover:scale-105 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Explorar Sedes en el Mapa Interactivo</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Todos los Talleres' },
            { id: 'convocatoria', label: '📢 Convocatorias Abiertas (Presenciales)' },
            { id: 'taller', label: '📹 Talleres Grabados Disponibles' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterType === f.id
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          onClick={onOpenMap}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 cursor-pointer"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Ver mapa de colectivos y ubicaciones</span>
        </button>
      </div>

      {/* Grid de Talleres */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(taller => {
          const espacio = ESPACIOS_BARILOCHE.find(e => e.id === taller.espacioId);
          const isConvocatoria = taller.type === 'convocatoria';

          return (
            <div
              key={taller.id}
              className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col group ${
                isConvocatoria
                  ? 'border-amber-300 shadow-md hover:border-amber-500 hover:shadow-xl'
                  : 'border-slate-200 hover:border-blue-400 hover:shadow-xl'
              }`}
            >
              {/* Portada */}
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                <img
                  src={taller.thumbnail}
                  alt={taller.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold backdrop-blur-md shadow-sm text-white ${
                    isConvocatoria ? 'bg-amber-600/90' : 'bg-slate-900/90'
                  }`}>
                    {taller.status}
                  </span>
                </div>

                {espacio && (
                  <div className="absolute bottom-3 left-3 right-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] flex items-center gap-1.5 truncate">
                    <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                    <span className="truncate">{espacio.nombre.split('(')[0].trim()} ({espacio.direccion})</span>
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {taller.area}
                  </span>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 mb-2 leading-snug">
                    {taller.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {taller.description}
                  </p>

                  {/* Datos de convocatoria */}
                  {isConvocatoria ? (
                    <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 space-y-1.5 text-xs text-amber-950 mb-4">
                      {taller.spots && (
                        <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                          <Users className="w-3.5 h-3.5 shrink-0" />
                          <span>{taller.spots}</span>
                        </div>
                      )}
                      {taller.closingDateFormatted && (
                        <div className="flex items-center gap-1.5 text-amber-800 font-medium">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>Cierre: {taller.closingDateFormatted}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-600 mb-4 space-y-0.5">
                      <div>👨‍🏫 Instructor: <strong>{taller.instructor}</strong></div>
                      <div>⏱️ Duración: <strong>{taller.duration}</strong></div>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  {isConvocatoria ? (
                    <button
                      onClick={() => onOpenInscripcion(taller)}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Users className="w-4 h-4" />
                      <span>Pre-Inscribirme Gratis</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenPlayer(taller)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Play className="w-4 h-4" />
                      <span>Ver Grabación del Taller</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
