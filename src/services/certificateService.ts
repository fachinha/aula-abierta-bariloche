import jsPDF from 'jspdf';

interface CertificateOptions {
  studentName: string;
  courseTitle: string;
  duration: string;
  instructor: string;
  institution: string;
  dateStr?: string;
  verificationCode?: string;
}

export const generateCourseCertificatePDF = (options: CertificateOptions): void => {
  const {
    studentName,
    courseTitle,
    duration,
    instructor,
    institution,
    dateStr = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }),
    verificationCode = `AAB-${Math.floor(100000 + Math.random() * 900000)}`
  } = options;

  // Formato A4 apaisado: 297mm ancho x 210mm alto
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 297;
  const pageHeight = 210;

  // Fondo sutil marfil
  doc.setFillColor(254, 254, 252);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Marco exterior decorativo (Azul Profundo)
  doc.setDrawColor(30, 64, 175); // #1E40AF
  doc.setLineWidth(2.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Marco interior fino (Verde Esmeralda Patagónico)
  doc.setDrawColor(5, 150, 105); // #059669
  doc.setLineWidth(0.8);
  doc.rect(14, 14, pageWidth - 28, pageHeight - 28);

  // Esquinas decorativas
  const drawCorner = (x: number, y: number, dirX: number, dirY: number) => {
    doc.setDrawColor(30, 64, 175);
    doc.setLineWidth(1.2);
    doc.line(x, y, x + dirX * 12, y);
    doc.line(x, y, x, y + dirY * 12);
  };
  drawCorner(16, 16, 1, 1);
  drawCorner(pageWidth - 16, 16, -1, 1);
  drawCorner(16, pageHeight - 16, 1, -1);
  drawCorner(pageWidth - 16, pageHeight - 16, -1, -1);

  // Encabezado institucional
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139); // Slate-500
  doc.text('EXTENSIÓN UNIVERSITARIA & COMUNIDAD DE BARILOCHE', pageWidth / 2, 28, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(30, 64, 175); // Azul
  doc.text('AULA ABIERTA BARILOCHE', pageWidth / 2, 38, { align: 'center' });

  // Título del Certificado
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(5, 150, 105); // Verde esmeralda
  doc.text('CONSTANCIA DE FORMACIÓN Y APROBACIÓN', pageWidth / 2, 50, { align: 'center' });

  // Línea divisoria decorativa central
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 40, 54, pageWidth / 2 + 40, 54);

  // Texto introductorio
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(71, 85, 105);
  doc.text('Se certifica solemnemente que:', pageWidth / 2, 66, { align: 'center' });

  // Nombre del Estudiante
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.text(studentName.toUpperCase(), pageWidth / 2, 80, { align: 'center' });

  // Línea sutil bajo el nombre
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(0.6);
  doc.line(pageWidth / 2 - 60, 84, pageWidth / 2 + 60, 84);

  // Texto de cumplimiento
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(71, 85, 105);
  doc.text('Ha cursado y completado exitosamente la totalidad de las lecciones y prácticas del programa:', pageWidth / 2, 94, { align: 'center' });

  // Nombre del Curso
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(30, 64, 175);
  doc.text(`"${courseTitle}"`, pageWidth / 2, 107, { align: 'center' });

  // Carga horaria e institución
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text(`Carga horaria acreditada: ${duration}  |  Ámbito: ${institution}`, pageWidth / 2, 117, { align: 'center' });

  // Firmas y sellos
  const signatureY = 160;

  // Firma 1: Docente / Creador
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.5);
  doc.line(45, signatureY, 115, signatureY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text(instructor, 80, signatureY + 6, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Instructor / Responsable de Cátedra', 80, signatureY + 11, { align: 'center' });

  // Firma 2: Coordinación General
  doc.line(pageWidth - 115, signatureY, pageWidth - 45, signatureY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('Coordinación de Proyecto', pageWidth - 80, signatureY + 6, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Extensión Abierta Bariloche', pageWidth - 80, signatureY + 11, { align: 'center' });

  // Pie de página: Fecha, Sello de Bariloche y Código
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`San Carlos de Bariloche, Río Negro, Patagonia Argentina — Emitido el ${dateStr}`, pageWidth / 2, 185, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Código Único de Validación Digital: ${verificationCode}`, pageWidth / 2, 191, { align: 'center' });

  // Guardar archivo PDF con nombre limpio
  const cleanTitle = courseTitle.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
  doc.save(`Certificado_AulaAbierta_${cleanTitle}.pdf`);
};
