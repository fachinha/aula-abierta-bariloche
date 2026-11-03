import { Capacitacion } from '../types';

export const INITIAL_CAPACITACIONES: Capacitacion[] = [
  {
    id: "cap-barista",
    title: "Capacitación de Barista Profesional y Café de Especialidad",
    sector: "Gastronomía y Hospitalidad",
    targetJobs: "Barista, Cafetero, Encargado de Barra de Café",
    instructor: "Santiago Morales (Head Barista)",
    institution: "Cátedra de Oficios Gastronómicos",
    creatorYoutubeName: "Flat & White / Escuela de Baristas",
    creatorChannelUrl: "https://www.youtube.com/@flatandwhite",
    duration: "24 horas (4 semanas)",
    modality: "Virtual con prácticas sugeridas",
    description: "Aprendé el arte del café desde el grano a la taza: calibración de molino, extracción perfecta del espresso, texturizado sedoso de leche para arte latte y carta de cafés fríos y calientes.",
    thumbnail: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "kJQP7kiw5Fk",
    lessons: [
      { id: "kJQP7kiw5Fk", title: "Módulo 1: Variedades de café, tuestes y funcionamiento de la máquina espresso", duration: "45 min" },
      { id: "fJ9rUzIMcZQ", title: "Módulo 2: Ratio, molienda y extracción de un espresso balanceado", duration: "50 min" },
      { id: "3JZ_D3ELwOQ", title: "Módulo 3: Texturizado de leche (microespuma) y vertido básico de arte latte", duration: "55 min" },
      { id: "L_LUpnjgPso", title: "Módulo 4: Limpieza, mantenimiento preventivo de la máquina y atención al cliente", duration: "40 min" }
    ],
    skills: ["Calibración de molino", "Extracción espresso", "Arte Latte", "Mantenimiento de máquina", "Atención en barra"],
    materials: [
      { name: "Guía de Recetas y Parámetros de Extracción (PDF)", size: "3.2 MB" },
      { name: "Manual de Mantenimiento de Cafetera Espresso (PDF)", size: "1.8 MB" }
    ]
  },
  {
    id: "cap-mozo",
    title: "Servicio de Salón, Mozo Profesional y Protocolo Gastronómico",
    sector: "Gastronomía y Hospitalidad",
    targetJobs: "Mozo / Camarera, Runner de Salón, Encargado de Salón",
    instructor: "Valeria Rossi y Gastón Vedia",
    institution: "Formación para el Trabajo Regional",
    creatorYoutubeName: "Hospitalidad Argentina / Capacitaciones",
    creatorChannelUrl: "https://www.youtube.com",
    duration: "20 horas (3 semanas)",
    modality: "Virtual interactivo",
    description: "Herramientas indispensables para el trabajo en restaurantes y cervecerías de Bariloche: mise en place, toma de comanda tradicional y digital, técnicas de charola/bandeja, protocolo de quejas y propinas.",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "fJ9rUzIMcZQ",
    lessons: [
      { id: "fJ9rUzIMcZQ", title: "Clase 1: Apertura de salón, mise en place y fajinado de vajilla", duration: "40 min" },
      { id: "kJQP7kiw5Fk", title: "Clase 2: Técnica de transporte de bandeja, servicio por derecha y desbarase", duration: "45 min" },
      { id: "3JZ_D3ELwOQ", title: "Clase 3: Carta de vinos patagónicos y maridaje sugerido", duration: "50 min" },
      { id: "M7lc1UVf-VE", title: "Clase 4: Comunicación asertiva, resolución de reclamos y fidelización del cliente", duration: "48 min" }
    ],
    skills: ["Manejo de bandeja", "Comanda digital", "Servicio en mesa", "Maridaje básico", "Resolución de conflictos"],
    materials: [
      { name: "Manual del Mozo y Protocolo de Salón (PDF)", size: "2.7 MB" },
      { name: "Vocabulario de Platos y Vinos en Inglés (PDF)", size: "1.4 MB" }
    ]
  },
  {
    id: "cap-electricidad",
    title: "Electricidad Domiciliaria e Instalaciones Seguras",
    sector: "Construcción y Mantenimiento",
    targetJobs: "Electricista Domiciliario, Auxiliar de Mantenimiento Edilicio",
    instructor: "Téc. Roberto Valenzuela",
    institution: "Centro de Formación en Oficios",
    creatorYoutubeName: "Técnica Argentina / Oficios Prácticos",
    creatorChannelUrl: "https://www.youtube.com",
    duration: "48 horas (6 semanas)",
    modality: "Semipresencial con clases grabadas",
    description: "Normas de seguridad eléctrica IRAM, diseño de circuitos de iluminación y tomas corrientes, cálculo de disyuntores diferenciales y armado de tableros seccionales.",
    thumbnail: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "3JZ_D3ELwOQ",
    lessons: [
      { id: "3JZ_D3ELwOQ", title: "Clase 1: Normativa de seguridad y herramientas con aislamiento 1000V", duration: "50 min" },
      { id: "L_LUpnjgPso", title: "Clase 2: Armado de circuitos de iluminación (1 punto y combinación)", duration: "55 min" },
      { id: "kJQP7kiw5Fk", title: "Clase 3: Cálculo y conexión de disyuntor diferencial y llaves termomagnéticas", duration: "60 min" }
    ],
    skills: ["Lectura de planos unifilares", "Tableros eléctricos", "Normas IRAM", "Puesta a tierra"],
    materials: [
      { name: "Guía de Instalaciones Eléctricas Domiciliarias (PDF)", size: "4.1 MB" }
    ]
  },
  {
    id: "cap-python",
    title: "Programación en Python y Automatización para el Empleo",
    sector: "Tecnología e Informática",
    targetJobs: "Desarrollador Junior, Automatizador de Tareas, Asistente de Datos",
    instructor: "Ing. Laura Méndez",
    institution: "Laboratorio Abierto de Computación",
    creatorYoutubeName: "Fazt Code / Python en Español",
    creatorChannelUrl: "https://www.youtube.com/@FaztCode",
    duration: "40 horas (8 semanas)",
    modality: "Virtual con tutorías",
    description: "Iniciación a la programación con Python 3: tipos de datos, estructuras de control, procesamiento de planillas Excel y scripts para automatizar tareas repetitivas en oficinas.",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "fJ9rUzIMcZQ",
    lessons: [
      { id: "fJ9rUzIMcZQ", title: "Módulo 1: Instalación de Python, VS Code y sintaxis básica", duration: "60 min" },
      { id: "kJQP7kiw5Fk", title: "Módulo 2: Listas, diccionarios y bucles for/while", duration: "58 min" },
      { id: "3JZ_D3ELwOQ", title: "Módulo 3: Automatización de planillas Excel y generación de reportes", duration: "62 min" }
    ],
    skills: ["Python 3", "Automatización", "Manejo de archivos", "Lógica algorítmica"],
    materials: [
      { name: "Cuaderno de Ejercicios Prácticos de Python (PDF)", size: "3.5 MB" }
    ]
  },
  {
    id: "cap-pymes",
    title: "Gestión Administrativa, Facturación y Monotributo para Pymes",
    sector: "Administración y Comercio",
    targetJobs: "Auxiliar Administrativo, Asistente Contable, Emprendedor",
    instructor: "Cra. Natalia Gómez",
    institution: "Consultorio para Microemprendedores",
    creatorYoutubeName: "Contabilidad Simple / Emprendedores",
    creatorChannelUrl: "https://www.youtube.com",
    duration: "24 horas (4 semanas)",
    modality: "Virtual interactivo",
    description: "Aprende a emitir facturas electrónicas en ARCA/AFIP, calcular costos de productos, llevar el control de ingresos/egresos en planillas de cálculo y gestionar tu monotributo al día.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "kJQP7kiw5Fk",
    lessons: [
      { id: "kJQP7kiw5Fk", title: "Clase 1: Facturación electrónica en el portal de ARCA/AFIP y punto de venta", duration: "50 min" },
      { id: "fJ9rUzIMcZQ", title: "Clase 2: Planilla de cálculo aplicada a costos fijos, variables y fijación de precios", duration: "54 min" },
      { id: "3JZ_D3ELwOQ", title: "Clase 3: Recategorización de Monotributo y medios de pago digitales", duration: "48 min" }
    ],
    skills: ["Facturación ARCA/AFIP", "Planillas de cálculo", "Costos y presupuestos", "Monotributo"],
    materials: [
      { name: "Plantilla Excel de Costos y Facturación Lista para Usar (PDF/XLS)", size: "1.9 MB" }
    ]
  }
];
