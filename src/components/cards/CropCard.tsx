import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Chip, Button } from '@heroui/react'
import type { Crop } from '../../types/crop'

interface CropCardProps {
  crop: Crop
  onViewDetail?: (id: string) => void
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

export function CropCard({ crop, onViewDetail }: CropCardProps) {
  const statusColor = crop.status === 'active' ? 'success' : 'default'
  const statusLabel = crop.status === 'active' ? 'Activo' : 'Cosechado'

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start w-full">
          <div>
            <CardTitle>{crop.name}</CardTitle>
            <CardDescription>{crop.location}</CardDescription>
          </div>
          <Chip color={statusColor} variant="soft" size="sm">
            {statusLabel}
          </Chip>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
          <span className="text-default-500">Etapa:</span>
          <span className="font-medium"><StageLabel stage={crop.growthStage} /></span>
          <span className="text-default-500">Área:</span>
          <span className="font-medium">{crop.area} ha</span>
          <span className="text-default-500">Siembra:</span>
          <span className="font-medium">{crop.plantingDate}</span>
        </div>
      </CardContent>
      {onViewDetail && (
        <CardFooter>
          <Button fullWidth variant="secondary" onPress={() => onViewDetail(crop.id)}>
            Ver detalle
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
