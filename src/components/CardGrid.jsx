import { useState, useEffect } from 'react'
import CardItem from './CardItem'
import FilterBar from './FilterBar'

function CardGrid({ onVerDetalle }) {
  const [cartas, setCartas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [filtroTipo, setFiltroTipo] = useState('ALL')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    fetch('https://localhost:7120/api/Cartas')
      .then(res => res.json())
      .then(data => {
        const pokedexOrder = {
          'Bulbasaur': 1, 'Ivysaur': 2, 'Venusaur': 3,
          'Charmander': 4, 'Charmeleon': 5, 'Charizard': 6,
          'Squirtle': 7, 'Wartortle': 8, 'Blastoise': 9,
          'Caterpie': 10, 'Metapod': 11, 'Butterfree': 12,
          'Weedle': 13, 'Kakuna': 14, 'Beedrill': 15,
          'Pidgey': 16, 'Pidgeotto': 17,
          'Rattata': 19, 'Raticate': 20,
          'Arbok': 24,
          'Pikachu': 25, 'Raichu': 26,
          'Sandshrew': 27,
          'Nidoran ♀': 29, 'Nidorina': 30,
          'Nidoran ♂': 32, 'Nidorino': 33, 'Nidoking': 34,
          'Clefairy': 35,
          'Vulpix': 37, 'Ninetales': 38,
          'Wigglytuff': 40,
          'Zubat': 41,
          'Gastly': 92, 'Haunter': 93,
          'Voltorb': 100, 'Electrode': 101,
          'Exeggutor': 103,
          'Cubone': 104, 'Marowak': 105,
          'Hitmonchan': 107,
          'Lickitung': 108,
          'Koffing': 109, 'Weezing': 110,
          'Rhyhorn': 111,
          'Chansey': 113,
          'Kangaskhan': 115,
          'Staryu': 120, 'Starmie': 121,
          'Mr. Mime': 122,
          'Scyther': 123,
          'Jynx': 124,
          'Electabuzz': 125,
          'Magmar': 126,
          'Pinsir': 127,
          'Magikarp': 129, 'Gyarados': 130,
          'Lapras': 131,
          'Ditto': 132,
          'Eevee': 133, 'Vaporeon': 134, 'Jolteon': 135, 'Flareon': 136,
          'Porygon': 137,
          'Snorlax': 143,
          'Articuno': 144, 'Zapdos': 145, 'Moltres': 146,
          'Dratini': 147, 'Dragonair': 148,
          'Mewtwo': 150, 'Mew': 151,
          'Machamp': 68, 'Machop': 66, 'Machoke': 67,
          'Alakazam': 65, 'Abra': 63, 'Kadabra': 64,
          'Poliwrath': 62, 'Poliwag': 60, 'Poliwhirl': 61,
          'Magneton': 82, 'Magnemite': 81,
          'Growlithe': 58, 'Arcanine': 59,
          'Ponyta': 77, 'Rapidash': 78,
          "Farfetch'd": 83,
          'Doduo': 84, 'Dodrio': 85,
          'Seel': 86, 'Dewgong': 87,
          'Grimer': 88, 'Muk': 89,
          'Shellder': 90, 'Cloyster': 91,
          'Onix': 95,
          'Drowzee': 96, 'Hypno': 97,
          'Krabby': 98, 'Kingler': 99,
          'Venonat': 48, 'Venomoth': 49,
          'Diglett': 50, 'Dugtrio': 51,
          'Meowth': 52, 'Persian': 53,
          'Psyduck': 54, 'Golduck': 55,
          'Mankey': 56, 'Primeape': 57,
          'Slowpoke': 79, 'Slowbro': 80,
          'Tangela': 114,
          'Horsea': 116, 'Seadra': 117,
          'Goldeen': 118, 'Seaking': 119,
          'Omanyte': 138, 'Omastar': 139,
          'Kabuto': 140, 'Kabutops': 141,
          'Aerodactyl': 142,
        }

        const ordenadas = [...data].sort((a, b) => {
          const numA = pokedexOrder[a.nombre] || 999
          const numB = pokedexOrder[b.nombre] || 999
          return numA - numB
        })
        setCartas(ordenadas)
        setCargando(false)
      })
      .catch(err => {
        console.error('Error al cargar cartas:', err)
        setCargando(false)
      })
  }, [])

  const cartasFiltradas = cartas.filter(carta => {
    const coincideTipo = filtroTipo === 'ALL' || carta.tipo === filtroTipo
    const coincideBusqueda = carta.nombre.toLowerCase().includes(busqueda.toLowerCase())
    return coincideTipo && coincideBusqueda
  })

  if (cargando) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-cardboard-kraft font-mono text-sm">Cargando cartas...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-black text-2xl text-parchment-light">
          Catálogo Base Set
        </h2>
        <span className="text-xs font-mono text-cardboard-kraft">
          {cartasFiltradas.length} cartas disponibles
        </span>
      </div>

      <FilterBar 
        filtroTipo={filtroTipo} 
        setFiltroTipo={setFiltroTipo}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {cartasFiltradas.map(carta => (
          <CardItem key={carta.id} carta={carta} onVerDetalle={onVerDetalle} />
        ))}
      </div>
    </div>
  )
}

export default CardGrid