import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

function Header({ usuario, onLoginClick, onLogoutClick, onCarritoClick }) {
  const { totalItems } = useCarrito()

  return (
    <header className="sticky top-0 w-full z-40 bg-background/92 backdrop-blur-xl border-b border-surface-variant">
      <div className="max-w-360 mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* LOGO Y MARCA */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-11 h-11 rounded-xl bg-linear-to-br from-gold-antique via-surface-container to-surface-container-lowest p-0.5 border border-outline-variant group-hover:border-primary transition-all duration-300 shadow-[0_0_20px_rgba(212,160,23,0.2)] flex items-center justify-center">
            <span className="font-display font-black text-primary text-xl">P</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl tracking-tighter text-parchment-light">
                POKEMON TCG
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-container-high border border-primary/40 text-primary font-bold">
                STORE
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-[0.25em] text-cardboard-kraft uppercase">
              Base Set Collection
            </span>
          </div>
        </Link>

        {/* GRUPO DERECHO: NAV + ACCIONES */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-2 font-display font-semibold text-xs tracking-wide">
  <Link to="/catalogo" className="px-4 h-11 rounded-lg bg-surface-container border border-primary/30 flex items-center text-primary shadow-sm hover:bg-surface-container-high hover:border-primary transition-all duration-200">
    CATÁLOGO
  </Link>
  <Link to="/mi-cuenta" className="px-4 h-11 rounded-lg bg-surface-container border border-primary/30 flex items-center text-primary shadow-sm hover:bg-surface-container-high hover:border-primary transition-all duration-200">
  MI CUENTA
</Link>
</nav>

<div className="flex items-center gap-3">
  {usuario ? (
    <button 
      onClick={onLogoutClick}
      className="px-4 h-11 rounded-lg bg-surface-container border border-primary/30 flex items-center gap-2 text-primary shadow-sm hover:bg-surface-container-high hover:border-primary transition-all duration-200"
    >
      <span className="text-xs font-mono font-semibold">{usuario.nombreUsuario}</span>
    </button>
  ) : (
    <button 
      onClick={onLoginClick}
      className="px-5 h-11 rounded-lg bg-surface-container border border-primary/30 flex items-center justify-center text-primary shadow-sm hover:bg-surface-container-high hover:border-primary transition-all duration-200"
    >
      <span className="text-xs font-mono font-semibold">INGRESAR</span>
    </button>
  )}
            <button 
              onClick={onCarritoClick}
              className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-aged-leather hover:bg-gold-antique transition-all duration-200 hover:scale-105 relative shadow-[0_0_15px_rgba(246,190,57,0.3)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-energy-fire text-white text-[10px] font-bold flex items-center justify-center border-2 border-background">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header