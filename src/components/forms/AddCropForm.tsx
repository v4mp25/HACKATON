import { useState } from 'react'
import { Input, TextArea, Button } from '@heroui/react'

export interface AddCropFormData {
  name: string
  location: string
  growthStage: string
  plantingDate: string
  area: string
  notes: string
}

interface AddCropFormProps {
  onSubmit: (data: AddCropFormData) => Promise<void>
}

const GROWTH_STAGES = [
  { value: 'siembra', label: 'Siembra' },
  { value: 'crecimiento', label: 'Crecimiento' },
  { value: 'floracion', label: 'Floración' },
  { value: 'cosecha', label: 'Cosecha' },
]

export function AddCropForm({ onSubmit }: AddCropFormProps) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [growthStage, setGrowthStage] = useState('')
  const [plantingDate, setPlantingDate] = useState('')
  const [area, setArea] = useState('')
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!growthStage) {
      setError('Selecciona la etapa del cultivo')
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      await onSubmit({ name, location, growthStage, plantingDate, area, notes })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el cultivo')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      {error && (
        <div className="bg-danger-50 text-danger-600 border border-danger-200 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="crop-name" className="text-sm font-medium text-default-700">
          Nombre del cultivo
        </label>
        <Input
          id="crop-name"
          type="text"
          placeholder="Ej: Papa, Maíz, Quinua"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="crop-location" className="text-sm font-medium text-default-700">
          Ubicación
        </label>
        <Input
          id="crop-location"
          type="text"
          placeholder="Ej: Huaraz, Ancash"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          fullWidth
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="crop-stage" className="text-sm font-medium text-default-700">
          Etapa del cultivo
        </label>
        <select
          id="crop-stage"
          value={growthStage}
          onChange={(e) => setGrowthStage(e.target.value)}
          required
          className="w-full h-10 px-3 rounded-lg border border-default-200 bg-default-50 text-sm focus:border-primary focus:ring-2 focus:ring-primary-200 outline-none transition-colors"
        >
          <option value="">Seleccionar etapa</option>
          {GROWTH_STAGES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="crop-date" className="text-sm font-medium text-default-700">
            Fecha de siembra
          </label>
          <Input
            id="crop-date"
            type="date"
            value={plantingDate}
            onChange={(e) => setPlantingDate(e.target.value)}
            required
            fullWidth
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="crop-area" className="text-sm font-medium text-default-700">
            Área (hectáreas)
          </label>
          <Input
            id="crop-area"
            type="number"
            min="0"
            step="0.1"
            placeholder="0.0"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
            fullWidth
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="crop-notes" className="text-sm font-medium text-default-700">
          Notas (opcional)
        </label>
        <TextArea
          id="crop-notes"
          placeholder="Variedad, tipo de riego, observaciones..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
        />
      </div>
      <Button type="submit" isDisabled={isLoading} fullWidth>
        {isLoading ? 'Guardando…' : 'Guardar Cultivo'}
      </Button>
    </form>
  )
}
