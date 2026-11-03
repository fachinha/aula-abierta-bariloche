import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { EspacioFisico } from '../../types';
import { ESPACIOS_BARILOCHE } from '../../data/espaciosBariloche';
import { MapPin, Bus, Phone, X, ExternalLink, Compass } from 'lucide-react';

interface SedeMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEspacio?: (espacioId: string) => void;
}

export const SedeMapModal: React.FC<SedeMapModalProps> = ({ isOpen, onClose, onSelectEspacio }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedEspacio, setSelectedEspacio] = useState<EspacioFisico | null>(ESPACIOS_BARILOCHE[0]);

  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    // Si ya existe instancia, limpiar
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Coordenadas centrales de Bariloche (-41.1335, -71.3102)
    const map = L.map(mapContainerRef.current, {
      center: [-41.138, -71.306],
      zoom: 13,
      zoomControl: true
    });
    mapInstanceRef.current = map;

    // Capa de mosaicos de OpenStreetMap (100% libre)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);

    // Crear marcador con DivIcon personalizado (SVG elegante azul y esmeralda)
    ESPACIOS_BARILOCHE.forEach((espacio) => {
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background: linear-gradient(135deg, #1E40AF, #059669);
            color: white;
            width: 34px;
            height: 34px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid white;
            cursor: pointer;
          ">
            <span style="transform: rotate(45deg); font-size: 14px; font-weight: bold;">📍</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -30]
      });

      const marker = L.marker([espacio.latitud, espacio.longitud], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedEspacio(espacio);
      });

      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4;">
          <strong style="color: #1E40AF; font-size: 14px;">${espacio.nombre}</strong><br/>
          <span style="color: #64748B;">${espacio.direccion} (${espacio.barrio})</span><br/>
          <span style="color: #059669; font-weight: 600;">Colectivos: ${espacio.lineasColectivo.join(', ')}</span>
        </div>
      `);
    });

    // Redimensionar correctamente mapa tras renderizar el modal
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header Modal */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Sedes y Espacios Físicos de Bariloche
              </h3>
              <p className="text-xs text-slate-400">
                Centros comunitarios, laboratorios y aulas donde se dictan talleres presenciales gratuitos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo: Mapa a la izquierda + Panel de Información a la derecha */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Contenedor del Mapa Leaflet */}
          <div className="flex-1 h-64 md:h-full relative bg-slate-100">
            <div ref={mapContainerRef} className="w-full h-full" />
            <div className="absolute top-3 left-3 z-[400] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 shadow-md border border-slate-200 flex items-center gap-1.5">
              <span>💡 Hacé clic en cualquier marcador para ver detalles</span>
            </div>
          </div>

          {/* Panel Lateral con Sedes y Detalles */}
          <div className="w-full md:w-96 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 flex flex-col h-1/2 md:h-full overflow-hidden">
            
            {/* Espacio Seleccionado */}
            {selectedEspacio ? (
              <div className="p-5 overflow-y-auto flex-1">
                {selectedEspacio.imagen && (
                  <img
                    src={selectedEspacio.imagen}
                    alt={selectedEspacio.nombre}
                    className="w-full h-36 object-cover rounded-xl mb-4 shadow-sm border border-slate-200"
                  />
                )}
                <div className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800 mb-2">
                  {selectedEspacio.barrio}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                  {selectedEspacio.nombre}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{selectedEspacio.direccion}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 bg-white p-3 rounded-lg border border-slate-200">
                  {selectedEspacio.descripcion}
                </p>

                {/* Líneas de Colectivo */}
                <div className="mb-4">
                  <h5 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                    <Bus className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cómo llegar en transporte público (Mi Bus):</span>
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEspacio.lineasColectivo.map((linea, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold"
                      >
                        {linea}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contacto */}
                {selectedEspacio.contacto && (
                  <div className="mb-4 text-xs text-slate-600 flex items-start gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{selectedEspacio.contacto}</span>
                  </div>
                )}

                {/* Botón para abrir en Google Maps real si desea navegar */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedEspacio.latitud},${selectedEspacio.longitud}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir ubicación en GPS / Maps</span>
                </a>
              </div>
            ) : (
              <div className="p-6 text-center text-slate-500 text-xs">
                Seleccioná una sede en el mapa para ver información detallada y líneas de colectivo.
              </div>
            )}

            {/* Selector rápido de sedes en la parte inferior */}
            <div className="p-3 bg-white border-t border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5 uppercase">
                Otras Sedes en Bariloche:
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {ESPACIOS_BARILOCHE.map((esp) => (
                  <button
                    key={esp.id}
                    onClick={() => {
                      setSelectedEspacio(esp);
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.setView([esp.latitud, esp.longitud], 15, { animate: true });
                      }
                    }}
                    className={`px-2 py-1 rounded text-[11px] whitespace-nowrap font-medium transition-all cursor-pointer ${
                      selectedEspacio?.id === esp.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {esp.nombre.split('(')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
