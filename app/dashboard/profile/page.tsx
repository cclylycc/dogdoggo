'use client'

import { useSession, signOut } from 'next-auth/react'
import { LogOut, User as UserIcon, Settings, Award, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session?.user?.dog) {
    return null
  }

  const dog = session.user.dog

  return (
    <div className="min-h-screen bg-animated p-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gradient mb-6">Mi Perfil 👤</h1>

        {/* Perfil del perro */}
        <div className="card-glass p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="avatar-ring">
              <img
                src={dog.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${dog.name}`}
                alt={dog.name}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{dog.name}</h2>
              <p className="text-gray-600">{dog.breed}</p>
              <span className="badge-3d mt-2">Nivel {dog.level}</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p><span className="font-semibold">XP Total:</span> {dog.xp}</p>
            <p><span className="font-semibold">Email:</span> {session.user.email}</p>
          </div>
        </div>

        {/* Opciones */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/dashboard/achievements')}
            className="card-glass w-full p-4 flex items-center justify-between hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-3">
              <Award className="text-accent-600" size={24} />
              <span className="font-medium">Mis Logros</span>
            </div>
            <span>→</span>
          </button>

          <button
            onClick={() => router.push('/dashboard/health')}
            className="card-glass w-full p-4 flex items-center justify-between hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-3">
              <Heart className="text-red-600" size={24} />
              <span className="font-medium">Datos de Salud</span>
            </div>
            <span>→</span>
          </button>

          <button className="card-glass w-full p-4 flex items-center justify-between hover:scale-105 transition-transform">
            <div className="flex items-center gap-3">
              <Settings className="text-gray-600" size={24} />
              <span className="font-medium">Configuración</span>
            </div>
            <span>→</span>
          </button>
        </div>

        {/* Cerrar sesión */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full p-4 rounded-xl border-2 border-red-300 text-red-600 font-semibold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </motion.button>
      </div>
    </div>
  )
}

