'use client'

import { Dog, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NearbyPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-animated p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gradient mb-6">Perros Cerca 🐕</h1>
        
        <button
          onClick={() => router.push('/dashboard/match')}
          className="btn-uiverse w-full mb-6"
        >
          <span className="flex items-center justify-center gap-2">
            <Sparkles size={20} />
            Emparejamiento Inteligente
          </span>
        </button>

        <div className="card-glass p-12 text-center">
          <Dog className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">Funcionalidad de búsqueda</p>
          <p className="text-sm text-gray-500">Próximamente disponible</p>
        </div>
      </div>
    </div>
  )
}

