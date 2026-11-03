import React, { useState, useEffect } from 'react';
import { Curso, Taller, Inscripcion, PropuestaComunitaria } from '../../types';
import { apiService } from '../../services/api';
import {
  ShieldCheck,
  Users,
  BookOpen,
  Hammer,
  HeartHandshake,
  Download,
  Plus,
  CheckCircle,
  XCircle,
  FileSpreadsheet
} from 'lucide-react';

interface AdminDashboardProps {
  cursos: Curso[];
  talleres: Taller[];
  onAddCurso: (curso: Curso) => void;
  onAddTaller: (taller: Taller) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  cursos,
  talleres,
  onAddCurso
}) => {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [propuestas, setPropuestas] = useState<PropuestaComunitaria[]>([]);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    level: 'Primaria' as const,
    grade: '1° a 3° Grado',
    gradeKey: 'pri-1-3',
    area: 'Matemática',
    instructor: '',
    institution: 'Extensión Universitaria Bariloche',
    duration: '4 hs',
    description: '',
    activeVideoId: 'kJQP7kiw5Fk',
    creatorYoutubeName: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [insList, propList] = await Promise.all([
      apiService.getInscripciones(),
      apiService.getPropuestas()
    ]);
    setInscripciones(insList);
    setPropuestas(propList);
  };

  // Exportar lista de inscriptos a CSV
  const handleExportCSV = () => {
    if (inscripciones.length === 0) {
      alert('No hay inscripciones registradas para exportar.');
      return;
    }

    const headers = ['ID', 'Taller', 'Estudiante', 'Email', 'DNI', 'Telefono', 'Fecha'];
    const rows = inscripciones.map(i => [
      i.id,
      `"${i.tallerTitulo.replace(/"/g, '""')}"`,
      `"${i.nombre.replace(/"/g, '""')}"`,
      i.email,
      i.dni,
      i.telefono || '',
      new Date(i.fecha).toLocaleDateString('es-AR')
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Inscriptos_Talleres_Bariloche_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const created: Curso = {
      id: `cur-custom-${Date.now()}`,
      title: newCourse.title,
      level: newCourse.level,
      grade: newCourse.grade,
      gradeKey: newCourse.gradeKey,
      area: newCourse.area,
      instructor: newCourse.instructor || 'Prof. Cátedra Abierta',
      institution: newCourse.institution,
      lessonsCount: 2,
      duration: newCourse.duration,
      description: newCourse.description,
      thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      activeVideoId: newCourse.activeVideoId,
      creatorYoutubeName: newCourse.creatorYoutubeName || 'Educador Abierto',
      lessons: [
        { id: newCourse.activeVideoId, title: 'Clase 1: Introducción a los conceptos clave', duration: '30 min' },
        { id: 'fJ9rUzIMcZQ', title: 'Clase 2: Ejercitación y resolución práctica', duration: '35 min' }
      ]
    };

    await apiService.addCurso(created);
    onAddCurso(created);
    setShowAddCourseModal(false);
    alert('¡Curso creado y publicado exitosamente en la plataforma!');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header Admin */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Panel de Administración y Gestión
            </h2>
            <p className="text-xs text-slate-400">
              Coordinación académica, control de cupos presenciales y revisión de aportes comunitarios
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddCourseModal(true)}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Nuevo Curso</span>
          </button>
        </div>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Cursos Activos</span>
            <h4 className="text-2xl font-bold text-slate-900">{cursos.length}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Hammer className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Talleres Registrados</span>
            <h4 className="text-2xl font-bold text-slate-900">{talleres.length}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Inscripciones a Talleres</span>
            <h4 className="text-2xl font-bold text-slate-900">{inscripciones.length}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Propuestas Recibidas</span>
            <h4 className="text-2xl font-bold text-slate-900">{propuestas.length}</h4>
          </div>
        </div>
      </div>

      {/* Tabla: Inscriptos a Talleres Presenciales */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Nómina de Inscriptos a Talleres y Convocatorias</span>
            </h3>
            <p className="text-xs text-slate-500">
              Listado de vecinos inscriptos a talleres con cupo limitado en FabLab, Sala Frey, etc.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <span>Descargar Nómina (CSV)</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          {inscripciones.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              Aún no hay inscripciones registradas. Cuando los usuarios se pre-inscriban a los talleres presenciales figurarán aquí.
            </div>
          ) : (
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold text-[11px]">
                <tr>
                  <th className="p-3.5">Estudiante</th>
                  <th className="p-3.5">DNI</th>
                  <th className="p-3.5">Taller</th>
                  <th className="p-3.5">Contacto</th>
                  <th className="p-3.5">Fecha</th>
                  <th className="p-3.5">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inscripciones.map((ins) => (
                  <tr key={ins.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{ins.nombre}</td>
                    <td className="p-3.5 font-mono">{ins.dni}</td>
                    <td className="p-3.5 text-blue-700 font-medium">{ins.tallerTitulo}</td>
                    <td className="p-3.5">
                      <div>{ins.email}</div>
                      {ins.telefono && <div className="text-slate-400">{ins.telefono}</div>}
                    </td>
                    <td className="p-3.5 text-slate-500">
                      {new Date(ins.fecha).toLocaleDateString('es-AR')}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {ins.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Tabla: Propuestas Comunitarias */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-purple-600" />
            <span>Propuestas Comunitarias Recibidas ({propuestas.length})</span>
          </h3>
          <p className="text-xs text-slate-500">
            Cursos sugeridos por vecinos, talleristas o creadores de YouTube para incorporar a la plataforma
          </p>
        </div>

        <div className="overflow-x-auto">
          {propuestas.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No hay propuestas comunitarias pendientes en este momento.
            </div>
          ) : (
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase tracking-wider font-semibold text-[11px]">
                <tr>
                  <th className="p-3.5">Título</th>
                  <th className="p-3.5">Tipo</th>
                  <th className="p-3.5">Postulante</th>
                  <th className="p-3.5">Descripción</th>
                  <th className="p-3.5">Enlace</th>
                  <th className="p-3.5">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {propuestas.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{prop.titulo}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                        {prop.tipo}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold">{prop.nombre}</div>
                      <div className="text-slate-400">{prop.email}</div>
                    </td>
                    <td className="p-3.5 max-w-xs truncate text-slate-600" title={prop.descripcion}>
                      {prop.descripcion}
                    </td>
                    <td className="p-3.5">
                      {prop.enlace ? (
                        <a
                          href={prop.enlace}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline font-semibold"
                        >
                          Ver enlace
                        </a>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        {prop.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal: Crear Nuevo Curso */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Agregar Nuevo Curso al Catálogo
              </h3>
              <button
                onClick={() => setShowAddCourseModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourseSubmit} className="p-6 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título del Curso *</label>
                <input
                  type="text"
                  required
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="Ej: Física Básica: Mecánica y Estática"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nivel *</label>
                  <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Primaria">Primaria</option>
                    <option value="Secundaria">Secundaria</option>
                    <option value="Universidad">Universidad</option>
                    <option value="Terciario">Terciario</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Materia *</label>
                  <input
                    type="text"
                    required
                    value={newCourse.area}
                    onChange={(e) => setNewCourse({ ...newCourse, area: e.target.value })}
                    placeholder="Ej: Matemática, Lengua"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Profesor / Instructor</label>
                  <input
                    type="text"
                    value={newCourse.instructor}
                    onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                    placeholder="Prof. Nombre"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Creador de YouTube</label>
                  <input
                    type="text"
                    value={newCourse.creatorYoutubeName}
                    onChange={(e) => setNewCourse({ ...newCourse, creatorYoutubeName: e.target.value })}
                    placeholder="Nombre del canal"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descripción Breve</label>
                <textarea
                  rows={2}
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Temas principales que aborda el curso..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ID Video de YouTube</label>
                <input
                  type="text"
                  value={newCourse.activeVideoId}
                  onChange={(e) => setNewCourse({ ...newCourse, activeVideoId: e.target.value })}
                  placeholder="Ej: kJQP7kiw5Fk"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Publicar Curso
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
