import { useCarrito } from '../context/CarritoContext'

function CarritoPanel({ onClose, onCheckout }) {
  const { items, quitarDelCarrito, cambiarCantidad, totalPrecio } = useCarrito()

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* FONDO OSCURO */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* PANEL LATERAL */}
      <div className="relative w-full max-w-md h-full bg-surface-container border-l border-surface-variant flex flex-col">
        
        {/* HEADER DEL PANEL */}
        <div className="flex items-center justify-between p-5 border-b border-surface-variant">
          <h2 className="font-display font-black text-xl text-parchment-light">
            Tu carrito
          </h2>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* LISTA DE ITEMS */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {items.length === 0 ? (
            <p className="text-cardboard-kraft font-mono text-sm text-center mt-10">
              Tu carrito está vacío
            </p>
          ) : (
            items.map(item => (
              <div key={item.carta.id} className="flex gap-3 p-3 rounded-xl bg-surface-container-lowest border border-surface-variant">
                <img 
                  src={item.carta.imagenUrl} 
                  alt={item.carta.nombre}
                  className="w-16 h-20 object-contain rounded-lg bg-surface-container"
                />
                <div className="flex-1 flex flex-col gap-1">
                  <h3 className="font-display font-bold text-parchment-light text-sm">
                    {item.carta.nombre}
                  </h3>
                  <span className="text-primary font-bold text-sm">
                    $ {item.carta.precio.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => cambiarCantidad(item.carta.id, item.cantidad - 1)}
                      className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary text-xs"
                    >
                      −
                    </button>
                    <span className="text-parchment-light text-sm font-mono w-4 text-center">
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() => cambiarCantidad(item.carta.id, item.cantidad + 1)}
                      className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => quitarDelCarrito(item.carta.id)}
                  className="text-cardboard-kraft hover:text-energy-fire transition-colors self-start"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER CON TOTAL Y CHECKOUT */}
        {items.length > 0 && (
          <div className="p-5 border-t border-surface-variant flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-on-surface-variant font-mono text-sm">Total</span>
              <span className="text-primary font-display font-black text-2xl">
                $ {totalPrecio.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="py-3 rounded-xl bg-primary text-aged-leather font-display font-bold text-sm hover:bg-gold-antique transition-colors"
            >
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CarritoPanel