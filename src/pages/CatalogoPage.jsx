import { useState } from 'react'
import CardGrid from '../components/CardGrid'
import CardDetailModal from '../components/CardDetailModal'

function CatalogoPage() {
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null)

  return (
    <main className="max-w-360 mx-auto px-4 md:px-8 py-10">
      <CardGrid onVerDetalle={setCartaSeleccionada} />

      {cartaSeleccionada && (
        <CardDetailModal 
          carta={cartaSeleccionada}
          onClose={() => setCartaSeleccionada(null)}
        />
      )}
    </main>
  )
}

export default CatalogoPage