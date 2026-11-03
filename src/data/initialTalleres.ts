import { Taller } from '../types';

export const INITIAL_TALLERES: Taller[] = [
  {
    id: "tal-01",
    title: "Taller de Modelado e Impresión 3D Práctica",
    type: "taller",
    area: "Fabricación Digital y Prototipado",
    instructor: "Tec. Damián Silva",
    status: "Grabación disponible",
    statusType: "recorded",
    sessionsCount: 3,
    duration: "6 hs",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    description: "Diseño CAD paramétrico con software libre, configuración de perfiles en laminadores (Cura/PrusaSlicer) y calibración de impresoras 3D FDM.",
    espacioId: "esp-fablab",
    activeVideoId: "kJQP7kiw5Fk",
    lessons: [
      { id: "kJQP7kiw5Fk", title: "Sesión 1: Modelado 3D en Tinkercad y FreeCAD", duration: "55 min" },
      { id: "fJ9rUzIMcZQ", title: "Sesión 2: Parámetros de laminación, soportes y temperaturas", duration: "50 min" },
      { id: "3JZ_D3ELwOQ", title: "Sesión 3: Calibración de cama, cambio de filamento y fallas comunes", duration: "45 min" }
    ]
  },
  {
    id: "tal-02",
    title: "Taller de Carpintería Básica y Ensambles en Madera Regional",
    type: "taller",
    area: "Oficios Tradicionales y Sustentables",
    instructor: "Mtro. Raúl Fuentes",
    status: "Grabación disponible",
    statusType: "recorded",
    sessionsCount: 2,
    duration: "4 hs",
    thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    description: "Cortes con sierra de mano y herramientas manuales, ensambles en cola de milano, lijado y tratamiento con aceites naturales para maderas locales.",
    espacioId: "esp-lallave",
    activeVideoId: "3JZ_D3ELwOQ",
    lessons: [
      { id: "3JZ_D3ELwOQ", title: "Clase 1: Maderas de la región patagónica, humedad y vetas", duration: "48 min" },
      { id: "L_LUpnjgPso", title: "Clase 2: Ensambles mecánicos, adhesivos para madera y acabado final", duration: "52 min" }
    ]
  },
  {
    id: "tal-03",
    title: "Taller de Chocolatería Artesanal y Pastelería Patagónica",
    type: "taller",
    area: "Gastronomía Regional",
    instructor: "Chef Chocolatier Marina Schenkel",
    status: "Grabación disponible",
    statusType: "recorded",
    sessionsCount: 2,
    duration: "4 hs",
    thumbnail: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    description: "Técnicas de templado de chocolate en mármol, elaboración tradicional de chocolate en rama y rellenos con frutos rojos de la comarca (frambuesa, mosqueta).",
    espacioId: "esp-gastronomia",
    activeVideoId: "L_LUpnjgPso",
    lessons: [
      { id: "L_LUpnjgPso", title: "Práctica 1: Curva de templado de chocolate por tableado", duration: "45 min" },
      { id: "kJQP7kiw5Fk", title: "Práctica 2: Elaboración de rama artesanal y bombones rellenos", duration: "40 min" }
    ]
  },
  {
    id: "tal-04",
    title: "Taller de Cerámica y Esmaltes Libres de Plomo",
    type: "taller",
    area: "Artes del Fuego",
    instructor: "Prof. Cecilia Porma",
    status: "Grabación disponible",
    statusType: "recorded",
    sessionsCount: 2,
    duration: "4 hs",
    thumbnail: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
    description: "Construcción manual por técnica de pellizco y placas de arcilla, preparación de engobes naturales y horneado de piezas utilitarias.",
    espacioId: "esp-lallave",
    activeVideoId: "fJ9rUzIMcZQ",
    lessons: [
      { id: "fJ9rUzIMcZQ", title: "Sesión 1: Modelado de tazas y cuencos utilitarios", duration: "50 min" },
      { id: "kJQP7kiw5Fk", title: "Sesión 2: Decoración con engobes y preparación para horneado", duration: "48 min" }
    ]
  },

  // CONVOCATORIAS ABIERTAS (Presenciales con inscripción)
  {
    id: "con-tal-01",
    title: "Convocatoria Presencial: Robótica e IoT con Sensores Climatológicos",
    type: "convocatoria",
    area: "Tecnología e Innovación Abierta",
    instructor: "Equipo de Extensión Universitaria",
    status: "Convocatoria Abierta",
    statusType: "open-call",
    duration: "4 sábados (12 hs)",
    closingDateFormatted: "15 de Noviembre, 2026",
    spots: "20 cupos presenciales gratuitos",
    modality: "Presencial en FabLab Bariloche (Juramento 102)",
    thumbnail: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    description: "Taller práctico presencial para armar tu propia estación de monitoreo ambiental con placas ESP32 y sensores de humedad y temperatura.",
    espacioId: "esp-fablab",
    requirements: [
      "Residir en Bariloche o alrededores",
      "Edad mínima de 16 años",
      "Interés en tecnología o electrónica básica",
      "Disponibilidad los sábados de 10:00 a 13:00 hs"
    ],
    documentRequirements: "DNI frente y dorso y formulario de motivación breve."
  },
  {
    id: "con-tal-02",
    title: "Convocatoria Presencial: Fotografía de Producto con Celular para Artesanos",
    type: "convocatoria",
    area: "Fotografía y Comunicación Emprendedora",
    instructor: "Fot. Lucas Bernardi",
    status: "Convocatoria Abierta",
    statusType: "open-call",
    duration: "2 encuentros prácticos (6 hs)",
    closingDateFormatted: "28 de Noviembre, 2026",
    spots: "25 cupos presenciales gratuitos",
    modality: "Presencial en Sala Frey (Centro Cívico)",
    thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    description: "Aprende a montar una mini caja de luz casera y fotografiar artesanías, tejidos, madera y alimentos con luz natural para tiendas online y ferias.",
    espacioId: "esp-salafrey",
    requirements: [
      "Ser artesano o emprendedor local activo",
      "Llevar teléfono smartphone con cámara funcional",
      "Llevar productos propios para las prácticas de toma"
    ],
    documentRequirements: "Constancia de emprendimiento o fotos de los productos."
  }
];
