'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Heart, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const PERSONALITY_QUESTIONS = [
  {
    id: '1',
    scenario: 'En el parque, un perro desconocido se acerca a ti...',
    question: '¿Cómo reaccionas?',
    options: [
      { id: 'a', text: '¡Corro feliz a saludarlo! 🎉', scores: { extroversion: 30, friendliness: 25 } },
      { id: 'b', text: 'Me acerco con cuidado', scores: { extroversion: 10, sensitivity: 10 } },
      { id: 'c', text: 'Me escondo detrás de mi dueño', scores: { extroversion: -20, sensitivity: 20 } },
      { id: 'd', text: 'Ladro para advertir', scores: { friendliness: -15, sensitivity: 15 } },
    ],
  },
  {
    id: '2',
    scenario: 'Tu dueño saca la correa para salir...',
    question: '¿Cómo te sientes?',
    options: [
      { id: 'a', text: '¡EMOCIONADÍSIMO! 🌟', scores: { energyLevel: 30, extroversion: 15 } },
      { id: 'b', text: 'Me alegro y muevo la cola', scores: { energyLevel: 15 } },
      { id: 'c', text: 'Me acerco tranquilamente', scores: { energyLevel: -10 } },
      { id: 'd', text: 'Prefiero quedarme', scores: { energyLevel: -20, extroversion: -15 } },
    ],
  },
  {
    id: '3',
    scenario: 'Hay ruidos fuertes (truenos, fuegos)...',
    question: '¿Cómo reaccionas?',
    options: [
      { id: 'a', text: 'No me importa', scores: { sensitivity: -20, trainability: 10 } },
      { id: 'b', text: 'Me pongo alerta', scores: { sensitivity: 5 } },
      { id: 'c', text: 'Busco a mi dueño', scores: { sensitivity: 20 } },
      { id: 'd', text: 'Me aterrorizo', scores: { sensitivity: 30, extroversion: -10 } },
    ],
  },
  {
    id: '4',
    scenario: 'Durante el paseo ves una ardilla...',
    question: '¿Qué haces?',
    options: [
      { id: 'a', text: '¡LA PERSIGO! 🏃', scores: { energyLevel: 25, trainability: -15 } },
      { id: 'b', text: 'Me interesa pero obedezco', scores: { trainability: 20, energyLevel: 10 } },
      { id: 'c', text: 'La miro sin moverme', scores: { trainability: 15, energyLevel: -5 } },
      { id: 'd', text: 'Me da miedo', scores: { sensitivity: 15, energyLevel: -10 } },
    ],
  },
  {
    id: '5',
    scenario: 'Tu dueño está comiendo...',
    question: '¿Cómo actúas?',
    options: [
      { id: 'a', text: 'Miro fijamente 👀', scores: { trainability: -10 } },
      { id: 'b', text: 'Espero pacientemente', scores: { trainability: 20 } },
      { id: 'c', text: 'Pido con la patita', scores: { trainability: 15, friendliness: 10 } },
      { id: 'd', text: 'Intento robar comida', scores: { trainability: -20, energyLevel: 10 } },
    ],
  },
]

export default function MatchPage() {
  const router = useRouter()
  const [step, setStep] = useState<'intro' | 'game' | 'results'>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [matches, setMatches] = useState<any[]>([])

  const handleAnswer = (option: any) => {
    const newAnswers = [...answers, { questionId: PERSONALITY_QUESTIONS[currentQuestion].id, option }]
    setAnswers(newAnswers)

    if (currentQuestion < PERSONALITY_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finishGame(newAnswers)
    }
  }

  const finishGame = async (finalAnswers: any[]) => {
    // Calcular scores
    const scores = {
      extroversion: 50,
      energyLevel: 50,
      sensitivity: 50,
      friendliness: 50,
      trainability: 50,
    }

    finalAnswers.forEach(answer => {
      Object.entries(answer.option.scores).forEach(([key, value]) => {
        scores[key as keyof typeof scores] += value as number
      })
    })

    // Normalizar 0-100
    Object.keys(scores).forEach(key => {
      scores[key as keyof typeof scores] = Math.max(0, Math.min(100, scores[key as keyof typeof scores]))
    })

    // Simular matches
    const mockMatches = [
      {
        id: '1',
        name: 'Luna',
        breed: 'Golden Retriever',
        level: 5,
        compatibility: 92,
        personality: 88,
        energy: 95,
        social: 93,
      },
      {
        id: '2',
        name: 'Max',
        breed: 'Border Collie',
        level: 7,
        compatibility: 85,
        personality: 82,
        energy: 90,
        social: 84,
      },
      {
        id: '3',
        name: 'Rocky',
        breed: 'Labrador',
        level: 4,
        compatibility: 78,
        personality: 75,
        energy: 82,
        social: 77,
      },
    ]

    setMatches(mockMatches)
    setStep('results')
    toast.success('¡Matches encontrados!')
  }

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 pb-24">
        <div className="max-w-lg mx-auto pt-8">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Volver
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-glass text-center p-8"
          >
            <div className="text-6xl mb-6 animate-bounce">✨</div>
            <h1 className="text-3xl font-bold text-gradient mb-4">
              Emparejamiento de Paseo
            </h1>
            <p className="text-gray-600 mb-6">
              Responde 5 preguntas sobre la personalidad de tu perro
            </p>

            <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">¿Cómo funciona?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 5 preguntas sobre comportamiento</li>
                <li>• Algoritmo de compatibilidad</li>
                <li>• Mejores matches personalizados</li>
                <li>• Consejos para el encuentro</li>
              </ul>
            </div>

            <button
              onClick={() => setStep('game')}
              className="btn-uiverse w-full"
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles size={20} />
                Comenzar Test
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  if (step === 'game') {
    const question = PERSONALITY_QUESTIONS[currentQuestion]
    const progress = ((currentQuestion + 1) / PERSONALITY_QUESTIONS.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 pb-24">
        <div className="max-w-lg mx-auto pt-8">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Pregunta {currentQuestion + 1} de {PERSONALITY_QUESTIONS.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar-animated">
              <div className="progress-fill-animated" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-glass p-6"
          >
            <div className="bg-purple-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-purple-900 font-medium">
                {question.scenario}
              </p>
            </div>
            
            <h2 className="text-xl font-bold mb-6">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map(option => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all"
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Results
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 pb-24">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            ¡Matches Encontrados!
          </h1>
          <p className="text-gray-600">
            Estos perros son compatibles con tu perro
          </p>
        </div>

        <div className="space-y-4">
          {matches.map(match => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-glass p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar-ring">
                  <img
                    src={`https://api.dicebear.com/7.x/bottts/svg?seed=${match.name}`}
                    alt={match.name}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{match.name}</h3>
                  <p className="text-sm text-gray-600">{match.breed}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {match.compatibility}%
                  </div>
                  <div className="text-xs text-gray-600">Compatible</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{match.personality}%</div>
                  <div className="text-xs text-gray-600">Personalidad</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{match.energy}%</div>
                  <div className="text-xs text-gray-600">Energía</div>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">{match.social}%</div>
                  <div className="text-xs text-gray-600">Social</div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <p className="text-sm font-semibold text-green-900 mb-2">💡 Consejos:</p>
                <ul className="text-xs text-green-800 space-y-1">
                  <li>• Empezad con paseo paralelo de 5 minutos</li>
                  <li>• Dejad que se conozcan gradualmente</li>
                  <li>• Mantened correas sueltas</li>
                </ul>
              </div>

              <button
                onClick={() => toast.success('Invitación enviada!')}
                className="btn-uiverse w-full"
              >
                <span className="flex items-center justify-center gap-2">
                  <Heart size={20} />
                  Enviar Invitación
                </span>
              </button>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => router.push('/dashboard')}
          className="w-full mt-6 p-4 rounded-xl border-2 border-gray-300 font-semibold hover:bg-gray-50 transition-all"
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
  )
}

