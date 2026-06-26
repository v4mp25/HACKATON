import { useState } from 'react'
import { Spinner } from '@heroui/react'
import { AddCropForm } from '../components/forms/AddCropForm'
import type { AddCropFormData } from '../components/forms/AddCropForm'

interface AddCropPageProps {
  onSaveSuccess?: () => void
}

export function AddCropPage({ onSaveSuccess }: AddCropPageProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (_data: AddCropFormData) => {
    setState('loading')
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setState('success')
      onSaveSuccess?.()
    } catch (err) {
      setState('error')
      setError(err instanceof Error ? err.message : 'Error al guardar el cultivo')
    }
  }

  if (state === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 p-4">
        <Spinner size="lg" />
        <p className="text-default-500 text-sm">Guardando cultivo…</p>
      </div>
    )
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 p-4">
        <div className="size-14 rounded-full bg-success-100 flex items-center justify-center">
          <span className="text-success-600 text-2xl">✓</span>
        </div>
        <p className="text-success-600 font-medium">Cultivo guardado correctamente</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-default-900">Agregar Cultivo</h1>
          <p className="text-default-500 text-sm mt-1">Registra un nuevo cultivo en tu parcela</p>
        </div>
        {state === 'error' && error && (
          <div className="bg-danger-50 text-danger-600 border border-danger-200 rounded-lg px-4 py-3 text-sm mb-4">
            {error}
          </div>
        )}
        <AddCropForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
