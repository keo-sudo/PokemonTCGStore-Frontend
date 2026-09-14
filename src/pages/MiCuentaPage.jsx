import { useState, useEffect } from 'react'

function MiCuentaPage({ usuario }) {
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!usuario) {
      setCargando(false)
      return
    }

    const token = localStorage.getItem('token')

    fetch(`https://localhost:7120/api/Pedidos/usuario/${usuario.usuarioId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setPedidos(data)
        setCargando(false)
      })
      .catch(err => {
        console.error('Error al cargar pedidos:', err)
        setCargando(false)
      })
  }, [usuario])

  if (!usuario) {
    return (
      <main className="max-w-360 mx-auto px-4 md:px-8 py-16 text-center">
        <p className="text-cardboard-kraft font-mono">Debes iniciar sesión para ver tu cuenta.</p>
      </main>
    )
  }

  return (
    <main className="max-w-360 mx-auto px-4 md:px-8 py-10">
      <h1 className="font-display font-black text-3xl text-parchment-light mb-8">
        Mi Cuenta
      </h1>

      <div className="bg-surface-container border border-surface-variant rounded-2xl p-6 mb-8 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-aged-leather font-display font-black text-xl">
          {usuario.nombreUsuario.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-display font-bold text-parchment-light text-lg">{usuario.nombreUsuario}</p>
          <p className="text-xs font-mono text-cardboard-kraft">Usuario #{usuario.usuarioId}</p>
        </div>
      </div>

      <h2 className="font-display font-bold text-xl text-parchment-light mb-4">
        Historial de pedidos
      </h2>

      {cargando ? (
        <p className="text-cardboard-kraft font-mono text-sm">Cargando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <p className="text-cardboard-kraft font-mono text-sm">Aún no tienes pedidos.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {pedidos.map(pedido => (
            <div key={pedido.id} className="bg-surface-container border border-surface-variant rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-display font-bold text-parchment-light text-sm">
                  Pedido #{pedido.id}
                </p>
                <p className="text-xs font-mono text-cardboard-kraft">
                  {new Date(pedido.fecha).toLocaleDateString()} · {pedido.detalles?.length || 0} cartas
                </p>
              </div>
              <div className="text-right">
                <p className="font-display font-black text-primary">
                  $ {pedido.total.toFixed(2)}
                </p>
                <span className="text-[10px] font-mono uppercase text-cardboard-kraft">
                  {pedido.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default MiCuentaPage