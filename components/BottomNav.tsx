'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Home, MapPin, Users, BookOpen, User } from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Inicio', icon: Home },
  { path: '/dashboard/nearby', label: 'Cerca', icon: MapPin },
  { path: '/dashboard/social', label: 'Social', icon: Users },
  { path: '/dashboard/courses', label: 'Cursos', icon: BookOpen },
  { path: '/dashboard/profile', label: 'Perfil', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-5 gap-1 py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`flex flex-col items-center justify-center py-2 transition-colors ${
                  isActive ? 'text-primary-600' : 'text-gray-600'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

