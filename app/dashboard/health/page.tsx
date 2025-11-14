'use client'

import { useState } from 'react'
import { Scale, Droplet, Activity, Plus, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockWeightData = [
  { date: '2024-10-01', weight: 25.5 },
  { date: '2024-10-08', weight: 25.7 },
  { date: '2024-10-15', weight: 25.4 },
  { date: '2024-10-22', weight: 25.8 },
  { date: '2024-10-29', weight: 26.0 },
  { date: '2024-11-05', weight: 25.9 },
  { date: '2024-11-12', weight: 26.1 },
]

export default function HealthPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [formData, setFormData] = useState({
    type: 'peso',
    weight: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch('/api/health', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        toast.success('Registro de salud guardado!')
        setShowAddModal(false)
        setFormData({ type: 'peso', weight: '', date: new Date().toISOString().split('T')[0], notes: '' })
      }
    } catch (error) {
      toast.error('Error al guardar')
    }
  }

  return (
    <div className="min-h-screen bg-animated p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gradient">Salud 💚</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-uiverse"
          >
            <span className="flex items-center gap-2">
              <Plus size={20} />
              Agregar
            </span>
          </button>
        </div>

        {/* Stats rápidas */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card-glass text-center p-4">
            <Scale className="mx-auto mb-2 text-primary-600" size={24} />
            <div className="text-2xl font-bold">26.1</div>
            <div className="text-sm text-gray-600">kg</div>
          </div>
          
          <div className="card-glass text-center p-4">
            <Droplet className="mx-auto mb-2 text-blue-600" size={24} />
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-gray-600">Vacunas</div>
          </div>
          
          <div className="card-glass text-center p-4">
            <Activity className="mx-auto mb-2 text-green-600" size={24} />
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-gray-600">Registros</div>
          </div>
        </div>

        {/* Gráfico de peso */}
        <div className="card-glass p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="text-primary-600" size={20} />
            Tendencia de Peso (30 días)
          </h3>
          
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockWeightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(date) => new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: 'none', borderRadius: '8px' }}
                labelFormatter={(date) => new Date(date).toLocaleDateString('es-ES')}
                formatter={(value: any) => [`${value} kg`, 'Peso']}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#ff4d37" 
                strokeWidth={3}
                dot={{ r: 5, fill: '#ff4d37' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Modal para agregar */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-glass p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold mb-4">Nuevo Registro</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo</label>
                  <select
                    className="input-modern"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="peso">Peso</option>
                    <option value="vacuna">Vacuna</option>
                    <option value="alergia">Alergia</option>
                  </select>
                </div>

                {formData.type === 'peso' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Peso (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="input-modern"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="25.5"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Fecha</label>
                  <input
                    type="date"
                    className="input-modern"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Notas</label>
                  <textarea
                    className="input-modern"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Observaciones..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-uiverse flex-1">
                    <span>Guardar</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

