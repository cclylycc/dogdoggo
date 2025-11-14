'use client'

import { BookOpen, Clock, Award, Play, CheckCircle, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'

const courses = [
  {
    id: '1',
    title: 'Comportamiento Canino Básico',
    description: 'Aprende a entender el lenguaje corporal y señales de tu perro',
    category: 'Comportamiento',
    lessons: 5,
    duration: 25,
    xp: 50,
    color: 'blue',
    icon: '🐕',
    progress: 60,
  },
  {
    id: '2',
    title: 'Psicología del Perro',
    description: 'Comprende las necesidades emocionales de tu mascota',
    category: 'Psicología',
    lessons: 4,
    duration: 20,
    xp: 40,
    color: 'purple',
    icon: '🧠',
    progress: 25,
  },
  {
    id: '3',
    title: 'Entrenamiento Básico',
    description: 'Comandos esenciales y técnicas de refuerzo positivo',
    category: 'Entrenamiento',
    lessons: 6,
    duration: 30,
    xp: 60,
    color: 'green',
    icon: '🎯',
    progress: 0,
  },
  {
    id: '4',
    title: 'Socialización Efectiva',
    description: 'Ayuda a tu perro a interactuar mejor con otros',
    category: 'Social',
    lessons: 3,
    duration: 15,
    xp: 30,
    color: 'yellow',
    icon: '👥',
    progress: 100,
  },
]

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null)

  const startLesson = (course: any) => {
    if (course.progress === 100) {
      toast.success('¡Curso ya completado!')
    } else {
      toast.success(`Iniciando: ${course.title}`)
      setSelectedCourse(null)
    }
  }

  return (
    <div className="min-h-screen bg-animated p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gradient mb-6">Cursos 📚</h1>
        
        {/* Filtros */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['Todos', 'Comportamiento', 'Psicología', 'Entrenamiento', 'Social'].map(cat => (
            <button
              key={cat}
              className="px-4 py-2 bg-white/70 rounded-full font-medium text-sm whitespace-nowrap hover:bg-white transition-all"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCourse(course)}
              className="card-glass p-6 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{course.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                    <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                      {course.category}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {course.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={16} />
                  {course.lessons} lecciones
                </span>
                <span className="badge-3d text-xs ml-auto">+{course.xp} XP</span>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progreso</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="progress-bar-animated">
                  <div
                    className="progress-fill-animated"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal de curso */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-glass p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-5xl">{selectedCourse.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
                  <p className="text-gray-600">{selectedCourse.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedCourse.lessons}</div>
                  <div className="text-xs text-gray-600">Lecciones</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedCourse.duration}</div>
                  <div className="text-xs text-gray-600">Minutos</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">+{selectedCourse.xp}</div>
                  <div className="text-xs text-gray-600">XP Total</div>
                </div>
              </div>

              {/* Lecciones */}
              <div className="space-y-3 mb-6">
                <h3 className="font-bold text-lg">Lecciones</h3>
                {Array.from({ length: selectedCourse.lessons }).map((_, idx) => {
                  const lessonProgress = (selectedCourse.progress / 100) * selectedCourse.lessons
                  const isCompleted = idx < lessonProgress
                  const isCurrent = idx === Math.floor(lessonProgress) && selectedCourse.progress < 100
                  const isLocked = idx > Math.floor(lessonProgress)

                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-4 rounded-xl ${
                        isCompleted ? 'bg-green-50' : isCurrent ? 'bg-blue-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500 text-white' :
                        isCurrent ? 'bg-blue-500 text-white' :
                        'bg-gray-300 text-gray-500'
                      }`}>
                        {isCompleted ? <CheckCircle size={20} /> :
                         isCurrent ? <Play size={20} /> :
                         <Lock size={20} />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Lección {idx + 1}</p>
                        <p className="text-sm text-gray-600">
                          {isCompleted ? 'Completada' : isCurrent ? 'En progreso' : 'Bloqueada'}
                        </p>
                      </div>
                      {!isCompleted && <span className="badge-3d text-xs">+10 XP</span>}
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => startLesson(selectedCourse)}
                  className="btn-uiverse flex-1"
                >
                  <span>{selectedCourse.progress === 100 ? 'Completado' : 'Continuar'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

