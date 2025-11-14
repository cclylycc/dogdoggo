'use client'

import { BookOpen } from 'lucide-react'

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-animated p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gradient mb-6">Cursos 📚</h1>
        
        <div className="card-glass p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Funcionalidad próximamente disponible</p>
        </div>
      </div>
    </div>
  )
}

