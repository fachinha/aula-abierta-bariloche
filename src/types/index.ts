export type SectionType = 'cursos' | 'capacitaciones' | 'talleres' | 'perfil' | 'admin';

export type SchoolLevel = 'Primaria' | 'Secundaria' | 'Terciario' | 'Universidad';

export interface Leccion {
  id: string;
  title: string;
  duration: string;
  date?: string;
}

export interface Material {
  name: string;
  size: string;
  url?: string;
}

export interface Curso {
  id: string;
  title: string;
  level: SchoolLevel;
  grade: string;
  gradeKey: string;
  area: string;
  instructor: string;
  institution: string;
  lessonsCount: number;
  duration: string;
  description: string;
  thumbnail: string;
  activeVideoId: string;
  creatorChannelUrl?: string;
  creatorYoutubeName?: string;
  lessons: Leccion[];
  materials?: Material[];
}

export interface Capacitacion {
  id: string;
  title: string;
  sector: string;
  targetJobs: string;
  instructor: string;
  institution: string;
  duration: string;
  modality: string;
  description: string;
  thumbnail: string;
  activeVideoId: string;
  creatorChannelUrl?: string;
  creatorYoutubeName?: string;
  skills: string[];
  lessons: Leccion[];
  materials?: Material[];
}

export type TallerStatusType = 'recorded' | 'live' | 'open-call';

export interface Taller {
  id: string;
  title: string;
  type: 'taller' | 'convocatoria';
  area: string;
  instructor: string;
  status: string;
  statusType: TallerStatusType;
  sessionsCount?: number;
  duration: string;
  thumbnail: string;
  description: string;
  activeVideoId?: string;
  lessons?: Leccion[];
  // Campos específicos de convocatoria
  closingDateFormatted?: string;
  spots?: string;
  modality?: string;
  requirements?: string[];
  documentRequirements?: string;
  espacioId?: string; // id del espacio físico donde se dicta
}

export interface EspacioFisico {
  id: string;
  nombre: string;
  direccion: string;
  barrio: string;
  latitud: number;
  longitud: number;
  lineasColectivo: string[];
  contacto?: string;
  descripcion: string;
  imagen?: string;
  talleresIds?: string[];
}

export interface Inscripcion {
  id: string;
  tallerId: string;
  tallerTitulo: string;
  nombre: string;
  email: string;
  dni: string;
  telefono: string;
  fecha: string;
  estado: 'confirmado' | 'en_espera' | 'cancelado';
}

export interface PropuestaComunitaria {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  tipo: 'curso_online' | 'taller_presencial' | 'espacio_disponible';
  titulo: string;
  descripcion: string;
  enlace?: string;
  fecha: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
}

export interface UserProgress {
  completedLessons: string[]; // ids de lecciones completadas
  enrolledTalleres: string[]; // ids de talleres inscriptos
  favoriteIds: string[];      // ids de cursos favoritos
  issuedCertificates: Record<string, string>; // cursoId -> fecha de emisión ISO
  studentName: string;
}
