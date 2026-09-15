import { useState } from 'react'
import { API_URL } from '../config'

function LoginModal({ onClose, onLoginSuccess }) {
  const [modoRegistro, setModoRegistro] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      if (modoRegistro) {
        const res = await fetch(`${API_URL}/api/Usuarios/registro`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombreUsuario, email, password })
        })

        if (!res.ok) {
          const errorMsg = await res.text()
          throw new Error(errorMsg || 'Error al registrarse')
        }

        setModoRegistro(false)
        setError('')
        alert('¡Cuenta creada! Ahora inicia sesión.')
      } else {
        const res = await fetch(`${API_URL}/api/Usuarios/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })

        if (!res.ok) {
          throw new Error('Email o contraseña incorrectos')
        }

        const data = await res.json()
        onLoginSuccess(data)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-surface-container border border-surface-variant rounded-2xl p-6 relative">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        <h2 className="font-display font-black text-2xl text-parchment-light mb-1">
          {modoRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
        </h2>
        <p className="text-xs text-cardboard-kraft font-mono mb-6">
          {modoRegistro ? 'Únete a la colección' : 'Accede a tu cuenta'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {modoRegistro && (
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
              className="px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-surface-variant text-parchment-light text-sm placeholder:text-cardboard-kraft focus:outline-none focus:border-primary/60"
            />
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-surface-variant text-parchment-light text-sm placeholder:text-cardboard-kraft focus:outline-none focus:border-primary/60"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-surface-variant text-parchment-light text-sm placeholder:text-cardboard-kraft focus:outline-none focus:border-primary/60"
          />

          {error && (
            <p className="text-xs text-energy-fire font-mono">{error}</p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="mt-2 py-2.5 rounded-xl bg-primary text-aged-leather font-display font-bold text-sm hover:bg-gold-antique transition-colors disabled:opacity-50"
          >
            {cargando ? 'Espera...' : (modoRegistro ? 'Crear cuenta' : 'Ingresar')}
          </button>
        </form>

        <p className="text-xs text-center text-cardboard-kraft font-mono mt-4">
          {modoRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button
            onClick={() => { setModoRegistro(!modoRegistro); setError('') }}
            className="text-primary font-bold hover:underline"
          >
            {modoRegistro ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginModal