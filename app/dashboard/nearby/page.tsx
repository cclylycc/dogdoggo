'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { Heart, X, MapPin, Sparkles, RotateCcw, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const nearbyDogs = [
  {
    id: '1',
    name: 'Luna',
    breed: 'Golden Retriever',
    age: 3,
    level: 5,
    distance: 1.2,
    traits: ['Social', 'Amigable', 'Energético'],
    friends: 12,
    image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600',
    description: '¡Hola! Soy Luna y me encanta jugar en el parque. Busco amigos para pasear juntos.'
  },
  {
    id: '2',
    name: 'Max',
    breed: 'Border Collie',
    age: 4,
    level: 7,
    distance: 2.3,
    traits: ['Inteligente', 'Activo', 'Obediente'],
    friends: 18,
    image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=600',
    description: 'Max aquí. Me encanta aprender trucos nuevos y correr. ¿Jugamos?'
  },
  {
    id: '3',
    name: 'Rocky',
    breed: 'Labrador',
    age: 2,
    level: 4,
    distance: 3.1,
    traits: ['Juguetón', 'Cariñoso', 'Leal'],
    friends: 9,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
    description: 'Rocky es mi nombre y jugar es mi juego. ¡Vamos a divertirnos!'
  },
  {
    id: '4',
    name: 'Bella',
    breed: 'Beagle',
    age: 5,
    level: 6,
    distance: 1.8,
    traits: ['Curiosa', 'Amistosa', 'Aventurera'],
    friends: 15,
    image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600',
    description: 'Soy Bella y me encanta explorar nuevos lugares. ¿Me acompañas?'
  },
  {
    id: '5',
    name: 'Charlie',
    breed: 'Pug',
    age: 3,
    level: 5,
    distance: 2.0,
    traits: ['Divertido', 'Sociable', 'Cariñoso'],
    friends: 20,
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600',
    description: 'Charlie aquí. Pequeño pero con gran personalidad. ¡Seamos amigos!'
  },
]

