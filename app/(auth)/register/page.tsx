'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Dog, Mail, Lock, User, Calendar, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const DOG_BREEDS = [
  'Labrador Retriever', 'Golden Retriever', 'Pastor Alemán', 'Bulldog Francés',
  'Beagle', 'Poodle', 'Yorkshire Terrier', 'Boxer', 'Chihuahua', 'Mestizo', 'Otro'
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    // Dueño
    email: '',
    password: '',
    confirmPassword: '',
    // Perro
    dogName: '',
    dogBreed: '',
    dogGender: 'MALE',
    dogBirthDate: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    
    if (formData.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error en el registro')
      }

      toast.success(`¡Bienvenido, ${formData.dogName}! 🐕`)
      router.push('/login')
    } catch (error: any) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Por favor completa todos los campos')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    setStep(2)
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
            <h1 className="text-4xl font-bold text-gradient">DogDogGo</h1>
          </div>
          <p className="text-gray-600">
            {step === 1 ? 'Primero, tus datos' : 'Ahora, cuéntanos de tu perro 🐶'}
          </p>
        </div>

        {/* Form Card */}
        <div className="card-glass p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h2>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mb-6">
            <div className={`w-12 h-2 rounded-full ${step >= 1 ? 'bg-primary-500' : 'bg-gray-200'}`} />
            <div className={`w-12 h-2 rounded-full ${step >= 2 ? 'bg-primary-500' : 'bg-gray-200'}`} />
          </div>

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
            {step === 1 ? (
              <>
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
                      placeholder="Mínimo 6 caracteres"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="password"
                      className="input-modern pl-12"
                      placeholder="Repite tu contraseña"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button type="button" onClick={nextStep} className="btn-uiverse w-full">
                  <span>Siguiente →</span>
                </button>
              </>
            ) : (
              <>
                {/* Dog Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Perro
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      className="input-modern pl-12"
                      placeholder="Ej: Max, Luna, Rocky..."
                      value={formData.dogName}
                      onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Breed */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Raza
                  </label>
                  <select
                    className="input-modern"
                    value={formData.dogBreed}
                    onChange={(e) => setFormData({ ...formData, dogBreed: e.target.value })}
                    required
                  >
                    <option value="">Selecciona una raza</option>
                    {DOG_BREEDS.map((breed) => (
                      <option key={breed} value={breed}>{breed}</option>
                    ))}
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Género
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                        formData.dogGender === 'MALE'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData({ ...formData, dogGender: 'MALE' })}
                    >
                      🦴 Macho
                    </button>
                    <button
                      type="button"
                      className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                        formData.dogGender === 'FEMALE'
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData({ ...formData, dogGender: 'FEMALE' })}
                    >
                      🎀 Hembra
                    </button>
                  </div>
                </div>

                {/* Birth Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Nacimiento
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="date"
                      className="input-modern pl-12"
                      value={formData.dogBirthDate}
                      onChange={(e) => setFormData({ ...formData, dogBirthDate: e.target.value })}
                      max={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    ← Atrás
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-uiverse flex-1"
                  >
                    <span>
                      {isLoading ? 'Creando...' : 'Crear Cuenta'}
                    </span>
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-primary-600 font-semibold hover:text-primary-700">
                Inicia sesión
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

