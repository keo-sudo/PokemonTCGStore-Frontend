import { useState } from 'react'
import Header from './components/Header'
import CardGrid from './components/CardGrid'
import LoginModal from './components/LoginModal'
import CarritoPanel from './components/CarritoPanel'
import { useCarrito } from './context/CarritoContext'
import './App.css'

function App() {
  const [mostrarLogin, setMostrarLogin] = useState(false)
  const [mostrarCarrito, setMostrarCarrito] = useState(false)
  const [usuario, setUsuario] = useState(null)
  const { items, vaciarCarrito } = useCarrito()

  const handleLoginSuccess = (data) => {
    setUsuario(data)
    localStorage.setItem('token', data.token)
    localStorage.setItem('usuarioId', data.usuarioId)
    localStorage.setItem('nombreUsuario', data.nombreUsuario)
    setMostrarLogin(false)
  }

  const handleLogout = () => {
    setUsuario(null)
    localStorage.removeItem('token')
    localStorage.removeItem('usuarioId')
    localStorage.removeItem('nombreUsuario')
  }

  const handleCheckout = async () => {
    if (!usuario) {
      setMostrarCarrito(false)
      setMostrarLogin(true)
      return
    }

    const token = localStorage.getItem('token')
    const usuarioId = localStorage.getItem('usuarioId')

    const pedido = {
      usuarioId: parseInt(usuarioId),
      detalles: items.map(item => ({
        cartaId: item.carta.id,
        cantidad: item.cantidad,
        precioUnitario: item.carta.precio
      }))
    }

    try {
      const res = await fetch('https://localhost:7120/api/Pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pedido)
      })

      if (!res.ok) {
        throw new Error('Error al crear el pedido')
      }

      const data = await res.json()
      alert(`¡Pedido creado! Total: $${data.total.toFixed(2)}`)
      vaciarCarrito()
      setMostrarCarrito(false)
    } catch (err) {
      alert('Hubo un error al procesar tu pedido: ' + err.message)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-surface-container-low via-background to-surface-container-lowest">
      <Header 
        usuario={usuario} 
        onLoginClick={() => setMostrarLogin(true)}
        onLogoutClick={handleLogout}
        onCarritoClick={() => setMostrarCarrito(true)}
      />
      <main className="max-w-360 mx-auto px-4 md:px-8 py-10">
        <CardGrid />
      </main>

      {mostrarLogin && (
        <LoginModal 
          onClose={() => setMostrarLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {mostrarCarrito && (
        <CarritoPanel 
          onClose={() => setMostrarCarrito(false)}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  )
}

export default App