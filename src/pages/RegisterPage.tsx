import { useState } from 'react'
import { Spinner } from '@heroui/react'
import { RegisterForm } from '../components/forms/RegisterForm'
import type { RegisterFormData } from '../components/forms/RegisterForm'

interface RegisterPageProps {
  onRegisterSuccess?: () => void
  onSwitchToLogin?: () => void
}

export function RegisterPage({ onRegisterSuccess, onSwitchToLogin }: RegisterPageProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (_data: RegisterFormData) => {
    setState('loading')
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setState('success')
      onRegisterSuccess?.()
    } catch (err) {
      setState('error')
      setError(err instanceof Error ? err.message : 'Error al registrarse')
    }
  }

  if (state === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 p-4">
        <Spinner size="lg" />
        <p className="text-default-500 text-sm">Creando cuenta…</p>
      </div>
    )
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 p-4">
        <div className="size-14 rounded-full bg-success-100 flex items-center justify-center">
          <span className="text-success-600 text-2xl">✓</span>
        </div>
        <p className="text-success-600 font-medium">Cuenta creada exitosamente</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-default-900">Crear Cuenta</h1>
          <p className="text-default-500 text-sm mt-1">Regístrate en AgroAlerta</p>
        </div>
        {state === 'error' && error && (
          <div className="bg-danger-50 text-danger-600 border border-danger-200 rounded-lg px-4 py-3 text-sm mb-4">
            {error}
          </div>
        )}
        <RegisterForm onSubmit={handleSubmit} />
        {onSwitchToLogin && (
          <p className="text-center text-sm text-default-500 mt-4">
            ¿Ya tienes cuenta?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary underline hover:text-primary-600"
            >
              Iniciar sesión
            </button>
          </p>
        )}
      </div>
    </div>
  )
}
