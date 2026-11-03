import React, { useState } from 'react';
import { Capacitacion } from '../../types';
import { calculateCourseProgress } from '../../services/storage';
import { Coffee, Briefcase, Play, CheckCircle2, Award, Sparkles, Filter } from 'lucide-react';

interface CapacitacionesSectionProps {
  capacitaciones: Capacitacion[];
  searchQuery: string;
  onOpenPlayer: (cap: Capacitacion) => void;
}

export const CapacitacionesSection: React.FC<CapacitacionesSectionProps> = ({
  capacitaciones,
  searchQuery,
  onOpenPlayer
}) => {
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const filtered = capacitaciones.filter(c => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.targetJobs.toLowerCase().includes(q) ||
        c.skills.some(s => s.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (selectedSector !== 'all' && c.sector !== selectedSector) return false;

    return true;
  });

  const sectors = [
    { id: 'all', label: 'Todos los Sectores' },
    { id: 'Gastronomía y Hospitalidad', label: '☕ Gastronomía y Hospitalidad' },
    { id: 'Tecnología e Informática', label: '💻 Tecnología e Informática' },
    { id: 'Construcción y Mantenimiento', label: '⚡ Construcción y Oficios' },
    { id: 'Administración y Comercio', label: '📊 Administración y Pymes' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Banner de Presentación */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-400/30">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            Habilidades para la Vida y el Trabajo
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Capacitaciones Laborales y Oficios Prácticos
          </h2>
          <p className="text-sm text-emerald-100/90 leading-relaxed mb-4">
            Cursos enfocados en puestos laborales de alta demanda en Bariloche y la región: <strong>Barista, Mozo de salón, Electricista, Programación y Administración</strong>. Al finalizar podés descargar tu constancia en PDF.
          </p>
        </div>
      </div>

      {/* Filtros de Sector */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-700 mr-2 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Sector de Empleo:</span>
        </span>
        {sectors.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedSector(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedSector === s.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {s.label}
          </button>
        ))}

        {selectedSector !== 'all' && (
          <button
            onClick={() => setSelectedSector('all')}
            className="text-xs text-rose-600 hover:text-rose-800 font-semibold ml-auto cursor-pointer"
          >
            Ver todos
          </button>
        )}
      </div>

      {/* Grid de Capacitaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(cap => {
          const lessonIds = cap.lessons.map(l => l.id);
          const progress = calculateCourseProgress(lessonIds);
          const isCompleted = progress === 100;

          return (
            <div
              key={cap.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Portada */}
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                <img
                  src={cap.thumbnail}
                  alt={cap.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/90 text-emerald-300 backdrop-blur-md shadow-sm">
                    {cap.sector}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-700/90 text-white backdrop-blur-md flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-300" />
                  <span>Certificable</span>
                </div>
              </div>

              {/* Barra de progreso */}
              {progress > 0 && (
                <div className="w-full bg-slate-100 h-1.5">
                  <div
                    className={`h-full transition-all duration-300 ${isCompleted ? 'bg-emerald-500' : 'bg-emerald-600'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {/* Contenido */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2 leading-snug">
                    {cap.title}
                  </h3>

                  {/* Puestos Objetivo */}
                  <div className="mb-3 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                      Puestos de trabajo objetivo:
                    </span>
                    <span className="text-xs font-semibold text-emerald-950">
                      {cap.targetJobs}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {cap.description}
                  </p>

                  {/* Habilidades Adquiridas */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Habilidades que aprendés:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cap.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span>⏱️ {cap.duration}</span>
                    <span>💻 {cap.modality}</span>
                  </div>

                  <button
                    onClick={() => onOpenPlayer(cap)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                      isCompleted
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                        : progress > 0
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-600/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <Award className="w-4 h-4 text-amber-300" />
                        <span>Ver Clases y Diploma ({progress}%)</span>
                      </>
                    ) : progress > 0 ? (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Continuar Capacitación ({progress}%)</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Empezar Capacitación</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
