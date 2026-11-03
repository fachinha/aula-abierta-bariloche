import React from 'react';
import { BookOpen, MapPin, Heart } from 'lucide-react';
import { YoutubeIcon } from '../common/YoutubeIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Presentación */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Aula Abierta Bariloche
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-4 max-w-md leading-relaxed">
              Plataforma comunitaria de acceso libre al conocimiento, apoyo pedagógico por ciclos escolares y capacitaciones de oficios prácticos para la inserción laboral en San Carlos de Bariloche y la región patagónica.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 p-3 rounded-lg border border-slate-700/60 max-w-md">
              <YoutubeIcon className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                <strong>Compromiso con Creadores:</strong> Fomentamos el respeto al trabajo de cada docente. Todo el contenido redirige y acredita a los canales originales de YouTube.
              </span>
            </div>
          </div>

          {/* Columna 2: Pilares Educativos */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 tracking-wide uppercase">
              Pilares
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <span className="text-blue-400 font-medium">Primaria:</span> 1° a 7° Grado por ciclos
              </li>
              <li>
                <span className="text-blue-400 font-medium">Secundaria:</span> Ciclo Básico y Orientado
              </li>
              <li>
                <span className="text-blue-400 font-medium">Universidad:</span> Exactas, Salud y Económicas
              </li>
              <li>
                <span className="text-emerald-400 font-medium">Oficios y Laboral:</span> Barista, Mozo, Electricidad
              </li>
              <li>
                <span className="text-amber-400 font-medium">Talleres Presenciales:</span> FabLab, La Llave
              </li>
            </ul>
          </div>

          {/* Columna 3: Espacios Físicos en Bariloche */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 tracking-wide uppercase flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Sedes en Bariloche</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• FabLab Bariloche (Juramento 102)</li>
              <li>• Escuela de Arte La Llave (Onelli y Sobral)</li>
              <li>• Sala Frey (Centro Cívico)</li>
              <li>• Escuela Comunitaria de Gastronomía (Ñireco)</li>
              <li>• Sede Andina UNRN (Anasagasti 1463)</li>
              <li>• CRUB UNCo (Quintral 1250)</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Desarrollado como Proyecto Integrador (TPI Programación 3) — Bariloche, Río Negro, Argentina.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para la comunidad patagónica</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
