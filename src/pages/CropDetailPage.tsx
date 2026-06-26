import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner, Card, CardHeader, CardTitle, CardDescription, CardContent, Chip, Button } from '@heroui/react'
import { mockCrops } from '../data/mockCrops'
import type { Crop } from '../types/crop'

interface CropDetailPageProps {
  onBack?: () => void
}

function StageLabel({ stage }: { stage: string }) {
  const labels: Record<string, string> = {
    siembra: 'Siembra',
    crecimiento: 'Crecimiento',
    floracion: 'Floración',
    cosecha: 'Cosecha',
  }
  return <>{labels[stage] || stage}</>
}

export function CropDetailPage({ onBack }: CropDetailPageProps) {
  const { id } = useParams()
  const [crop, setCrop] = useState<Crop | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      setError(null)
      try {
        await new Promise((resolve) => setTimeout(resolve, 600))
        const found = mockCrops.find((c) => c.id === id) ?? null
        if (!found && id) {
          setError('Cultivo no encontrado')
        }
        setCrop(found)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el cultivo')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [id])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 p-4">
        <Spinner size="lg" />
        <p className="text-default-500 text-sm">Cargando detalle…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4">
        <div className="size-14 rounded-full bg-danger-100 flex items-center justify-center">
          <span className="text-danger-600 text-2xl">!</span>
        </div>
        <p className="text-danger-600 font-medium">{error}</p>
        {onBack && (
          <Button variant="secondary" onPress={onBack}>
            Volver
          </Button>
        )}
      </div>
    )
  }

  if (!crop) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-4">
        <div className="size-14 rounded-full bg-default-100 flex items-center justify-center">
          <span className="text-default-400 text-2xl">?</span>
        </div>
        <p className="text-default-500">Selecciona un cultivo para ver su detalle</p>
        {onBack && (
          <Button variant="secondary" onPress={onBack}>
            Ver cultivos
          </Button>
        )}
      </div>
    )
  }

  const statusColor = crop.status === 'active' ? 'success' : 'default'
  const statusLabel = crop.status === 'active' ? 'Activo' : 'Cosechado'

  return (
    <div className="flex flex-col p-4 gap-4 max-w-lg mx-auto">
      <div className="flex items-center gap-2">
        {onBack && (
          <Button variant="ghost" size="sm" onPress={onBack}>
            ← Volver
          </Button>
        )}
      </div>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-start w-full">
            <div>
              <CardTitle>{crop.name}</CardTitle>
              <CardDescription>{crop.location}</CardDescription>
            </div>
            <Chip color={statusColor} variant="secondary" size="sm">
              {statusLabel}
            </Chip>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <span className="text-default-500">Etapa del cultivo:</span>
              <span className="font-medium"><StageLabel stage={crop.growthStage} /></span>
              <span className="text-default-500">Área:</span>
              <span className="font-medium">{crop.area} ha</span>
              <span className="text-default-500">Fecha de siembra:</span>
              <span className="font-medium">{crop.plantingDate}</span>
              <span className="text-default-500">Registrado:</span>
              <span className="font-medium">{new Date(crop.createdAt).toLocaleDateString()}</span>
            </div>
            {crop.notes && (
              <div className="border-t border-default-100 pt-3">
                <span className="text-sm text-default-500 block mb-1">Notas:</span>
                <p className="text-sm text-default-800">{crop.notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
