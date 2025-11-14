'use client'

import { Camera, Plus } from 'lucide-react'

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-animated p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gradient">Círculo Social 📷</h1>
          <button className="btn-uiverse">
            <span className="flex items-center gap-2">
              <Plus size={20} />
              Publicar
            </span>
          </button>
        </div>
        
        <div className="card-glass p-12 text-center">
          <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">Feed de publicaciones</p>
          <p className="text-sm text-gray-500">Próximamente disponible</p>
        </div>
      </div>
    </div>
  )
}

