import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import LoginModal from './components/LoginModal'
import CarritoPanel from './components/CarritoPanel'
import InicioPage from './pages/InicioPage'
import CatalogoPage from './pages/CatalogoPage'
import MiCuentaPage from './pages/MiCuentaPage'
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

      <Routes>
  <Route path="/" element={<InicioPage />} />
  <Route path="/catalogo" element={<CatalogoPage />} />
  <Route path="/mi-cuenta" element={<MiCuentaPage usuario={usuario} />} />
</Routes>

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