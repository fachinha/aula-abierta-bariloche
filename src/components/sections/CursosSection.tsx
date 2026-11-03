import React, { useState } from 'react';
import { Curso, SchoolLevel } from '../../types';
import { calculateCourseProgress } from '../../services/storage';
import { BookOpen, GraduationCap, Play, Award, Filter, Sparkles } from 'lucide-react';
import { YoutubeIcon } from '../common/YoutubeIcon';

interface CursosSectionProps {
  cursos: Curso[];
  searchQuery: string;
  onOpenPlayer: (curso: Curso) => void;
}

export const CursosSection: React.FC<CursosSectionProps> = ({
  cursos,
  searchQuery,
  onOpenPlayer
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedGradeKey, setSelectedGradeKey] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');

  // Filtro de niveles y subniveles
  const filteredCursos = cursos.filter(c => {
    // Búsqueda por texto
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchText =
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.area.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        (c.creatorYoutubeName && c.creatorYoutubeName.toLowerCase().includes(q));
      if (!matchText) return false;
    }

    // Nivel
    if (selectedLevel !== 'all' && c.level !== selectedLevel) return false;

    // Subnivel / Grado
    if (selectedGradeKey !== 'all' && c.gradeKey !== selectedGradeKey) return false;

    // Área / Materia
    if (selectedArea !== 'all' && c.area !== selectedArea) return false;

    return true;
  });

  const areasList = ['all', 'Matemática', 'Lengua', 'Ciencias', 'Física', 'Historia'];

  return (
    <div className="space-y-6">
      
      {/* Banner de Presentación Pedagógica */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold mb-3 border border-blue-400/30">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            Apoyo Pedagógico Escolar y Académico
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Cursos Gratuitos Ordenados por Nivel
          </h2>
          <p className="text-sm text-blue-100/90 leading-relaxed mb-4">
            Contenidos estructurados para acompañar las trayectorias educativas desde <strong>1° grado de primaria</strong> hasta materias iniciales universitarias, con cuadernillos de ejercicios descargables en PDF.
          </p>
        </div>
      </div>

      {/* Controles de Filtros */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Selector de Nivel Escolar */}
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Nivel Educativo:
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Todos los Niveles' },
              { id: 'Primaria', label: 'Primaria (1° a 7° Grado)' },
              { id: 'Secundaria', label: 'Secundaria (1° a 5° Año)' },
              { id: 'Universidad', label: 'Universidad y Terciario' }
            ].map(lvl => (
              <button
                key={lvl.id}
                onClick={() => {
                  setSelectedLevel(lvl.id);
                  setSelectedGradeKey('all');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedLevel === lvl.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subniveles dinámicos si eligió Primaria o Secundaria */}
        {selectedLevel === 'Primaria' && (
          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-600 block mb-1.5">
              Ciclo de Primaria:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Todos los ciclos' },
                { id: 'pri-1-3', label: '1° a 3° Grado (Alfabetización y Conteo)' },
                { id: 'pri-4-5', label: '4° y 5° Grado (Multiplicación y Ecosistemas)' },
                { id: 'pri-6-7', label: '6° y 7° Grado (Egreso y Articulación)' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedGradeKey(sub.id)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    selectedGradeKey === sub.id
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selector de Materias */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-600 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Materia:</span>
          </span>
          {areasList.map(area => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                selectedArea === area
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {area === 'all' ? 'Todas' : area}
            </button>
          ))}

          {(selectedLevel !== 'all' || selectedGradeKey !== 'all' || selectedArea !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedLevel('all');
                setSelectedGradeKey('all');
                setSelectedArea('all');
              }}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold ml-auto cursor-pointer"
            >
              Restablecer filtros
            </button>
          )}
        </div>

      </div>

      {/* Contador de Resultados */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Mostrando <strong>{filteredCursos.length}</strong> cursos disponibles</span>
        {searchQuery && (
          <span>Filtrado por: "{searchQuery}"</span>
        )}
      </div>

      {/* Cuadrícula de Tarjetas de Cursos */}
      {filteredCursos.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h4 className="text-base font-bold text-slate-800 mb-1">No se encontraron cursos</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Probá ajustando los filtros de nivel o materia para ver más opciones disponibles.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCursos.map(curso => {
            const lessonIds = curso.lessons.map(l => l.id);
            const progress = calculateCourseProgress(lessonIds);
            const isCompleted = progress === 100;

            return (
              <div
                key={curso.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Portada */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={curso.thumbnail}
                    alt={curso.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badges superiores */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-900/90 text-white backdrop-blur-md shadow-sm">
                      {curso.level}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-600/90 text-white backdrop-blur-md shadow-sm">
                      {curso.area}
                    </span>
                  </div>

                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[11px] font-medium bg-black/70 text-white backdrop-blur-md">
                    {curso.grade}
                  </span>
                </div>

                {/* Barra de progreso */}
                {progress > 0 && (
                  <div className="w-full bg-slate-100 h-1.5">
                    <div
                      className={`h-full transition-all duration-300 ${isCompleted ? 'bg-emerald-500' : 'bg-blue-600'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                {/* Información de la Tarjeta */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 mb-2 leading-snug">
                      {curso.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                      {curso.description}
                    </p>

                    <div className="text-[11px] text-slate-500 space-y-1 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <div>👨‍🏫 <strong>{curso.instructor}</strong></div>
                      <div>🏛️ {curso.institution}</div>
                      <div>⏱️ {curso.duration} • <strong>{curso.lessonsCount} clases</strong></div>
                    </div>
                  </div>

                  <div>
                    {/* Creador de YouTube */}
                    {curso.creatorYoutubeName && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-4 pb-3 border-b border-slate-100">
                        <YoutubeIcon className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="truncate">Creador: <strong>{curso.creatorYoutubeName}</strong></span>
                      </div>
                    )}

                    {/* Botón de Acción */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenPlayer(curso)}
                        className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                          isCompleted
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                            : progress > 0
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <Award className="w-4 h-4 text-amber-300" />
                            <span>Completado ({progress}%)</span>
                          </>
                        ) : progress > 0 ? (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Continuar ({progress}%)</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Ver Clases</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
