import { useEffect } from 'react'
import Hero from '../components/Hero'

function InicioPage() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="h-[calc(100vh-5rem)]">
      <Hero />
    </div>
  )
}

export default InicioPage