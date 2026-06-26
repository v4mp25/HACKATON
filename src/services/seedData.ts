export interface SeedUser {
  id: string
  name: string
  email: string
}

export interface SeedCrop {
  name: string
  location: string
  status: 'active' | 'harvested'
  growthStage: 'siembra' | 'crecimiento' | 'floracion' | 'cosecha'
  plantingDate: string
  area: number
  notes: string
}

export interface SeedAlert {
  cropId: string
  type: string
  severity: 'baja' | 'media' | 'alta'
  message: string
  recommendation: string
  read: boolean
}

export const DEMO_USER: SeedUser = {
  id: 'demo-user-001',
  name: 'Agricultor Demo',
  email: 'demo@agroalerta.app',
}

export const DEMO_CROPS: SeedCrop[] = [
  {
    name: 'Papa',
    location: 'Huaraz, Ancash',
    status: 'active',
    growthStage: 'crecimiento',
    plantingDate: '2026-03-15',
    area: 2.5,
    notes: 'Variedad Yungay - Riego por aspersión',
  },
  {
    name: 'Maíz',
    location: 'Junín, Junín',
    status: 'active',
    growthStage: 'floracion',
    plantingDate: '2026-01-10',
    area: 4.0,
    notes: 'Maíz amarillo duro - Siembra directa',
  },
  {
    name: 'Quinua',
    location: 'Puno, Puno',
    status: 'active',
    growthStage: 'siembra',
    plantingDate: '2026-05-01',
    area: 1.8,
    notes: 'Quinua real - Cultivo orgánico certificado',
  },
]

export const DEMO_ALERTS: SeedAlert[] = [
  {
    cropId: 'crop-papa-001',
    type: 'helada',
    severity: 'alta',
    message: 'Riesgo de helada en las próximas 48 horas en Huaraz.',
    recommendation: 'Cubre los cultivos con malla antihelada y riega antes del amanecer.',
    read: false,
  },
  {
    cropId: 'crop-maiz-001',
    type: 'humedad',
    severity: 'media',
    message: 'Exceso de humedad en el suelo en Junín.',
    recommendation: 'Reduce el riego y verifica el drenaje del terreno.',
    read: false,
  },
  {
    cropId: 'crop-quinua-001',
    type: 'sequia',
    severity: 'baja',
    message: 'Condiciones de sequía leve en Puno.',
    recommendation: 'Programa riego suplementario por las mañanas.',
    read: false,
  },
]

export async function seedFirestore(): Promise<void> {
  const { getFirestore, doc, collection, writeBatch } = await import('firebase/firestore')
  const { getAuth } = await import('firebase/auth')
  const { initializeApp, getApps } = await import('firebase/app')
  const fbConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }

  const app = getApps().length === 0 ? initializeApp(fbConfig) : getApps()[0]
  const db = getFirestore(app)
  const auth = getAuth(app)

  const user = auth.currentUser
  if (!user) throw new Error('Debes iniciar sesión para seedear datos')

  const batch = writeBatch(db)

  const userRef = doc(db, 'users', user.uid)
  batch.set(userRef, {
    name: DEMO_USER.name,
    email: DEMO_USER.email,
    createdAt: new Date().toISOString(),
  })

  DEMO_CROPS.forEach((cropData, i) => {
    const cropRef = doc(collection(db, 'crops'))
    batch.set(cropRef, {
      ...cropData,
      userId: user.uid,
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    })
  })

  await batch.commit()
}
