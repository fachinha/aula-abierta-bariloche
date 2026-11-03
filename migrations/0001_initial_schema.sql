-- Esquema Relacional de Base de Datos para Cloudflare D1
-- Aula Abierta Bariloche

CREATE TABLE IF NOT EXISTS espacios_fisicos (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  direccion TEXT NOT NULL,
  barrio TEXT NOT NULL,
  latitud REAL NOT NULL,
  longitud REAL NOT NULL,
  lineas_colectivo TEXT NOT NULL,
  contacto TEXT,
  descripcion TEXT
);

CREATE TABLE IF NOT EXISTS cursos (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'curso',
  nivel TEXT,
  subnivel TEXT,
  area TEXT NOT NULL,
  sector TEXT,
  puestos_objetivo TEXT,
  duracion TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  miniatura_url TEXT NOT NULL,
  creador_nombre TEXT NOT NULL,
  creador_canal_url TEXT,
  cuadernillo_url TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lecciones (
  id TEXT PRIMARY KEY,
  curso_id TEXT NOT NULL,
  titulo TEXT NOT NULL,
  duracion TEXT NOT NULL,
  youtube_video_id TEXT NOT NULL,
  orden_numero INTEGER NOT NULL,
  FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS talleres (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'taller',
  estado TEXT NOT NULL DEFAULT 'recorded',
  espacio_id TEXT,
  tallerista_nombre TEXT NOT NULL,
  duracion TEXT NOT NULL,
  cupos_totales INTEGER DEFAULT 0,
  fecha_cierre TEXT,
  miniatura_url TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  requisitos TEXT,
  FOREIGN KEY (espacio_id) REFERENCES espacios_fisicos(id)
);

CREATE TABLE IF NOT EXISTS inscripciones (
  id TEXT PRIMARY KEY,
  taller_id TEXT NOT NULL,
  estudiante_nombre TEXT NOT NULL,
  estudiante_email TEXT NOT NULL,
  estudiante_dni TEXT NOT NULL,
  estudiante_telefono TEXT NOT NULL,
  estado TEXT DEFAULT 'confirmado',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (taller_id) REFERENCES talleres(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS propuestas_comunitarias (
  id TEXT PRIMARY KEY,
  postulante_nombre TEXT NOT NULL,
  postulante_email TEXT NOT NULL,
  titulo_propuesta TEXT NOT NULL,
  tipo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  enlace_referencia TEXT,
  estado TEXT DEFAULT 'pendiente',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
