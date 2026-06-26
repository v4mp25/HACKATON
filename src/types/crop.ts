export interface Crop {
  id: string
  name: string
  location: string
  status: 'active' | 'harvested'
  growthStage: 'siembra' | 'crecimiento' | 'floracion' | 'cosecha'
  plantingDate: string
  area: number
  notes: string
  createdAt: string
}
