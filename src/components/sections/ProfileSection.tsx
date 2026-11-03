import React, { useState, useEffect } from 'react';
import { Curso, Capacitacion, Taller, UserProgress } from '../../types';
import { getStoredProgress, saveProgress, calculateCourseProgress } from '../../services/storage';
import { generateCourseCertificatePDF } from '../../services/certificateService';
import { User, Award, CheckCircle2, Download, BookOpen, Hammer, Calendar, MapPin, Edit3 } from 'lucide-react';

interface ProfileSectionProps {
  cursos: Curso[];
  capacitaciones: Capacitacion[];
  talleres: Taller[];
  onOpenPlayer: (item: Curso | Capacitacion | Taller) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  cursos,
  capacitaciones,
  talleres,
  onOpenPlayer
}) => {
  const [progress, setProgress] = useState<UserProgress>(getStoredProgress());
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(progress.studentName);

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  const handleSaveName = () => {
    const updated = { ...progress, studentName: nameInput.trim() || 'Estudiante' };
    saveProgress(updated);
    setProgress(updated);
    setIsEditingName(false);
  };

  const allItems = [...cursos, ...capacitaciones];

  // Cursos en los que hay al menos 1 lección completada
  const activeItems = allItems.filter(item => {
    const ids = item.lessons.map(l => l.id);
    const prog = calculateCourseProgress(ids);
    return prog > 0;
  });

  // Talleres inscriptos
  const enrolledWorkshopItems = talleres.filter(t => progress.enrolledTalleres.includes(t.id));

  // Certificados emitidos
  const certificateEntries = Object.entries(progress.issuedCertificates);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Tarjeta de Perfil de Usuario */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-blue-500/20 shrink-0">
          <User className="w-10 h-10" />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="px-3 py-1 text-base font-bold text-slate-900 border border-blue-500 rounded-lg focus:outline-none"
                />
                <button
                  onClick={handleSaveName}
                  className="px-3 py-1 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {progress.studentName}
                </h2>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer p-1"
                  title="Editar nombre para certificados"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          <p className="text-xs text-slate-500">
            Estudiante de la comunidad de Bariloche • Trayectoria de aprendizaje activa
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 pt-3 border-t border-slate-100 text-xs">
            <span className="text-slate-600">
              Clases vistas: <strong className="text-blue-600 font-bold">{progress.completedLessons.length}</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">
              Certificados obtenidos: <strong className="text-emerald-600 font-bold">{certificateEntries.length}</strong>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">
              Talleres inscriptos: <strong className="text-amber-600 font-bold">{enrolledWorkshopItems.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Sección: Mis Certificados Descargables */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600" />
          <span>Mis Certificados Oficiales ({certificateEntries.length})</span>
        </h3>

        {certificateEntries.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
            Aún no has completado un curso al 100%. ¡Mirá todas las clases de un curso o capacitación para desbloquear tu certificado oficial en PDF!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificateEntries.map(([cursoId, fechaIso]) => {
              const item = allItems.find(c => c.id === cursoId);
              if (!item) return null;

              return (
                <div
                  key={cursoId}
                  className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Aprobado y Certificado
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(fechaIso).toLocaleDateString('es-AR')}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mb-4">
                      {item.duration} • {item.instructor}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      generateCourseCertificatePDF({
                        studentName: progress.studentName,
                        courseTitle: item.title,
                        duration: item.duration,
                        instructor: item.instructor,
                        institution: item.institution
                      });
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Volver a Descargar Diploma (PDF)</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sección: Cursos en Progreso */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>Continuar Estudiando ({activeItems.length})</span>
        </h3>

        {activeItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
            Todavía no empezaste ningún curso. Explorá el catálogo de Cursos o Capacitaciones y comenzá tu primera clase.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {activeItems.map(item => {
              const ids = item.lessons.map(l => l.id);
              const prog = calculateCourseProgress(ids);

              return (
                <div
                  key={item.id}
                  onClick={() => onOpenPlayer(item)}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mb-2 leading-snug">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span>Avance:</span>
                      <strong className="text-blue-600 font-bold">{prog}%</strong>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-3">
                      <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${prog}%` }}
                      />
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-blue-600 text-right block hover:underline">
                    Continuar clase →
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sección: Talleres Presenciales Inscriptos */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Hammer className="w-5 h-5 text-amber-600" />
          <span>Mis Talleres Presenciales Inscriptos ({enrolledWorkshopItems.length})</span>
        </h3>

        {enrolledWorkshopItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
            No estás inscripto en ningún taller presencial por el momento. Revisá la pestaña de Talleres para ver convocatorias abiertas en FabLab o La Llave.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {enrolledWorkshopItems.map(taller => (
              <div
                key={taller.id}
                className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Inscripción confirmada</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                    {taller.title}
                  </h4>
                  <p className="text-xs text-slate-600 mb-3">
                    {taller.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                  <span>Modalidad: <strong>{taller.modality || 'Presencial'}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
