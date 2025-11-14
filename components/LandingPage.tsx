'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Dog, Heart, Award, Users, TrendingUp, Sparkles } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-animated">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/70 border-b border-white/20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dog className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-gradient">DogDogGo</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link href="/register">
              <button className="btn-uiverse">
                <span>Registrarse</span>
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-6">
              <span className="badge-3d text-lg px-6 py-2">
                🐕 Red Social para Perros
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gradient leading-tight">
              Conecta. Juega. Crece.
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              La primera plataforma gamificada donde tu perro es el protagonista.
              Encuentra amigos, aprende y disfruta cada paseo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <button className="btn-uiverse text-lg px-8 py-4">
                  <span className="flex items-center gap-2">
                    <Sparkles size={20} />
                    Comenzar Gratis
                  </span>
                </button>
              </Link>
              
              <button className="px-8 py-4 rounded-xl border-2 border-primary-500 text-primary-600 font-semibold hover:bg-primary-50 transition-all">
                Ver Demo
              </button>
            </div>
          </motion.div>

          {/* Floating Dog Emoji */}
          <motion.div
            className="text-9xl mt-16"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🐕
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gradient">
            ¿Por qué DogDogGo?
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Más que una app, es una comunidad donde cada paseo cuenta
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card-glow h-full p-8 hover:scale-105 transition-transform">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6 pulse-glow">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6 text-gradient">
              ¿Listo para la aventura?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Únete a miles de perros que ya están disfrutando de DogDogGo
            </p>
            
            <Link href="/register">
              <button className="btn-uiverse text-xl px-12 py-5">
                <span className="flex items-center gap-2">
                  🎉 Registrarse Ahora
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p className="mb-4">
            Hecho con ❤️ para los amigos perrunos
          </p>
          <p className="text-sm">
            © 2024 DogDogGo. Madrid Hackathon Project.
          </p>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: 'Emparejamiento Inteligente',
    description: 'Encuentra el compañero perfecto para tu perro basado en personalidad y compatibilidad.',
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    title: 'Sistema de Gamificación',
    description: 'Gana XP, sube de nivel y desbloquea logros mientras cuidas de tu perro.',
  },
  {
    icon: <Heart className="w-8 h-8 text-white" />,
    title: 'Salud y Bienestar',
    description: 'Registra datos de salud, paseos y visualiza el progreso con gráficos.',
  },
  {
    icon: <Award className="w-8 h-8 text-white" />,
    title: 'Cursos y Aprendizaje',
    description: 'Aprende sobre comportamiento canino con cursos interactivos.',
  },
  {
    icon: <Dog className="w-8 h-8 text-white" />,
    title: 'Círculo Social',
    description: 'Comparte momentos, fotos y conecta con otros dueños de perros.',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-white" />,
    title: 'Experiencia Única',
    description: 'Tu perro es el protagonista, no tú. Una red social diferente.',
  },
]

const stats = [
  { value: '10k+', label: 'Perros Registrados' },
  { value: '50k+', label: 'Paseos Completados' },
  { value: '25k+', label: 'Matches Exitosos' },
  { value: '100+', label: 'Logros Desbloqueados' },
]

