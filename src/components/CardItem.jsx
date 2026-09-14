import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'

function CardItem({ carta, onVerDetalle }) {
  const { agregarAlCarrito, cambiarCantidad, items } = useCarrito()
  const [animando, setAnimando] = useState(false)

  const itemEnCarrito = items.find(item => item.carta.id === carta.id)
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0

  const handleAgregar = (e) => {
    e.stopPropagation()
    agregarAlCarrito(carta)
    setAnimando(true)
    setTimeout(() => setAnimando(false), 300)
  }

  const handleQuitar = (e) => {
    e.stopPropagation()
    cambiarCantidad(carta.id, cantidadEnCarrito - 1)
  }

  return (
    <div 
      onClick={() => onVerDetalle(carta)}
      className="group relative rounded-2xl bg-surface-container border border-surface-variant overflow-hidden hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(246,190,57,0.15)] hover:-translate-y-1 cursor-pointer"
    >
      
      {/* IMAGEN DE LA CARTA */}
      <div className="relative aspect-3/4 bg-surface-container-lowest flex items-center justify-center overflow-hidden">
        <img 
          src={carta.imagenUrl} 
          alt={carta.nombre}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* INFO DE LA CARTA */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-display font-bold text-parchment-light text-sm leading-tight">
          {carta.nombre}
        </h3>

        <div className="flex items-center justify-between mt-2 pt-3 border-t border-surface-variant">
          <span className="font-display font-black text-primary text-lg">
            $ {carta.precio.toFixed(2)}
          </span>

          {cantidadEnCarrito > 0 ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleQuitar}
                className="w-8 h-8 rounded-full bg-surface-container-high border border-surface-variant flex items-center justify-center text-parchment-light hover:border-primary hover:text-primary transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14"/>
                </svg>
              </button>
              <span className="w-6 text-center font-display font-bold text-parchment-light text-sm">
                {cantidadEnCarrito}
              </span>
              <button 
                onClick={handleAgregar}
                className={`w-8 h-8 rounded-full bg-primary text-aged-leather flex items-center justify-center hover:bg-gold-antique transition-all duration-200 ${animando ? 'scale-125' : 'hover:scale-110'}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAgregar}
              className={`w-9 h-9 rounded-full bg-primary text-aged-leather flex items-center justify-center hover:bg-gold-antique transition-all duration-200 ${animando ? 'scale-125' : 'hover:scale-110'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardItem