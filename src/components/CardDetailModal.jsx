import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'

function CardDetailModal({ carta, onClose }) {
  const { agregarAlCarrito, cambiarCantidad, items } = useCarrito()
  const [animando, setAnimando] = useState(false)

  const itemEnCarrito = items.find(item => item.carta.id === carta.id)
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0

  const handleAgregar = () => {
    agregarAlCarrito(carta)
    setAnimando(true)
    setTimeout(() => setAnimando(false), 300)
  }

  const handleQuitar = () => {
    cambiarCantidad(carta.id, cantidadEnCarrito - 1)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-surface-container border border-surface-variant rounded-2xl overflow-hidden relative">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-surface-container-high/90 backdrop-blur flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          
          {/* IMAGEN */}
          <div className="bg-surface-container-lowest flex items-center justify-center p-8">
            <img 
              src={carta.imagenUrl} 
              alt={carta.nombre}
              className="w-full max-w-[280px] object-contain"
            />
          </div>

          {/* INFO */}
          <div className="p-6 flex flex-col gap-4">
            <div>
              <span className="text-[10px] font-mono text-cardboard-kraft uppercase tracking-[0.2em]">
                {carta.setNombre}
              </span>
              <h2 className="font-display font-black text-2xl text-parchment-light mt-1">
                {carta.nombre}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase bg-surface-container-high border border-surface-variant text-on-surface-variant">
                {carta.tipo}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase bg-surface-container-high border border-surface-variant text-on-surface-variant">
                {carta.rareza}
              </span>
            </div>

            {carta.descripcion && (
              <p className="text-sm text-on-surface-variant leading-relaxed italic border-l-2 border-primary/30 pl-3">
                {carta.descripcion}
              </p>
            )}

            <p className="text-xs text-cardboard-kraft font-mono">
              Ilustrado por <span className="text-parchment-light">{carta.ilustrador}</span>
            </p>

            <p className="text-[10px] text-cardboard-kraft font-mono opacity-60">
              ID: {carta.pokemonTcgId}
            </p>

            <div className="mt-auto pt-4 border-t border-surface-variant flex items-center justify-between">
              <span className="font-display font-black text-primary text-3xl">
                $ {carta.precio.toFixed(2)}
              </span>

              {cantidadEnCarrito > 0 ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleQuitar}
                    className="w-9 h-9 rounded-full bg-surface-container-high border border-surface-variant flex items-center justify-center text-parchment-light hover:border-primary hover:text-primary transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14"/>
                    </svg>
                  </button>
                  <span className="w-6 text-center font-display font-bold text-parchment-light">
                    {cantidadEnCarrito}
                  </span>
                  <button 
                    onClick={handleAgregar}
                    className={`w-9 h-9 rounded-full bg-primary text-aged-leather flex items-center justify-center hover:bg-gold-antique transition-all duration-200 ${animando ? 'scale-125' : 'hover:scale-110'}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleAgregar}
                  className="px-6 py-3 rounded-full bg-primary text-aged-leather font-display font-bold text-sm hover:bg-gold-antique hover:scale-105 transition-all duration-200"
                >
                  Agregar al carrito
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetailModal