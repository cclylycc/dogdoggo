'use client'

import { useState } from 'react'
import { Camera, Plus, Heart, MessageCircle, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

const mockPosts = [
  {
    id: '1',
    dogName: 'Luna',
    dogBreed: 'Golden Retriever',
    level: 5,
    content: '¡Primer día en el parque! 🌳 #primerPaseo #feliz',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500',
    likes: 24,
    comments: 5,
    timeAgo: 'Hace 2 horas',
  },
  {
    id: '2',
    dogName: 'Max',
    dogBreed: 'Border Collie',
    level: 7,
    content: 'Aprendiendo nuevos trucos hoy! 🎾 #entrenamiento #inteligente',
    image: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=500',
    likes: 42,
    comments: 8,
    timeAgo: 'Hace 5 horas',
  },
  {
    id: '3',
    dogName: 'Rocky',
    dogBreed: 'Labrador',
    level: 4,
    content: '¡Nueva amistad hecha hoy! 🐕‍🦺 #amigos #socialización',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500',
    likes: 31,
    comments: 3,
    timeAgo: 'Hace 1 día',
  },
]

export default function SocialPage() {
  const { data: session } = useSession()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newPost, setNewPost] = useState('')
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())

  const handleLike = (postId: string) => {
    const newLiked = new Set(likedPosts)
    if (newLiked.has(postId)) {
      newLiked.delete(postId)
    } else {
      newLiked.add(postId)
    }
    setLikedPosts(newLiked)
  }

  const handlePost = () => {
    if (!newPost.trim()) {
      toast.error('Escribe algo primero')
      return
    }
    toast.success('¡Publicado!')
    setNewPost('')
    setShowCreateModal(false)
  }

  return (
    <div className="min-h-screen bg-animated p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gradient">Círculo Social 📷</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-uiverse"
          >
            <span className="flex items-center gap-2">
              <Plus size={20} />
              Publicar
            </span>
          </button>
        </div>

        {/* Create post quick */}
        <div className="card-glass p-4 mb-6 flex items-center gap-3">
          <div className="avatar-ring">
            <img
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${session?.user?.dog?.name}`}
              alt="Avatar"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex-1 text-left text-gray-500 px-4 py-3 bg-white/50 rounded-xl hover:bg-white/70 transition-all"
          >
            ¿Qué está haciendo tu perro?
          </button>
        </div>
        
        {/* Posts Feed */}
        <div className="space-y-4">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-glass p-6"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="avatar-ring">
                  <img
                    src={`https://api.dicebear.com/7.x/bottts/svg?seed=${post.dogName}`}
                    alt={post.dogName}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold">{post.dogName}</p>
                  <p className="text-sm text-gray-500">{post.dogBreed} • {post.timeAgo}</p>
                </div>
                <span className="badge-3d text-xs">Lv.{post.level}</span>
              </div>

              {/* Content */}
              <p className="mb-4">{post.content}</p>

              {/* Image */}
              <img
                src={post.image}
                alt="Post"
                className="w-full h-64 object-cover rounded-xl mb-4"
              />

              {/* Actions */}
              <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-600'
                  }`}
                >
                  <Heart size={20} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
                  <span className="text-sm font-medium">
                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                  </span>
                </button>

                <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                  <MessageCircle size={20} />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>

                <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 ml-auto">
                  <Share2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Post Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-glass p-6 w-full max-w-lg"
            >
              <h3 className="text-xl font-bold mb-4">Nueva Publicación</h3>
              
              <div className="flex gap-3 mb-4">
                <div className="avatar-ring">
                  <img
                    src={`https://api.dicebear.com/7.x/bottts/svg?seed=${session?.user?.dog?.name}`}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">{session?.user?.dog?.name}</p>
                  <p className="text-sm text-gray-500">Nivel {session?.user?.dog?.level}</p>
                </div>
              </div>

              <textarea
                className="input-modern min-h-32 mb-4"
                placeholder="¿Qué está haciendo tu perro? Usa #hashtags"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                autoFocus
              />

              <div className="text-sm text-gray-500 mb-4">
                💡 Usa hashtags como #paseo #parque #amigos
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePost}
                  className="btn-uiverse flex-1"
                >
                  <span>Publicar</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

