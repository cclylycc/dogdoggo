'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Dog, Mail, Lock, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      })

      if (result?.error) {
        setError('Email o contraseña incorrectos')
        toast.error('Error de inicio de sesión')
      } else {
        toast.success('¡Bienvenido de vuelta! 🐕')
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      setError('Error al iniciar sesión')
      toast.error('Error del servidor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-animated flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Dog className="w-12 h-12 text-primary-600" />
            <div className="flex flex-col items-center gap-4 mb-2">
              <img 
                src="/logo.png" 
                alt="Pawdona Logo" 
                className="h-24 w-auto"
              />
              <h1 className="text-4xl font-bold text-gradient">Pawdona</h1>
            </div>
          </div>
          <p className="text-gray-600">¡Bienvenido de vuelta! 🐾</p>
        </div>

        {/* Form Card */}
        <div className="card-glass p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700"
            >
              <AlertCircle size={20} />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  className="input-modern pl-12"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  className="input-modern pl-12"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-uiverse w-full"
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <Dog size={20} />
                    <span>Iniciar Sesión</span>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Demo Account */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm font-semibold text-blue-900 mb-2">🎯 Cuenta Demo:</p>
            <p className="text-xs text-blue-700">Email: demo@pawdona.com</p>
            <p className="text-xs text-blue-700">Contraseña: demo123</p>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link href="/register" className="text-primary-600 font-semibold hover:text-primary-700">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

