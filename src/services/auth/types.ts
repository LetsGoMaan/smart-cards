export type LoginResponse = {
  accessToken: string
}

export type LoginRequestArgs = {
  password: string
  email: string
  rememberMe: boolean
}

export type AuthResponse = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
} | null

export type SignUpRequestArgs = {
  html?: string
  name?: string
  password: string
  email: string
  subject?: string
  sendConfirmationEmail?: boolean
}

export type RecoverPasswordArgs = Pick<SignUpRequestArgs, 'html' | 'email' | 'subject'>
