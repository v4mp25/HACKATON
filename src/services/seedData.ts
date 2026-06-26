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

  DEMO_CROPS.forEach((cropData) => {
    const cropRef = doc(collection(db, 'crops'))
    batch.set(cropRef, {
      ...cropData,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    })
  })

  await batch.commit()
}
