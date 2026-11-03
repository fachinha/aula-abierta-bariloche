import { EspacioFisico } from '../types';

export const ESPACIOS_BARILOCHE: EspacioFisico[] = [
  {
    id: 'esp-fablab',
    nombre: 'FabLab Bariloche (Laboratorio de Fabricación Digital)',
    direccion: 'Juramento 102',
    barrio: 'Centro',
    latitud: -41.1352,
    longitud: -71.3094,
    lineasColectivo: ['Línea 20', 'Línea 21', 'Línea 10', 'Línea 22'],
    contacto: 'fablab@bariloche.org / +54 294 443-1200',
    descripcion: 'Espacio de innovación ciudadana equipado con impresoras 3D, corte láser, electrónica y robótica comunitaria.',
    imagen: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    talleresIds: ['tal-01', 'con-tal-01']
  },
  {
    id: 'esp-lallave',
    nombre: 'Escuela de Arte La Llave',
    direccion: 'Onelli y Sobral',
    barrio: 'El Alto / Bella Vista',
    latitud: -41.1448,
    longitud: -71.3005,
    lineasColectivo: ['Línea 50', 'Línea 71', 'Línea 81', 'Línea 84'],
    contacto: 'lallavearte@bariloche.edu.ar',
    descripcion: 'Centro de educación artística y oficios culturales con talleres de cerámica, escultura, música y telar.',
    imagen: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    talleresIds: ['tal-04']
  },
  {
    id: 'esp-sarmiento',
    nombre: 'Biblioteca Popular Sarmiento',
    direccion: 'Centro Cívico s/n',
    barrio: 'Centro Cívico',
    latitud: -41.1336,
    longitud: -71.3103,
    lineasColectivo: ['Línea 20', 'Línea 10', 'Línea 50', 'Línea 51'],
    contacto: 'bibliotecasarmiento@bariloche.org.ar',
    descripcion: 'Histórica sala de lectura, talleres de escritura, oratoria y apoyo escolar en pleno Centro Cívico.',
    imagen: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    talleresIds: []
  },
  {
    id: 'esp-unrn',
    nombre: 'Sede Andina UNRN (Edificio Anasagasti)',
    direccion: 'Anasagasti 1463',
    barrio: 'El Mallín',
    latitud: -41.1389,
    longitud: -71.2982,
    lineasColectivo: ['Línea 60', 'Línea 61', 'Línea 80'],
    contacto: 'extension.andina@unrn.edu.ar',
    descripcion: 'Aulas informáticas y laboratorios abiertos para talleres universitarios y tutorías abiertas a estudiantes secundarios y terciarios.',
    imagen: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    talleresIds: ['con-tal-01']
  },
  {
    id: 'esp-crub',
    nombre: 'CRUB - Centro Regional Universitario Bariloche (UNCo)',
    direccion: 'Quintral 1250',
    barrio: 'Barrio Jardín Botánico',
    latitud: -41.1465,
    longitud: -71.3258,
    lineasColectivo: ['Línea 51', 'Línea 55'],
    contacto: 'extension@crub.uncoma.edu.ar',
    descripcion: 'Sede universitaria de la UNCo con laboratorios de biología, aulas de matemática y talleres de ciencias naturales.',
    imagen: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    talleresIds: []
  },
  {
    id: 'esp-gastronomia',
    nombre: 'Escuela Comunitaria de Gastronomía y Oficios',
    direccion: 'Rivadavia y Vicealmirante O\'Connor',
    barrio: 'Ñireco / Costa Lago',
    latitud: -41.1340,
    longitud: -71.2885,
    lineasColectivo: ['Línea 20', 'Línea 72', 'Línea 83'],
    contacto: 'talleresgastronomia@bariloche.org',
    descripcion: 'Cocina industrial pedagógica para prácticas de pastelería, chocolatería artesanal, servicio de salón y barista.',
    imagen: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    talleresIds: ['tal-03']
  },
  {
    id: 'esp-salafrey',
    nombre: 'Sala Frey (Centro Cívico)',
    direccion: 'Centro Cívico s/n (Ala Este)',
    barrio: 'Centro',
    latitud: -41.1338,
    longitud: -71.3101,
    lineasColectivo: ['Línea 20', 'Línea 21', 'Línea 10', 'Línea 50'],
    contacto: 'culturacomunitaria@bariloche.edu.ar',
    descripcion: 'Espacio multifuncional para capacitaciones de emprendedores, exposiciones y talleres visuales.',
    imagen: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    talleresIds: ['con-tal-02']
  }
];
