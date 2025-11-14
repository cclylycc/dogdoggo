'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Activity, Heart, BookOpen, Camera, Award, TrendingUp, Target, Dog } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalWalks: 0,
    coursesCompleted: 0,
    friendsCount: 0,
    achievementsUnlocked: 0,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

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
          
          <div className="space-y-3">
            <TaskItem title="Paseo diario" reward={20} completed={false} />
            <TaskItem title="Registrar peso" reward={5} completed={false} />
            <TaskItem title="Completar lección" reward={15} completed={false} />
          </div>
        </div>

        {/* Estadísticas */}
        <div className="card-glass p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="text-primary-600" />
            Esta Semana
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value={stats.totalWalks} label="Paseos" color="blue" />
            <StatCard value={stats.coursesCompleted} label="Cursos" color="purple" />
            <StatCard value={stats.friendsCount} label="Amigos" color="green" />
            <StatCard value={stats.achievementsUnlocked} label="Logros" color="yellow" />
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

function TaskItem({ title, reward, completed }: any) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-all">
      <div className={`w-6 h-6 rounded-full border-2 ${completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
        {completed && <span className="text-white text-xs">✓</span>}
      </div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
      </div>
      <span className="badge-3d text-xs">+{reward} XP</span>
    </div>
  )
}

function StatCard({ value, label, color }: any) {
  const colorClasses: any = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  }

  return (
    <div className={`p-4 rounded-xl ${colorClasses[color]}`}>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm mt-1 opacity-80">{label}</div>
    </div>
  )
}

