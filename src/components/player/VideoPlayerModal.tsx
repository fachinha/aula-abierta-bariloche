import React, { useState } from 'react';
import { Curso, Capacitacion, Taller } from '../../types';
import { isLessonCompleted, toggleLessonCompleted } from '../../services/storage';
import { CertificateModal } from './CertificateModal';
import { YoutubeIcon } from '../common/YoutubeIcon';
import {
  X,
  Play,
  CheckCircle2,
  Circle,
  FileText,
  Download,
  Award,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Curso | Capacitacion | Taller | null;
  onProgressUpdated?: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  item,
  onProgressUpdated
}) => {
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [, setRefreshKey] = useState(0);

  if (!isOpen || !item) return null;

  const lessons = item.lessons || [];
  const activeVideo = currentVideoId || item.activeVideoId || (lessons[0] ? lessons[0].id : '');

  // Calcular progreso
  const completedCount = lessons.filter(l => isLessonCompleted(l.id)).length;
  const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;
  const isAllCompleted = lessons.length > 0 && completedCount === lessons.length;

  const handleToggleLesson = (lessonId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLessonCompleted(lessonId);
    setRefreshKey(prev => prev + 1);
    if (onProgressUpdated) onProgressUpdated();
  };

  const handleSelectLesson = (lessonId: string) => {
    setCurrentVideoId(lessonId);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/85 backdrop-blur-sm animate-fade-in">
        <div className="bg-slate-950 rounded-2xl shadow-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden border border-slate-800 text-slate-100">
          
          {/* Header Superior del Reproductor */}
          <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                  {'level' in item ? `${item.level} • ${item.grade}` : 'sector' in item ? item.sector : item.area}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 ml-4">
              {/* Botón de Certificado si está completo */}
              {isAllCompleted && (
                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md cursor-pointer animate-pulse"
                >
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>Obtener Certificado</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cuerpo: Video Iframe a la izquierda (65%) + Playlist y Creador a la derecha (35%) */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            
            {/* Columna Izquierda: Reproductor + Descripción */}
            <div className="flex-1 flex flex-col bg-black overflow-y-auto">
              {/* Contenedor Responsivo 16:9 de YouTube */}
              <div className="relative w-full pt-[56.25%] bg-black">
                {activeVideo ? (
                  <iframe
                    className="absolute inset-0 w-full h-full border-0"
                    src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
                    Video no disponible
                  </div>
                )}
              </div>

              {/* Barra de progreso interactiva bajo el video */}
              <div className="bg-slate-900/90 px-6 py-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-medium">
                    Progreso del curso: <strong>{completedCount}</strong> de <strong>{lessons.length}</strong> clases completadas
                  </span>
                  <span className="font-bold text-emerald-400">
                    {progressPercent}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Ficha descriptiva y Reconocimiento al Creador */}
              <div className="p-6 bg-slate-950 flex-1 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1">
                    Sobre este contenido
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tarjeta de Agradecimiento y Crédito al Creador de YouTube */}
                {'creatorYoutubeName' in item && item.creatorYoutubeName && (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
                        <YoutubeIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 font-medium block">
                          Contenido educativo curado de YouTube:
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-white">
                          {item.creatorYoutubeName}
                        </span>
                      </div>
                    </div>

                    {item.creatorChannelUrl && (
                      <a
                        href={item.creatorChannelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/30 text-xs font-semibold transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Apoyar en YouTube</span>
                      </a>
                    )}
                  </div>
                )}
              </div>

            </div>

            {/* Columna Derecha: Temario de Lecciones & Cuadernillos */}
            <div className="w-full lg:w-96 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-72 lg:h-full overflow-hidden">
              
              <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Temario de Clases
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Hacé clic para reproducir o tildá las que ya viste
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300">
                  {lessons.length} {lessons.length === 1 ? 'lección' : 'lecciones'}
                </span>
              </div>

              {/* Lista de Lecciones con Checkbox */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2 space-y-1">
                {lessons.map((lesson, idx) => {
                  const completed = isLessonCompleted(lesson.id);
                  const isActive = activeVideo === lesson.id;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson.id)}
                      className={`group p-3 rounded-xl flex items-start gap-3 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-600/20 border border-blue-500/40 text-white'
                          : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      {/* Checkbox para marcar progreso */}
                      <button
                        onClick={(e) => handleToggleLesson(lesson.id, e)}
                        title={completed ? "Marcar como pendiente" : "Marcar como completada"}
                        className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors shrink-0 cursor-pointer"
                      >
                        {completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                        ) : (
                          <Circle className="w-5 h-5 group-hover:border-slate-300" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 mb-0.5">
                          <span>Clase {idx + 1}</span>
                          <span>•</span>
                          <span>{lesson.duration}</span>
                          {isActive && (
                            <span className="px-1.5 py-0.2 rounded bg-blue-500/30 text-blue-300 text-[10px]">
                              Reproduciendo
                            </span>
                          )}
                        </div>
                        <h5 className={`text-xs font-medium leading-snug line-clamp-2 ${isActive ? 'text-blue-200 font-bold' : ''}`}>
                          {lesson.title}
                        </h5>
                      </div>

                      <Play className={`w-4 h-4 shrink-0 transition-opacity ${isActive ? 'text-blue-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
                    </div>
                  );
                })}
              </div>

              {/* Cuadernillos Descargables (PDF) */}
              {'materials' in item && item.materials && item.materials.length > 0 && (
                <div className="p-4 bg-slate-950 border-t border-slate-800">
                  <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    <span>Cuadernillos de Estudio (PDF):</span>
                  </h5>
                  <div className="space-y-1.5">
                    {item.materials.map((mat, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs hover:border-slate-700 transition-colors"
                      >
                        <div className="truncate mr-2">
                          <span className="text-slate-200 font-medium block truncate">
                            {mat.name}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {mat.size} • Guía imprimible
                          </span>
                        </div>
                        <a
                          href={mat.url || "#"}
                          onClick={(e) => {
                            if (!mat.url) {
                              e.preventDefault();
                              alert(`Iniciando descarga simulada de: ${mat.name}`);
                            }
                          }}
                          className="p-1.5 rounded-md bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white transition-colors cursor-pointer"
                          title="Descargar Cuadernillo"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón Flotante para Certificado en móvil */}
              {isAllCompleted && (
                <div className="p-3 bg-emerald-950/60 border-t border-emerald-800/60 sm:hidden">
                  <button
                    onClick={() => setShowCertificateModal(true)}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Award className="w-4 h-4 text-amber-300" />
                    <span>Descargar Certificado Oficial</span>
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>

      {/* Modal de Certificado */}
      <CertificateModal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        cursoId={item.id}
        courseTitle={item.title}
        duration={item.duration}
        instructor={item.instructor}
        institution={'institution' in item ? item.institution : 'Aula Abierta Bariloche'}
        initialStudentName="Estudiante de Bariloche"
      />
    </>
  );
};
