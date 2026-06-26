import { useState, useEffect } from 'react'
import { Spinner, Button } from '@heroui/react'
import { CropCard } from '../components/cards/CropCard'
import { mockCrops } from '../data/mockCrops'
import type { Crop } from '../types/crop'

interface CropsPageProps {
  onViewDetail?: (id: string) => void
  onAddCrop?: () => void
}

export function CropsPage({ onViewDetail, onAddCrop }: CropsPageProps) {
  const [crops, setCrops] = useState<Crop[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      setError(null)
      try {
        await new Promise((resolve) => setTimeout(resolve, 800))
        setCrops(mockCrops)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar cultivos')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const handleRetry = () => {
    setIsLoading(true)
    setError(null)
    setTimeout(() => {
      setCrops(mockCrops)
      setIsLoading(false)
    }, 800)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 p-4">
        <Spinner size="lg" />
        <p className="text-default-500 text-sm">Cargando cultivos…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
        <div className="size-14 rounded-full bg-danger-100 flex items-center justify-center">
          <span className="text-danger-600 text-2xl">!</span>
        </div>
        <p className="text-danger-600 font-medium text-center">{error}</p>
        <Button variant="secondary" onPress={handleRetry}>
          Reintentar
        </Button>
      </div>
    )
  }

  if (crops.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
        <div className="size-14 rounded-full bg-default-100 flex items-center justify-center">
          <span className="text-default-400 text-2xl">🌱</span>
        </div>
        <p className="text-default-500 text-center">No tienes cultivos registrados</p>
        {onAddCrop && (
          <Button variant="secondary" onPress={onAddCrop}>
            Agregar tu primer cultivo
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col p-4 gap-4 max-w-lg mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-default-900">Mis Cultivos</h1>
        <span className="text-sm text-default-500">{crops.length} cultivos</span>
      </div>
      <div className="flex flex-col gap-3">
        {crops.map((crop) => (
          <CropCard key={crop.id} crop={crop} onViewDetail={onViewDetail} />
        ))}
      </div>
      {onAddCrop && (
        <Button fullWidth variant="secondary" onPress={onAddCrop}>
          + Agregar Cultivo
        </Button>
      )}
    </div>
  )
}
