import React from 'react';
import { SectionType } from '../../types';
import { BookOpen, Coffee, Hammer, MapPin, User, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HeaderProps {
  activeSection: SectionType;
  onSelectSection: (section: SectionType) => void;
  onOpenMap: () => void;
  onOpenPropuesta: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  onOpenMap,
  onOpenPropuesta,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Banner Informativo Comunitario */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-emerald-800 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/30 text-emerald-100 border border-emerald-400/30">
              Proyecto Universitario & Comunitario
            </span>
            <span className="hidden md:inline text-blue-100/90">
              San Carlos de Bariloche — Plataforma libre y gratuita de saberes
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPropuesta}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-200 hover:text-white transition-colors underline-offset-2 hover:underline cursor-pointer"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Postulá tu curso o taller</span>
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={onOpenMap}
              className="inline-flex items-center gap-1 text-xs text-blue-200 hover:text-white transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Sedes Bariloche</span>
            </button>
          </div>
        </div>
      </div>

      {/* Barra Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Identidad de Marca */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onSelectSection('cursos')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  Aula Abierta
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                  Bariloche
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Cursos Escolares, Oficios y Talleres Comunitarios
              </p>
            </div>
          </button>
        </div>

        {/* Buscador Rápido */}
        <div className="flex-1 max-w-md mx-0 md:mx-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar materia, oficio (barista, mozo, python) o taller..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all shadow-inner"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Navegación por Secciones y Acciones */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => onSelectSection('cursos')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'cursos'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Cursos</span>
          </button>

          <button
            onClick={() => onSelectSection('capacitaciones')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'capacitaciones'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>Capacitaciones</span>
          </button>

          <button
            onClick={() => onSelectSection('talleres')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'talleres'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Hammer className="w-4 h-4" />
            <span>Talleres</span>
          </button>

          <div className="h-5 w-px bg-slate-200 mx-1"></div>

          <button
            onClick={() => onSelectSection('perfil')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'perfil'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'
                : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Mi Perfil</span>
          </button>

          <button
            onClick={() => onSelectSection('admin')}
            title="Panel de Administración"
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center transition-all cursor-pointer ${
              activeSection === 'admin'
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </header>
  );
};
