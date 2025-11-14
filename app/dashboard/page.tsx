'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Activity, Heart, BookOpen, Camera, Award, TrendingUp, Target, Dog } from 'lucide-react'
import { useEffect, useState, useCallback, useRef } from 'react'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [tasks, setTasks] = useState<any[]>([])
  const [stats, setStats] = useState({
    walks: 0,
    minutes: 0,
    posts: 0,
    lessons: 0,
  })
  const [loading, setLoading] = useState(true)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [levelUpData, setLevelUpData] = useState({ newLevel: 1 })
  const hasLoadedRef = useRef(false)

  const loadData = useCallback(async (skipSessionUpdate = false) => {
    try {
      // Cargar tareas
      const tasksRes = await fetch('/api/tasks')
      if (tasksRes.ok) {
        const tasksData = await tasksRes.json()
        setTasks(tasksData.tasks || [])
      }

      // Cargar estadísticas
      const statsRes = await fetch('/api/stats')
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData.stats || {})
      }

      // Solo actualizar sesión si se solicita explícitamente
      if (skipSessionUpdate === false) {
        await update()
      }
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }, [update])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && !hasLoadedRef.current) {
      hasLoadedRef.current = true
      loadData(true) // No actualizar session en carga inicial
    }
  }, [status, router, loadData])

  const handleCompleteTask = async (task: any) => {
    if (task.completed) return

    // Para tareas automáticas (como pasear), no permitir completar manualmente
    if (task.id === '1' || task.id === '4') {
      return
    }

    try {
      const res = await fetch('/api/tasks/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id, taskXp: task.xp }),
      })

      if (res.ok) {
        const data = await res.json()
        
        // Marcar tarea como completada localmente
        setTasks(tasks.map(t => 
          t.id === task.id ? { ...t, completed: true, progress: 100 } : t
        ))

        toast.success(`¡Tarea completada! +${task.xp} XP`)

        // Mostrar animación de nivel si subió
        if (data.leveledUp) {
          setLevelUpData({ newLevel: data.newLevel })
          setShowLevelUp(true)
          setTimeout(() => setShowLevelUp(false), 3000)
        }

        // Actualizar session para reflejar nuevo XP
        await update()
      }
    } catch (error) {
      console.error('Error completando tarea:', error)
      toast.error('Error al completar tarea')
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!session?.user?.dog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Dog className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">No se encontró perfil de perro</p>
        </div>
      </div>
    )
  }

  const dog = session.user.dog
  const levelProgress = ((dog.xp % 100) / 100) * 100

  return (
    <div className="min-h-screen bg-animated p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header con info del perro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-6"
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="avatar-ring">
              <img
                src={dog.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${dog.name}`}
                alt={dog.name}
                className="w-20 h-20 rounded-full"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gradient mb-2">{dog.name}</h1>
              <p className="text-gray-600 mb-3">{dog.breed}</p>
              
              {/* Barra de XP */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">Nivel {dog.level}</span>
                  <span className="text-gray-600">{dog.xp} XP</span>
                </div>
                <div className="progress-bar-animated">
                  <div
                    className="progress-fill-animated"
                    style={{ width: `${levelProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Level Badge */}
            <div className="badge-3d text-2xl px-4 py-2">
              Lv.{dog.level}
            </div>
          </div>
        </motion.div>

        {/* Acciones rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAction
            icon={<Activity size={32} />}
            label="Pasear"
            color="blue"
            onClick={() => router.push('/dashboard/walk')}
          />
          <QuickAction
            icon={<Heart size={32} />}
            label="Salud"
            color="red"
            onClick={() => router.push('/dashboard/health')}
          />
          <QuickAction
            icon={<BookOpen size={32} />}
            label="Cursos"
            color="purple"
            onClick={() => router.push('/dashboard/courses')}
          />
          <QuickAction
            icon={<Camera size={32} />}
            label="Social"
            color="green"
            onClick={() => router.push('/dashboard/social')}
          />
        </div>

        {/* Tareas de hoy */}
        <div className="card-glass p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="text-primary-600" />
            Tareas de Hoy
          </h2>
          
          {loading ? (
            <div className="text-center py-8 text-gray-500">Cargando tareas...</div>
          ) : (
            <div className="space-y-3">
              {tasks.filter(t => t.type === 'DAILY').map(task => (
                <TaskItem 
                  key={task.id}
                  title={task.title}
                  reward={task.xp}
                  completed={task.completed}
                  progress={task.progress}
                  current={task.current}
                  target={task.target}
                  onClick={() => handleCompleteTask(task)}
                  isAutomatic={task.id === '1'}
                />
              ))}
            </div>
          )}
        </div>

        {/* Estadísticas */}
        <div className="card-glass p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="text-primary-600" />
            Esta Semana
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value={stats.walks} label="Paseos" color="blue" icon="🦴" />
            <StatCard value={stats.minutes} label="Minutos" color="purple" icon="⏱️" />
            <StatCard value={stats.posts} label="Posts" color="green" icon="📷" />
            <StatCard value={stats.lessons} label="Lecciones" color="yellow" icon="📚" />
          </div>
        </div>

        {/* Botón de logros */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/dashboard/achievements')}
          className="card-glow w-full p-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Award size={32} className="text-accent-600" />
            <div className="text-left">
              <p className="font-bold text-lg">Mis Logros</p>
              <p className="text-sm text-gray-600">Ver medallas y progreso</p>
            </div>
          </div>
          <span className="text-4xl">🏆</span>
        </motion.button>

        {/* Animación de Level Up */}
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-yellow-500/90 to-orange-500/90 flex items-center justify-center z-50"
          >
            <div className="text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="text-8xl mb-6"
              >
                🎉
              </motion.div>
              <h2 className="text-6xl font-bold mb-4">¡NIVEL {levelUpData.newLevel}!</h2>
              <p className="text-2xl">¡Felicidades por tu progreso!</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function QuickAction({ icon, label, color, onClick }: any) {
  const colorClasses: any = {
    blue: 'from-blue-50 to-blue-100 text-blue-600',
    red: 'from-red-50 to-red-100 text-red-600',
    purple: 'from-purple-50 to-purple-100 text-purple-600',
    green: 'from-green-50 to-green-100 text-green-600',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`card-glass p-6 flex flex-col items-center gap-3 bg-gradient-to-br ${colorClasses[color]}`}
    >
      {icon}
      <span className="font-semibold">{label}</span>
    </motion.button>
  )
}

function TaskItem({ title, reward, completed, progress, current, target, onClick, isAutomatic }: any) {
  return (
    <motion.div
      whileHover={!completed && !isAutomatic ? { scale: 1.02 } : {}}
      whileTap={!completed && !isAutomatic ? { scale: 0.98 } : {}}
      onClick={!completed && !isAutomatic ? onClick : undefined}
      className={`p-4 rounded-xl transition-all ${
        completed 
          ? 'bg-green-50 border-2 border-green-200' 
          : isAutomatic
          ? 'bg-white/50'
          : 'bg-white/50 hover:bg-white/70 cursor-pointer hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
        }`}>
          {completed && <span className="text-white text-xs">✓</span>}
        </div>
        <div className="flex-1">
          <p className={`font-medium ${completed ? 'line-through text-gray-500' : ''}`}>
            {title}
            {isAutomatic && !completed && <span className="text-xs text-gray-500 ml-2">(automático)</span>}
          </p>
          {!completed && !isAutomatic && (
            <p className="text-xs text-gray-500">Toca para completar</p>
          )}
        </div>
        <span className="badge-3d text-xs">+{reward} XP</span>
      </div>
      
      {!completed && progress > 0 && (
        <div className="ml-9">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>{current} / {target}</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar-animated">
            <div 
              className="progress-fill-animated" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {completed && (
        <div className="ml-9 text-xs text-green-600 font-medium">
          ✓ Completado
        </div>
      )}
    </motion.div>
  )
}

function StatCard({ value, label, color, icon }: any) {
  const colorClasses: any = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  }

  return (
    <div className={`p-4 rounded-xl text-center ${colorClasses[color]}`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm mt-1 opacity-80">{label}</div>
    </div>
  )
}

