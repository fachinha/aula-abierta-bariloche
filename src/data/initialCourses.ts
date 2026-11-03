import { Curso } from '../types';

export const INITIAL_CURSOS: Curso[] = [
  // --- PRIMARIA: 1° A 3° GRADO (PRIMER CICLO) ---
  {
    id: "cur-mat-pri-1",
    title: "Matemática Inicial: Conteo, Sumas y Restas",
    level: "Primaria",
    grade: "1° a 3° Grado",
    gradeKey: "pri-1-3",
    area: "Matemática",
    instructor: "Prof. Lucía Mastroianni",
    institution: "Cátedra Abierta de Pedagogía Escolar",
    creatorYoutubeName: "Daniel Carreón / Matemáticas Lúdicas",
    creatorChannelUrl: "https://www.youtube.com/@DanielCarreon",
    lessonsCount: 4,
    duration: "4 hs totales",
    description: "Construcción del sistema de numeración, sumas y restas con material concreto, escalas y situaciones de conteo para los primeros años escolares.",
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "kJQP7kiw5Fk",
    lessons: [
      { id: "kJQP7kiw5Fk", title: "Clase 1: Los números del 1 al 100 y escalas", duration: "25 min" },
      { id: "fJ9rUzIMcZQ", title: "Clase 2: Sumas sin dificultad y familias de números", duration: "28 min" },
      { id: "3JZ_D3ELwOQ", title: "Clase 3: Restas con material concreto y descomposición", duration: "30 min" },
      { id: "L_LUpnjgPso", title: "Clase 4: Problemas cotidianos en la verdulería y el almacén", duration: "26 min" }
    ],
    materials: [
      { name: "Fichas de Conteo y Numeración Inicial (PDF)", size: "2.1 MB" },
      { name: "Juego de Cartas Numéricas para Imprimir (PDF)", size: "1.5 MB" }
    ]
  },
  {
    id: "cur-len-pri-1",
    title: "Lengua: Alfabetización Inicial y Lecturas Breves",
    level: "Primaria",
    grade: "1° a 3° Grado",
    gradeKey: "pri-1-3",
    area: "Lengua",
    instructor: "Prof. Carolina Vaca",
    institution: "Proyecto de Extensión en Lectoescritura",
    creatorYoutubeName: "Canal Pakapaka / Cuentos Infantiles",
    creatorChannelUrl: "https://www.youtube.com/@canalpakapaka",
    lessonsCount: 3,
    duration: "3.5 hs totales",
    description: "Iniciación a la lectoescritura, reconocimiento de sonidos y grafemas, lectura de rimas, adivinanzas y cuentos cortos tradicionales.",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "fJ9rUzIMcZQ",
    lessons: [
      { id: "fJ9rUzIMcZQ", title: "Clase 1: Vocales y consonantes en nombres propios", duration: "24 min" },
      { id: "kJQP7kiw5Fk", title: "Clase 2: Lectura de adivinanzas y juegos de palabras", duration: "28 min" },
      { id: "L_LUpnjgPso", title: "Clase 3: Escritura de las primeras oraciones completas", duration: "30 min" }
    ],
    materials: [
      { name: "Cuaderno de Letras y Trazos para Primer Ciclo (PDF)", size: "3.4 MB" }
    ]
  },

  // --- PRIMARIA: 4° Y 5° GRADO (SEGUNDO CICLO) ---
  {
    id: "cur-mat-pri-4",
    title: "Matemática: Multiplicación, División y Fracciones Básicas",
    level: "Primaria",
    grade: "4° y 5° Grado",
    gradeKey: "pri-4-5",
    area: "Matemática",
    instructor: "Prof. Diego Paredes",
    institution: "Tutorías Universitarias de Apoyo Escolar",
    creatorYoutubeName: "Profe Alex / Matemáticas Primaria",
    creatorChannelUrl: "https://www.youtube.com/@julioprofe",
    lessonsCount: 4,
    duration: "5 hs totales",
    description: "Tablas de multiplicar razonadas, algoritmo de la división por una y dos cifras, y noción gráfica de fracciones cotidianas (medios, cuartos, octavos).",
    thumbnail: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "3JZ_D3ELwOQ",
    lessons: [
      { id: "3JZ_D3ELwOQ", title: "Clase 1: Multiplicación como suma repetida y tablas", duration: "30 min" },
      { id: "kJQP7kiw5Fk", title: "Clase 2: Estrategias de división con resto", duration: "34 min" },
      { id: "fJ9rUzIMcZQ", title: "Clase 3: Introducción a las fracciones con pizzas y chocolates", duration: "32 min" },
      { id: "M7lc1UVf-VE", title: "Clase 4: Problemas combinados de dos pasos", duration: "28 min" }
    ],
    materials: [
      { name: "Guía de Ejercitación de Fracciones y Divisiones (PDF)", size: "2.4 MB" }
    ]
  },
  {
    id: "cur-cie-pri-4",
    title: "Ciencias Naturales: El Agua y los Ecosistemas Patagónicos",
    level: "Primaria",
    grade: "4° y 5° Grado",
    gradeKey: "pri-4-5",
    area: "Ciencias",
    instructor: "Lic. Martina Quiroga",
    institution: "Laboratorio Abierto de Ciencias",
    creatorYoutubeName: "Educatina / Ciencias Naturales",
    creatorChannelUrl: "https://www.youtube.com/@educatina",
    lessonsCount: 3,
    duration: "3.5 hs totales",
    description: "El ciclo hidrológico en la cuenca de los lagos Nahuel Huapi y Moreno, flora andina, adaptaciones al invierno y preservación del entorno.",
    thumbnail: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "kJQP7kiw5Fk",
    lessons: [
      { id: "kJQP7kiw5Fk", title: "Clase 1: El ciclo del agua en la cordillera", duration: "26 min" },
      { id: "fJ9rUzIMcZQ", title: "Clase 2: Bosques nativos: Coihues, Lengas y Arrayanes", duration: "32 min" },
      { id: "3JZ_D3ELwOQ", title: "Clase 3: Cadenas tróficas y fauna autóctona", duration: "28 min" }
    ],
    materials: [
      { name: "Cuadernillo de Campo del Bosque Patagónico (PDF)", size: "3.8 MB" }
    ]
  },

  // --- PRIMARIA: 6° Y 7° GRADO (TERCER CICLO / EGRESO) ---
  {
    id: "cur-mat-pri-7",
    title: "Matemática Avanzada: Proporcionalidad e Ingreso a Secundaria",
    level: "Primaria",
    grade: "6° y 7° Grado",
    gradeKey: "pri-6-7",
    area: "Matemática",
    instructor: "Prof. Marcos Villalba",
    institution: "Articulación Primaria-Secundaria UNRN",
    creatorYoutubeName: "Profe Alex / Matemáticas",
    creatorChannelUrl: "https://www.youtube.com/@MatematicasprofeAlex",
    lessonsCount: 3,
    duration: "6 hs totales",
    description: "Proporcionalidad directa e inversa, porcentaje, números decimales avanzados, perímetro, área y preparación para 1° año secundario.",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "3JZ_D3ELwOQ",
    lessons: [
      { id: "3JZ_D3ELwOQ", title: "Clase 1: Proporcionalidad directa y regla de tres", duration: "38 min" },
      { id: "kJQP7kiw5Fk", title: "Clase 2: Porcentajes y cálculos en el comercio", duration: "42 min" },
      { id: "fJ9rUzIMcZQ", title: "Clase 3: Geometría plana y cálculo de áreas", duration: "45 min" }
    ],
    materials: [
      { name: "Cuadernillo de Articulación con 1° Año de Secundaria (PDF)", size: "2.8 MB" }
    ]
  },
  {
    id: "cur-soc-pri",
    title: "Ciencias Sociales e Historia Regional Patagónica",
    level: "Primaria",
    grade: "6° y 7° Grado",
    gradeKey: "pri-6-7",
    area: "Historia",
    instructor: "Lic. Mariano Quinchao",
    institution: "Grupo de Historia Regional Bariloche",
    creatorYoutubeName: "Canal Encuentro / Historia Abierta",
    creatorChannelUrl: "https://www.youtube.com/@CanalEncuentro",
    lessonsCount: 3,
    duration: "4 hs totales",
    description: "Pueblos originarios de la Norpatagonia, proceso de organización nacional, poblamiento de la región cordillerana y patrimonio histórico local.",
    thumbnail: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "3JZ_D3ELwOQ",
    lessons: [
      { id: "3JZ_D3ELwOQ", title: "Clase 1: Sociedades originarias de la Patagonia", duration: "32 min" },
      { id: "L_LUpnjgPso", title: "Clase 2: Revolución de Mayo y consolidación territorial", duration: "36 min" },
      { id: "kJQP7kiw5Fk", title: "Clase 3: Historia y orígenes de San Carlos de Bariloche", duration: "34 min" }
    ],
    materials: [
      { name: "Atlas y Mapas Históricos Norpatagónicos (PDF)", size: "3.5 MB" }
    ]
  },

  // --- SECUNDARIA: CICLO BÁSICO Y ORIENTADO ---
  {
    id: "cur-mat-sec-1",
    title: "Matemática Secundaria: Números Enteros y Ecuaciones",
    level: "Secundaria",
    grade: "1° y 2° Año",
    gradeKey: "sec-1-2",
    area: "Matemática",
    instructor: "Prof. Marcos Villalba",
    institution: "Tutorías de Ciclo Básico",
    creatorYoutubeName: "JulioProfe / Álgebra Inicial",
    creatorChannelUrl: "https://www.youtube.com/@julioprofe",
    lessonsCount: 3,
    duration: "6 hs totales",
    description: "Conjunto de los números enteros (Z), regla de signos, operaciones combinadas y resolución sistemática de ecuaciones de primer grado.",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "kJQP7kiw5Fk",
    lessons: [
      { id: "kJQP7kiw5Fk", title: "Clase 1: Números enteros en la recta numérica", duration: "38 min" },
      { id: "3JZ_D3ELwOQ", title: "Clase 2: Regla de los signos y supresión de paréntesis", duration: "44 min" },
      { id: "fJ9rUzIMcZQ", title: "Clase 3: Ecuaciones de primer grado paso a paso", duration: "48 min" }
    ],
    materials: [
      { name: "Guía Práctica con 100 Ecuaciones Resueltas (PDF)", size: "2.1 MB" }
    ]
  },
  {
    id: "cur-fis-sec-3",
    title: "Física y Química: Fuerzas, Movimiento y Tabla Periódica",
    level: "Secundaria",
    grade: "3° Año",
    gradeKey: "sec-3",
    area: "Física",
    instructor: "Ing. Laura Méndez",
    institution: "Tutorías de Ciencias Exactas",
    creatorYoutubeName: "César Moisés / Física Básica",
    creatorChannelUrl: "https://www.youtube.com/@cesarmoises",
    lessonsCount: 3,
    duration: "5 hs totales",
    description: "Leyes de Newton, velocidad, aceleración, modelos atómicos y lectura de la tabla periódica de los elementos químicos.",
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "3JZ_D3ELwOQ",
    lessons: [
      { id: "3JZ_D3ELwOQ", title: "Clase 1: Cinemática: MRU y MRUV", duration: "42 min" },
      { id: "L_LUpnjgPso", title: "Clase 2: Leyes de Newton y diagramas de cuerpo libre", duration: "46 min" },
      { id: "kJQP7kiw5Fk", title: "Clase 3: Estructura atómica y enlaces químicos", duration: "40 min" }
    ],
    materials: [
      { name: "Resumen de Fórmulas y Tabla Periódica Didáctica (PDF)", size: "1.9 MB" }
    ]
  },

  // --- UNIVERSIDAD / TERCIARIO ---
  {
    id: "cur-mat-uni",
    title: "Cálculo I: Límites, Derivadas e Integrales",
    level: "Universidad",
    grade: "Ingenierías y Exactas",
    gradeKey: "uni-ing",
    area: "Matemática",
    instructor: "Ing. Gonzalo Etcheverry",
    institution: "Cátedra Universitaria Abierta",
    creatorYoutubeName: "MateFacil / Cálculo Diferencial",
    creatorChannelUrl: "https://www.youtube.com/@MateFacil",
    lessonsCount: 3,
    duration: "9 hs totales",
    description: "Acompañamiento universitario para ingresantes y alumnos de carreras de ingeniería, computación y ciencias exactas.",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "L_LUpnjgPso",
    lessons: [
      { id: "L_LUpnjgPso", title: "Clase 1: Límites y Continuidad con resolución de indeterminaciones", duration: "64 min" },
      { id: "kJQP7kiw5Fk", title: "Clase 2: Reglas de Derivación y Regla de la Cadena", duration: "59 min" },
      { id: "fJ9rUzIMcZQ", title: "Clase 3: Teorema Fundamental del Cálculo e Integrales básicas", duration: "72 min" }
    ],
    materials: [
      { name: "Compendio de Parciales Universitarios Resueltos (PDF)", size: "4.5 MB" }
    ]
  },
  {
    id: "cur-alg-uni",
    title: "Álgebra Lineal y Matrices Aplicadas",
    level: "Universidad",
    grade: "Económicas e Informática",
    gradeKey: "uni-lic",
    area: "Matemática",
    instructor: "Lic. Martín Soria",
    institution: "Tutorías en Ciencias Económicas e Informática",
    creatorYoutubeName: "3Blue1Brown en Español / Álgebra Visual",
    creatorChannelUrl: "https://www.youtube.com/@3blue1brownespanol",
    lessonsCount: 3,
    duration: "6 hs totales",
    description: "Vectores, operaciones matriciales, determinantes, sistemas de ecuaciones lineales por eliminación gaussiana y transformaciones lineales.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    activeVideoId: "kJQP7kiw5Fk",
    lessons: [
      { id: "kJQP7kiw5Fk", title: "Clase 1: Matrices y producto matricial intuitivo", duration: "50 min" },
      { id: "fJ9rUzIMcZQ", title: "Clase 2: Determinantes y regla de Cramer", duration: "55 min" },
      { id: "3JZ_D3ELwOQ", title: "Clase 3: Espacios vectoriales y aplicaciones prácticas", duration: "58 min" }
    ],
    materials: [
      { name: "Manual de Álgebra Lineal con Ejercicios Guiados (PDF)", size: "3.2 MB" }
    ]
  }
];
