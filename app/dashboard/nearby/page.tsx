'use client'

import { Dog, Sparkles, MapPin, Users, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'
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
  },
]

export default function NearbyPage() {
  const router = useRouter()
  const [addedFriends, setAddedFriends] = useState<Set<string>>(new Set())

  const handleAddFriend = (dogId: string, dogName: string) => {
    setAddedFriends(new Set(addedFriends).add(dogId))
    toast.success(`¡${dogName} agregado como amigo!`)
  }

  return (
    <div className="min-h-screen bg-animated p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gradient mb-6">Perros Cerca 🐕</h1>
        
        {/* Botón de emparejamiento */}
        <button
          onClick={() => router.push('/dashboard/match')}
          className="card-glow w-full p-6 mb-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Sparkles size={32} className="text-accent-600" />
            <div className="text-left">
              <p className="font-bold text-lg">Emparejamiento Inteligente</p>
              <p className="text-sm text-gray-600">Encuentra el compañero perfecto</p>
            </div>
          </div>
          <span className="text-3xl">✨</span>
        </button>

        {/* Lista de perros */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="text-primary-600" size={20} />
            En tu zona
          </h2>

          {nearbyDogs.map((dog, index) => (
            <motion.div
              key={dog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-glass p-6 hover:scale-105 transition-transform"
            >
              <div className="flex gap-4">
                <div className="avatar-ring">
                  <img
                    src={`https://api.dicebear.com/7.x/bottts/svg?seed=${dog.name}`}
                    alt={dog.name}
                    className="w-20 h-20 rounded-full"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{dog.name}</h3>
                      <p className="text-sm text-gray-600">{dog.breed} • {dog.age} años</p>
                    </div>
                    <span className="badge-3d text-sm">Lv.{dog.level}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {dog.traits.map((trait, idx) => (
                      <span key={idx} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                        {trait}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {dog.distance} km
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {dog.friends} amigos
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 border-2 border-primary-500 text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-all text-sm">
                      Ver Perfil
                    </button>
                    <button
                      onClick={() => handleAddFriend(dog.id, dog.name)}
                      disabled={addedFriends.has(dog.id)}
                      className={`flex-1 px-4 py-2 rounded-xl font-semibold transition-all text-sm flex items-center justify-center gap-2 ${
                        addedFriends.has(dog.id)
                          ? 'bg-gray-200 text-gray-500'
                          : 'btn-uiverse'
                      }`}
                    >
                      <Heart size={16} />
                      {addedFriends.has(dog.id) ? 'Amigos' : 'Agregar'}
                    </button>
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

