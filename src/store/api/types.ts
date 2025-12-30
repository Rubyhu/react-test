export type ApiError = {
  code: string
  message: string
}

export type LoginRequest = {
  account: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken?: string
  expiresIn: number
}

export type RegisterRequest = {
  account: string
  password: string
}

export type RegisterResponse = {
  success: boolean
}

export type MeResponse = {
  id: string
  name: string
  avatar?: string
  roles: string[]
  permissionCodes: string[]
}

