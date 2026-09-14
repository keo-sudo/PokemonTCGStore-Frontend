import { useNavigate } from 'react-router-dom'
import heroImg from '../assets/hero-bg.png'

function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative w-full h-full flex items-center overflow-hidden">
      
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/50" />

      <div className="relative max-w-360 mx-auto px-4 md:px-8 w-full">
        <div className="max-w-xl flex flex-col gap-5">
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">
            Base Set · Edición Original
          </span>
          <h1 className="font-display font-black text-4xl md:text-6xl text-parchment-light leading-[0.95]">
            Colecciona la <span className="text-primary">historia</span> del TCG
          </h1>
          <p className="text-on-surface-variant text-sm md:text-base max-w-md">
            Cartas originales del Base Set de 1999, verificadas y listas para sumarse a tu colección.
          </p>
          <button
            onClick={() => navigate('/catalogo')}
            className="mt-2 w-fit px-8 py-3.5 rounded-full bg-primary text-aged-leather font-display font-bold text-sm hover:bg-gold-antique hover:scale-105 transition-all duration-200 shadow-[0_0_25px_rgba(246,190,57,0.3)]"
          >
            Explorar catálogo
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero