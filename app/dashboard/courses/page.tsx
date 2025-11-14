'use client'

import { BookOpen } from 'lucide-react'

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-animated p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gradient mb-6">Cursos 📚</h1>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <CourseCard
            title="Comportamiento Canino"
            lessons={5}
            xp={50}
            color="blue"
          />
          <CourseCard
            title="Psicología del Perro"
            lessons={4}
            xp={40}
            color="purple"
          />
          <CourseCard
            title="Entrenamiento Básico"
            lessons={6}
            xp={60}
            color="green"
          />
          <CourseCard
            title="Socialización"
            lessons={3}
            xp={30}
            color="yellow"
          />
        </div>
      </div>
    </div>
  )
}

function CourseCard({ title, lessons, xp, color }: any) {
  const colorClasses: any = {
    blue: 'from-blue-50 to-blue-100',
    purple: 'from-purple-50 to-purple-100',
    green: 'from-green-50 to-green-100',
    yellow: 'from-yellow-50 to-yellow-100',
  }

  return (
    <div className={`card-glass p-6 bg-gradient-to-br ${colorClasses[color]} hover:scale-105 transition-transform cursor-pointer`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{lessons} lecciones</p>
        </div>
        <span className="badge-3d text-xs">+{xp} XP</span>
      </div>
      <div className="progress-bar-animated">
        <div className="progress-fill-animated" style={{ width: '0%' }} />
      </div>
    </div>
  )
}

