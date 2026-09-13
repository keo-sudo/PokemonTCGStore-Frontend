import { useCarrito } from '../context/CarritoContext'

function CardItem({ carta }) {
  const { agregarAlCarrito } = useCarrito()

  return (
    <div className="group relative rounded-2xl bg-surface-container border border-surface-variant overflow-hidden hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(246,190,57,0.15)] hover:-translate-y-1">
      
      {/* IMAGEN DE LA CARTA */}
      <div className="relative aspect-3/4 bg-surface-container-lowest flex items-center justify-center overflow-hidden">
        <img 
          src={carta.imagenUrl} 
          alt={carta.nombre}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-background/80 backdrop-blur border border-outline-variant text-primary uppercase tracking-wide">
          {carta.rareza}
        </span>
      </div>

      {/* INFO DE LA CARTA */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-parchment-light text-sm leading-tight">
            {carta.nombre}
          </h3>
        </div>
        <p className="text-[11px] font-mono text-cardboard-kraft uppercase tracking-wide">
          {carta.setNombre} · {carta.tipo}
        </p>

        <div className="flex items-center justify-between mt-2 pt-3 border-t border-surface-variant">
          <span className="font-display font-black text-primary text-lg">
            $ {carta.precio.toFixed(2)}
          </span>
          <button 
            onClick={() => agregarAlCarrito(carta)}
            className="w-9 h-9 rounded-full bg-primary text-aged-leather flex items-center justify-center hover:bg-gold-antique hover:scale-110 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardItem