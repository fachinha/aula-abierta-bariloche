import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, Download, CheckCircle, Sparkles, X } from 'lucide-react';
import { generateCourseCertificatePDF } from '../../services/certificateService';
import { recordCertificateIssued } from '../../services/storage';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  cursoId: string;
  courseTitle: string;
  duration: string;
  instructor: string;
  institution: string;
  initialStudentName: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  cursoId,
  courseTitle,
  duration,
  instructor,
  institution,
  initialStudentName
}) => {
  const [studentName, setStudentName] = useState(initialStudentName || 'Estudiante');
  const [isGenerated, setIsGenerated] = useState(false);

  if (!isOpen) return null;

  const handleDownloadCertificate = () => {
    // Lanzar efecto de confeti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    generateCourseCertificatePDF({
      studentName: studentName.trim() || 'Estudiante de Bariloche',
      courseTitle,
      duration,
      instructor,
      institution
    });

    recordCertificateIssued(cursoId, studentName.trim());
    setIsGenerated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        
        {/* Banner superior festivo */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-emerald-700 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center shadow-lg">
            <Award className="w-8 h-8 text-amber-300" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-semibold mb-2 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            ¡Felicitaciones! Has completado el curso
          </span>

          <h3 className="text-xl font-bold tracking-tight">
            Descargá tu Certificado Oficial
          </h3>
          <p className="text-xs text-blue-100/90 mt-1">
            Emitido por Aula Abierta Bariloche y la Cátedra de Formación
          </p>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="mb-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">Programa acreditado:</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">{courseTitle}</div>
            <div className="text-xs text-slate-600 mt-1 flex items-center gap-3">
              <span>⏱️ Carga horaria: <strong>{duration}</strong></span>
              <span>👨‍🏫 <strong>{instructor}</strong></span>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Nombre y Apellido (como figurará en tu diploma):
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Ej: Sofía Almendra Valenzuela"
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-800"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Podés editarlo en cualquier momento. El certificado se genera en formato PDF listo para imprimir o adjuntar a tu CV.
            </p>
          </div>

          {isGenerated && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>¡Certificado generado y descargado con éxito en tu computadora!</span>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleDownloadCertificate}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Diploma en PDF</span>
            </button>
            <button
              onClick={onClose}
              className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
