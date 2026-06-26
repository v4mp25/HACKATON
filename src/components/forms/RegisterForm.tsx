import { useState } from 'react'
import { Input, Button } from '@heroui/react'

export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      await onSubmit({ name, email, password, confirmPassword })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse')
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
        <label htmlFor="reg-name" className="text-sm font-medium text-default-700">
          Nombre completo
        </label>
        <Input
          id="reg-name"
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-email" className="text-sm font-medium text-default-700">
          Correo electrónico
        </label>
        <Input
          id="reg-email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-password" className="text-sm font-medium text-default-700">
          Contraseña
        </label>
        <Input
          id="reg-password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reg-confirm" className="text-sm font-medium text-default-700">
          Confirmar contraseña
        </label>
        <Input
          id="reg-confirm"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
        />
      </div>
      <Button type="submit" isDisabled={isLoading} fullWidth>
        {isLoading ? 'Registrando…' : 'Crear Cuenta'}
      </Button>
    </form>
  )
}
