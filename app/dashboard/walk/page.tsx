'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Play, Square, Clock, MapPin } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function WalkPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isWalking, setIsWalking] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentWalkId, setCurrentWalkId] = useState<string | null>(null)
  const [recentWalks, setRecentWalks] = useState<any[]>([])

  useEffect(() => {
    loadRecentWalks()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isWalking) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isWalking])

  const loadRecentWalks = async () => {
    try {
      const res = await fetch('/api/walks')
      if (res.ok) {
        const data = await res.json()
        setRecentWalks(data.walks || [])
      }
    } catch (error) {
      console.error('Error cargando paseos:', error)
    }
  }

  const startWalk = async () => {
    if (!session?.user?.dog?.id) return

    try {
      const res = await fetch('/api/walks/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dogId: session.user.dog.id }),
      })

      if (res.ok) {
        const data = await res.json()
        setIsWalking(true)
        setCurrentWalkId(data.walkId)
        setElapsedTime(0)
        toast.success(`¡Paseo iniciado con ${session.user.dog.name}!`)
      }
    } catch (error) {
      toast.error('Error al iniciar paseo')
    }
  }

  const endWalk = async () => {
    if (!currentWalkId) return

    try {
      const res = await fetch('/api/walks/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          walkId: currentWalkId,
          duration: Math.floor(elapsedTime / 60),
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setIsWalking(false)
        setCurrentWalkId(null)
        
        // Mostrar resultados
        let message = `¡Paseo completado! +${data.xpEarned} XP`
        
        if (data.tasksCompleted && data.tasksCompleted.length > 0) {
          message += `\n✅ Tareas completadas: ${data.tasksCompleted.join(', ')}`
        }
        
        if (data.leveledUp) {
          message += `\n🎉 ¡Nivel ${data.newLevel}!`
        }
        
        toast.success(message, { duration: 4000 })
        
        loadRecentWalks()
        setTimeout(() => router.push('/dashboard'), 2000)
      }
    } catch (error) {
      toast.error('Error al finalizar paseo')
    }
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 pb-24">
      <div className="max-w-md mx-auto pt-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gradient mb-2">
            {isWalking ? '🏃 Paseando' : '🐕 Paseo'}
          </h1>
          <p className="text-gray-600">
            {isWalking ? `Con ${session?.user?.dog?.name}` : 'Comienza un paseo'}
          </p>
        </div>

        {/* Timer */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="card-glass text-center py-12"
        >
          <div className="text-7xl font-bold text-blue-600 mb-6 font-mono">
            {formatTime(elapsedTime)}
          </div>
          
          {isWalking ? (
            <button
              onClick={endWalk}
              className="btn-uiverse btn-lg px-8 py-4"
            >
              <span className="flex items-center gap-2">
                <Square size={24} />
                Finalizar Paseo
              </span>
            </button>
          ) : (
            <button
              onClick={startWalk}
              className="btn-uiverse btn-lg px-8 py-4 pulse-glow"
            >
              <span className="flex items-center gap-2">
                <Play size={24} />
                Iniciar Paseo
              </span>
            </button>
          )}
        </motion.div>

        {/* Info durante paseo */}
        {isWalking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-glow text-center"
          >
            <div className="text-5xl mb-4 animate-bounce">🦴</div>
            <p className="font-bold text-lg mb-2">¡Sigue así!</p>
            <p className="text-sm text-gray-600">
              Cada minuto cuenta para {session?.user?.dog?.name}
            </p>
          </motion.div>
        )}

        {/* Paseos recientes */}
        {!isWalking && recentWalks.length > 0 && (
          <div className="card-glass p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Clock className="text-primary-600" size={20} />
              Paseos Recientes
            </h3>
            <div className="space-y-3">
              {recentWalks.slice(0, 5).map((walk, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{walk.duration} min</p>
                      <p className="text-sm text-gray-600">
                        {new Date(walk.createdAt).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                  {walk.distance && (
                    <span className="text-sm text-gray-600">{walk.distance} km</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        {!isWalking && (
          <div className="card-glass p-4 bg-accent-50">
            <h4 className="font-semibold mb-2">💡 Consejos</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Lleva siempre agua</li>
              <li>• Usa correa de seguridad</li>
              <li>• Recoge los desechos</li>
              <li>• Disfruta el momento</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

