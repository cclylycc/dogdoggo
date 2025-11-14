'use client'

import { Trophy, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

const achievements = [
  {
    id: '1',
    title: 'Primer Paseo',
    description: 'Completa tu primer paseo',
    icon: '🏃',
    unlocked: true,
    tier: 'bronce',
    xp: 10,
  },
  {
    id: '2',
    title: 'Estudiante Aplicado',
    description: 'Completa 5 lecciones',
    icon: '🎓',
    unlocked: true,
    tier: 'plata',
    xp: 25,
  },
  {
    id: '3',
    title: 'Amigo Social',
    description: 'Haz 10 amigos',
    icon: '👥',
    unlocked: false,
    progress: 40,
    tier: 'oro',
    xp: 50,
  },
  {
    id: '4',
    title: 'Atleta Canino',
    description: 'Camina 100 km en total',
    icon: '🏋️',
    unlocked: false,
    progress: 65,
    tier: 'oro',
    xp: 100,
  },
  {
    id: '5',
    title: 'Experto en Perros',
    description: 'Completa todos los cursos',
    icon: '🎯',
    unlocked: false,
    progress: 20,
    tier: 'platino',
    xp: 200,
  },
  {
    id: '6',
    title: 'Estrella de la Comunidad',
    description: 'Recibe 100 me gusta',
    icon: '⭐',
    unlocked: false,
    progress: 15,
    tier: 'platino',
    xp: 150,
  },
]

export default function AchievementsPage() {
  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="card-glass p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="text-6xl">🏆</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gradient mb-2">Mis Logros</h1>
              <p className="text-gray-600">
                {unlockedCount} de {totalCount} desbloqueados
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="progress-bar-animated">
              <div
                className="progress-fill-animated"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Logros */}
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card-glass p-6 ${achievement.unlocked ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''}`}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-lg'
                      : 'bg-gray-200'
                  }`}
                >
                  {achievement.unlocked ? achievement.icon : <Lock size={24} className="text-gray-400" />}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    <span className={`badge-3d text-xs ${achievement.tier === 'platino' ? 'bg-purple-500' : ''}`}>
                      {achievement.tier}
                    </span>
                  </div>

                  {!achievement.unlocked && achievement.progress && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progreso</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <div className="progress-bar-animated">
                        <div
                          className="progress-fill-animated"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    {achievement.unlocked && (
                      <span className="text-xs text-green-600">✓ Desbloqueado</span>
                    )}
                    <span className="badge-3d text-xs ml-auto">+{achievement.xp} XP</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