export default function NearbyPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState<string[]>([])
  const [showMatch, setShowMatch] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const currentDog = currentIndex < nearbyDogs.length ? nearbyDogs[currentIndex] : null

  const handleSwipe = (dir: 'left' | 'right') => {
    if (!currentDog) return

    setDirection(dir)

    if (dir === 'right') {
      // Match!
      setMatches([...matches, currentDog.id])
      setShowMatch(true)
      toast.success(`¡Match con ${currentDog.name}! 💕`, { duration: 2000 })
      
      setTimeout(() => {
        setShowMatch(false)
        setCurrentIndex(currentIndex + 1)
        setDirection(null)
      }, 1500)
    } else {
      // Skip
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1)
        setDirection(null)
      }, 300)
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setMatches([])
    setDirection(null)
  }

  if (!currentDog) {
    return (
      <div className="min-h-screen bg-animated flex items-center justify-center p-4 pb-24">
        <div className="card-glass p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">¡Has visto todos los perros!</h2>
          <p className="text-gray-600 mb-6">
            {matches.length > 0 
              ? `Tienes ${matches.length} nuevo${matches.length === 1 ? '' : 's'} match${matches.length === 1 ? '' : 'es'}!`
              : 'No hay más perros cerca por ahora.'
            }
          </p>
          <div className="space-y-3">
            <button
              onClick={handleReset}
              className="btn-uiverse w-full"
            >
              <span className="flex items-center justify-center gap-2">
                <RotateCcw size={20} />
                Ver de Nuevo
              </span>
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-animated p-4 pb-24">
      <div className="max-w-md mx-auto pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gradient">Cerca de Ti 🐕</h1>
          <button
            onClick={() => router.push('/dashboard/match')}
            className="btn-uiverse btn-sm"
          >
            <span className="flex items-center gap-1 text-sm">
              <Sparkles size={16} />
              Match Test
            </span>
          </button>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{currentIndex + 1} / {nearbyDogs.length}</span>
            <span>{matches.length} matches</span>
          </div>
          <div className="progress-bar-animated">
            <div
              className="progress-fill-animated"
              style={{ width: `${((currentIndex + 1) / nearbyDogs.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Card Stack */}
        <div className="relative h-[600px] mb-6">
          {/* Siguiente carta (fondo) */}
          {currentIndex + 1 < nearbyDogs.length && (
            <div
              className="absolute inset-0 card-glass overflow-hidden"
              style={{ 
                transform: 'scale(0.95) translateY(10px)',
                opacity: 0.5,
                zIndex: 0
              }}
            >
              <div className="relative h-full">
                <img
                  src={nearbyDogs[currentIndex + 1].image}
                  alt={nearbyDogs[currentIndex + 1].name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Carta actual (frente) */}
          <SwipeCard
            dog={currentDog}
            onSwipe={handleSwipe}
            direction={direction}
          />
        </div>

        {/* Botones de acción */}
        <div className="flex justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-gray-200 hover:border-red-500"
          >
            <X size={32} className="text-red-500" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('right')}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-red-500 shadow-lg flex items-center justify-center pulse-glow"
          >
            <Heart size={40} className="text-white" fill="white" />
          </motion.button>
        </div>

        {/* Match Animation */}
        {showMatch && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-pink-500/90 to-purple-500/90 flex items-center justify-center z-50"
          >
            <div className="text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="text-8xl mb-6"
              >
                💕
              </motion.div>
              <h2 className="text-5xl font-bold mb-4">¡Es un Match!</h2>
              <p className="text-2xl">Tú y {currentDog.name}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function SwipeCard({ 
  dog, 
  onSwipe, 
  direction 
}: { 
  dog: any
  onSwipe: (dir: 'left' | 'right') => void
  direction: 'left' | 'right' | null
}) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100
    
    if (Math.abs(info.offset.x) > threshold) {
      onSwipe(info.offset.x > 0 ? 'right' : 'left')
    }
  }

  return (
    <motion.div
      className="absolute inset-0 card-glass overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ 
        x, 
        rotate, 
        opacity,
        zIndex: 1
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={
        direction === 'left' 
          ? { x: -300, opacity: 0 }
          : direction === 'right'
          ? { x: 300, opacity: 0 }
          : { x: 0, opacity: 1 }
      }
      transition={{ duration: 0.3 }}
    >
      {/* Overlay indicators */}
      <motion.div
        className="absolute top-8 left-8 z-10"
        style={{ 
          opacity: useTransform(x, [0, 100], [0, 1]),
          scale: useTransform(x, [0, 100], [0.5, 1])
        }}
      >
        <div className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-2xl border-4 border-white shadow-lg transform rotate-12">
          ¡MATCH!
        </div>
      </motion.div>

      <motion.div
        className="absolute top-8 right-8 z-10"
        style={{ 
          opacity: useTransform(x, [-100, 0], [1, 0]),
          scale: useTransform(x, [-100, 0], [1, 0.5])
        }}
      >
        <div className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-2xl border-4 border-white shadow-lg transform -rotate-12">
          NOPE
        </div>
      </motion.div>

      {/* Dog image */}
      <div className="relative h-2/3">
        <img
          src={dog.image}
          alt={dog.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      </div>

      {/* Dog info */}
      <div className="p-6 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold">
              {dog.name}, {dog.age}
            </h2>
            <span className="badge-3d">Lv.{dog.level}</span>
          </div>
          <p className="text-gray-600 mb-2">{dog.breed}</p>
          <p className="text-sm text-gray-700">{dog.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {dog.traits.map((trait: string, idx: number) => (
            <span
              key={idx}
              className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full font-medium"
            >
              {trait}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin size={16} />
            {dog.distance} km
          </span>
          <span className="flex items-center gap-1">
            <Users size={16} />
            {dog.friends} amigos
          </span>
        </div>
      </div>
    </motion.div>
  )
}
