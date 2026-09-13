import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext()

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([])

  const agregarAlCarrito = (carta) => {
    setItems(prev => {
      const existente = prev.find(item => item.carta.id === carta.id)
      if (existente) {
        return prev.map(item =>
          item.carta.id === carta.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }
      return [...prev, { carta, cantidad: 1 }]
    })
  }

  const quitarDelCarrito = (cartaId) => {
    setItems(prev => prev.filter(item => item.carta.id !== cartaId))
  }

  const cambiarCantidad = (cartaId, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      quitarDelCarrito(cartaId)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.carta.id === cartaId ? { ...item, cantidad: nuevaCantidad } : item
      )
    )
  }

  const vaciarCarrito = () => setItems([])

  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0)
  const totalPrecio = items.reduce((sum, item) => sum + item.cantidad * item.carta.precio, 0)

  return (
    <CarritoContext.Provider value={{
      items,
      agregarAlCarrito,
      quitarDelCarrito,
      cambiarCantidad,
      vaciarCarrito,
      totalItems,
      totalPrecio
    }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  return useContext(CarritoContext)
}