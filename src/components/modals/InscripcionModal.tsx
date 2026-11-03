import React, { useState } from 'react';
import { Taller, EspacioFisico } from '../../types';
import { ESPACIOS_BARILOCHE } from '../../data/espaciosBariloche';
import { apiService } from '../../services/api';
import { recordWorkshopEnrollment } from '../../services/storage';
import { X, CheckCircle2, MapPin, Calendar, Users, AlertCircle } from 'lucide-react';

interface InscripcionModalProps {
  isOpen: boolean;
  onClose: () => void;
  taller: Taller | null;
  onSuccess?: () => void;
}

export const InscripcionModal: React.FC<InscripcionModalProps> = ({
  isOpen,
  onClose,
  taller,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    dni: '',
    telefono: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !taller) return null;

  const espacio: EspacioFisico | undefined = ESPACIOS_BARILOCHE.find(e => e.id === taller.espacioId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.nombre.trim() || !formData.email.trim() || !formData.dni.trim()) {
      setErrorMsg('Por favor completa todos los campos requeridos.');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiService.createInscripcion({
        tallerId: taller.id,
        tallerTitulo: taller.title,
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        dni: formData.dni.trim(),
        telefono: formData.telefono.trim()
      });

      recordWorkshopEnrollment(taller.id);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch {
      setErrorMsg('Ocurrió un error al procesar tu inscripción. Por favor intentá nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
              Inscripción a Taller Gratuito
            </span>
            <h3 className="text-base font-bold text-white truncate max-w-md">
              {taller.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                ¡Inscripción Confirmada!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mb-4">
                Tu cupo para <strong>"{taller.title}"</strong> ha sido reservado. Te enviamos la confirmación a <strong>{formData.email}</strong>.
              </p>

              {espacio && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 text-left mb-6 max-w-sm mx-auto">
                  <div className="font-bold text-slate-900 mb-1">Recordatorio de Sede:</div>
                  <div className="flex items-center gap-1.5 text-slate-600 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{espacio.nombre} — {espacio.direccion}</span>
                  </div>
                  <div className="text-emerald-700 font-medium">
                    Colectivos: {espacio.lineasColectivo.join(', ')}
                  </div>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Cerrar y Volver a los Talleres
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Resumen del Taller */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                {espacio && (
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span><strong>Sede:</strong> {espacio.nombre} ({espacio.direccion})</span>
                  </div>
                )}
                {taller.spots && (
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <Users className="w-3.5 h-3.5 shrink-0" />
                    <span>{taller.spots}</span>
                  </div>
                )}
                {taller.closingDateFormatted && (
                  <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>Cierre de inscripción: {taller.closingDateFormatted}</span>
                  </div>
                )}
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Campos de entrada */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ej: Martín Rodríguez"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    DNI / Documento *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.dni}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                    placeholder="Ej: 41234567"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Teléfono / WhatsApp (para avisos)
                </label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  placeholder="Ej: +54 294 4..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Procesando...' : 'Confirmar Pre-Inscripción Gratuita'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
