import { Curso, Capacitacion, Taller, EspacioFisico, Inscripcion, PropuestaComunitaria } from '../types';
import { INITIAL_CURSOS } from '../data/initialCourses';
import { INITIAL_CAPACITACIONES } from '../data/initialCapacitaciones';
import { INITIAL_TALLERES } from '../data/initialTalleres';
import { ESPACIOS_BARILOCHE } from '../data/espaciosBariloche';

const INSCRIPCIONES_KEY = 'aula_abierta_inscripciones_v1';
const PROPUESTAS_KEY = 'aula_abierta_propuestas_v1';
const CUSTOM_CURSOS_KEY = 'aula_abierta_custom_cursos_v1';
const CUSTOM_TALLERES_KEY = 'aula_abierta_custom_talleres_v1';

export const apiService = {
  // --- CURSOS ---
  getCursos: async (): Promise<Curso[]> => {
    try {
      const res = await fetch('/api/cursos');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch {
      // Fallback a almacenamiento local
    }
    const custom = JSON.parse(localStorage.getItem(CUSTOM_CURSOS_KEY) || '[]');
    return [...INITIAL_CURSOS, ...custom];
  },

  addCurso: async (curso: Curso): Promise<Curso> => {
    try {
      const res = await fetch('/api/cursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(curso)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback local
    }
    const current = JSON.parse(localStorage.getItem(CUSTOM_CURSOS_KEY) || '[]');
    localStorage.setItem(CUSTOM_CURSOS_KEY, JSON.stringify([...current, curso]));
    return curso;
  },

  // --- CAPACITACIONES ---
  getCapacitaciones: async (): Promise<Capacitacion[]> => {
    return INITIAL_CAPACITACIONES;
  },

  // --- TALLERES ---
  getTalleres: async (): Promise<Taller[]> => {
    try {
      const res = await fetch('/api/talleres');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch {
      // Fallback a almacenamiento local
    }
    const custom = JSON.parse(localStorage.getItem(CUSTOM_TALLERES_KEY) || '[]');
    return [...INITIAL_TALLERES, ...custom];
  },

  addTaller: async (taller: Taller): Promise<Taller> => {
    try {
      const res = await fetch('/api/talleres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taller)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    const current = JSON.parse(localStorage.getItem(CUSTOM_TALLERES_KEY) || '[]');
    localStorage.setItem(CUSTOM_TALLERES_KEY, JSON.stringify([...current, taller]));
    return taller;
  },

  // --- ESPACIOS FÍSICOS BARILOCHE ---
  getEspacios: async (): Promise<EspacioFisico[]> => {
    return ESPACIOS_BARILOCHE;
  },

  // --- INSCRIPCIONES ---
  getInscripciones: async (): Promise<Inscripcion[]> => {
    try {
      const res = await fetch('/api/inscripciones');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch {
      // Fallback
    }
    return JSON.parse(localStorage.getItem(INSCRIPCIONES_KEY) || '[]');
  },

  createInscripcion: async (data: Omit<Inscripcion, 'id' | 'fecha' | 'estado'>): Promise<Inscripcion> => {
    const newInscripcion: Inscripcion = {
      ...data,
      id: `ins-${Date.now()}`,
      fecha: new Date().toISOString(),
      estado: 'confirmado'
    };

    try {
      const res = await fetch('/api/inscripciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInscripcion)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback local
    }

    const current = JSON.parse(localStorage.getItem(INSCRIPCIONES_KEY) || '[]');
    localStorage.setItem(INSCRIPCIONES_KEY, JSON.stringify([...current, newInscripcion]));
    return newInscripcion;
  },

  // --- PROPUESTAS COMUNITARIAS ---
  getPropuestas: async (): Promise<PropuestaComunitaria[]> => {
    try {
      const res = await fetch('/api/propuestas');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch {
      // Fallback
    }
    return JSON.parse(localStorage.getItem(PROPUESTAS_KEY) || '[]');
  },

  createPropuesta: async (data: Omit<PropuestaComunitaria, 'id' | 'fecha' | 'estado'>): Promise<PropuestaComunitaria> => {
    const newPropuesta: PropuestaComunitaria = {
      ...data,
      id: `prop-${Date.now()}`,
      fecha: new Date().toISOString(),
      estado: 'pendiente'
    };

    try {
      const res = await fetch('/api/propuestas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPropuesta)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback local
    }

    const current = JSON.parse(localStorage.getItem(PROPUESTAS_KEY) || '[]');
    localStorage.setItem(PROPUESTAS_KEY, JSON.stringify([...current, newPropuesta]));
    return newPropuesta;
  }
};
