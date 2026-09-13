import { useState } from 'react'

const tipos = [
  { nombre: 'Todos', valor: 'ALL' },
  { nombre: 'Fuego', valor: 'Fire' },
  { nombre: 'Agua', valor: 'Water' },
  { nombre: 'Planta', valor: 'Grass' },
  { nombre: 'Rayo', valor: 'Lightning' },
  { nombre: 'Psíquico', valor: 'Psychic' },
  { nombre: 'Lucha', valor: 'Fighting' },
  { nombre: 'Normal', valor: 'Colorless' },
]

function FilterBar({ filtroTipo, setFiltroTipo, busqueda, setBusqueda }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mb-8 p-4 rounded-2xl bg-surface-container border border-surface-variant">
      
      {/* FILTROS POR TIPO */}
      <div className="flex flex-wrap gap-2">
        {tipos.map(tipo => (
          <button
            key={tipo.valor}
            onClick={() => setFiltroTipo(tipo.valor)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wide transition-all duration-200 ${
              filtroTipo === tipo.valor
                ? 'bg-primary text-aged-leather shadow-[0_0_15px_rgba(246,190,57,0.3)]'
                : 'bg-surface-container-high text-on-surface-variant hover:text-parchment-light border border-surface-variant'
            }`}
          >
            {tipo.nombre}
          </button>
        ))}
      </div>

      {/* BUSCADOR */}
      <div className="relative w-full md:w-64">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cardboard-kraft" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-full bg-surface-container-lowest border border-surface-variant text-parchment-light text-sm placeholder:text-cardboard-kraft focus:outline-none focus:border-primary/60 transition-colors"
        />
      </div>
    </div>
  )
}

export default FilterBar