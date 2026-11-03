# 🎓 Aula Abierta Bariloche
### Plataforma Universitaria & Comunitaria de Saberes Libres
**Trabajo Práctico Integrador — Programación 3**

---

## 🏔️ 1. Descripción del Proyecto

**Aula Abierta Bariloche** es una plataforma web desarrollada como proyecto de extensión universitaria para democratizar el acceso al conocimiento y la formación laboral en San Carlos de Bariloche y la región patagónica.

### 🌟 Pilares Principales:
1. **📚 Cursos Académicos y Apoyo Escolar**:
   - Organizados jerárquicamente por ciclos pedagógicos:
     - **Primaria**: 1° a 3° Grado (alfabetización y conteo inicial), 4° y 5° Grado (multiplicación y ciencias), 6° y 7° Grado (articulación e ingreso a secundaria).
     - **Secundaria**: Ciclo Básico y Ciclo Orientado.
     - **Universidad y Terciario**: Cálculo, Álgebra y materias introductorias (UNRN / UNCo).
   - Cuadernillos de ejercicios descargables en PDF para estudiar sin conexión.
2. **☕ Capacitaciones Laborales y para la Vida**:
   - Formación en oficios de alta demanda en la región: **Barista Profesional y Arte Latte**, **Servicio de Mozo de Salón**, **Electricidad Domiciliaria**, **Programación con Python** y **Facturación para Pymes y Emprendedores**.
   - Habilidades prácticas y puestos laborales objetivo bien definidos.
3. **🛠️ Talleres Presenciales y Sedes de Bariloche**:
   - Integración con espacios físicos comunitarios reales de Bariloche:
     - **FabLab Bariloche** (Juramento 102)
     - **Escuela de Arte La Llave** (Onelli y Sobral)
     - **Sala Frey** (Centro Cívico)
     - **Escuela Comunitaria de Gastronomía** (Ñireco)
     - **Sedes Universitarias UNRN y UNCo**
   - **Mapa Interactivo con Leaflet y OpenStreetMap** indicando recorridos y líneas de transporte público local (**Mi Bus**).
   - Sistema de pre-inscripción ciudadana con control de cupos.

---

## ✨ 2. Funcionalidades Destacadas

- **📜 Generación de Diplomas y Certificados Oficiales en PDF**:
  - Al completar el 100% de las clases de un curso, el sistema permite emitir y descargar de forma instantánea un diploma formal con borde patagónico, código único de validación y firma de cátedra mediante `jsPDF`.
- **🤝 Reconocimiento Ético a Creadores**:
  - Cada curso acredita y vincula de forma directa con los canales de YouTube de los docentes y educadores que brindan su contenido en abierto.
- **📈 Seguimiento de Progreso ("Mi Perfil")**:
  - Checklist interactivo de lecciones vistas, porcentaje de avance por curso y almacenamiento persistente en el navegador.
- **🛡️ Panel de Administración (Backoffice)**:
  - Métricas de inscriptos y cursos activos.
  - Tabla de participantes con exportación directa a formato **CSV / Excel**.
  - Formulario para crear y publicar nuevos cursos dinámicamente.
- **💬 Módulo "Postulá tu Curso o Taller"**:
  - Formulario para que talleristas, profesores y vecinos propongan actividades comunitarias.

---

## 🛠️ 3. Arquitectura y Stack Tecnológico

- **Frontend**: React 18/19, TypeScript, Vite.
- **Estilos**: Tailwind CSS con paleta institucional universitaria (Azul `#1E40AF`, Esmeralda `#059669`, Neutros `#F8FAFC`).
- **Mapas**: Leaflet + OpenStreetMap (100% código abierto, sin API Keys comerciales).
- **Certificados**: jsPDF + canvas-confetti.
- **Backend / Edge Functions**: Cloudflare Pages Functions (`/functions/api/`).
- **Base de Datos**: Cloudflare D1 (SQL relacional basado en SQLite) con fallback resiliente local.

---

## 🚀 4. Cómo Ejecutar en Local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```
2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre tu navegador en `http://localhost:5173`.
3. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## ☁️ 5. Cómo Desplegar en Cloudflare Pages

1. **Subir a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: Aula Abierta Bariloche v1.0"
   git remote add origin https://github.com/<tu-usuario>/aula-abierta-bariloche.git
   git push -u origin main
   ```
2. **En Cloudflare Dashboard** ([dash.cloudflare.com](https://dash.cloudflare.com)):
   - Ve a **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
   - Selecciona el repositorio.
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - Haz clic en **Save and Deploy**.
3. **Base de Datos D1 (Opcional)**:
   - En tu terminal: `npx wrangler d1 create aula-abierta-db`
   - Aplica las migraciones: `npx wrangler d1 execute aula-abierta-db --file=migrations/0001_initial_schema.sql`
   - Vincula la base en Cloudflare Pages -> `Settings` -> `Functions` -> `D1 database bindings`.

---

## 👥 Autores y Cátedra
- **Materia**: Programación 3
- **Proyecto**: Trabajo Práctico Integrador (TPI)
- **Ubicación**: San Carlos de Bariloche, Río Negro, Patagonia Argentina
