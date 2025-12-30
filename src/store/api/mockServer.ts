import type { ApiError, LoginRequest, LoginResponse, MeResponse, RegisterRequest, RegisterResponse } from './types'
import { clearAccessToken, getAccessToken, setAccessToken } from '../storage'

type StoredUser = {
  id: string
  account: string
  password: string
}

const USERS_KEY = '__mock_users__'
const TOKEN_MAP_KEY = '__mock_token_map__'

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

function readUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as StoredUser[]
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function readTokenMap(): Record<string, string> {
  const raw = localStorage.getItem(TOKEN_MAP_KEY)
  if (!raw) return {}
  try {
    return JSON.parse(raw) as Record<string, string>
  } catch {
    return {}
  }
}

function writeTokenMap(map: Record<string, string>) {
  localStorage.setItem(TOKEN_MAP_KEY, JSON.stringify(map))
}

function seedIfNeeded() {
  const users = readUsers()
  if (users.length > 0) return

  const seeded: StoredUser[] = [
    { id: 'u_admin', account: 'admin', password: 'admin123' },
  ]
  writeUsers(seeded)
}

function createToken(userId: string) {
  return `${userId}.${Date.now().toString(36)}`
}

function toApiError(code: string, message: string): ApiError {
  return { code, message }
}

export async function register(req: RegisterRequest): Promise<RegisterResponse> {
  seedIfNeeded()
  await sleep(300)

  const users = readUsers()
  if (users.some((u) => u.account === req.account)) {
    throw toApiError('AUTH_ACCOUNT_EXISTS', 'Account already exists')
  }

  const id = `u_${Math.random().toString(36).slice(2, 10)}`
  users.push({ id, account: req.account, password: req.password })
  writeUsers(users)

  return { success: true }
}

export async function login(req: LoginRequest): Promise<LoginResponse> {
  seedIfNeeded()
  await sleep(300)

  const users = readUsers()
  const user = users.find((u) => u.account === req.account && u.password === req.password)
  if (!user) {
    throw toApiError('AUTH_INVALID_CREDENTIALS', 'Invalid credentials')
  }

  const token = createToken(user.id)
  const map = readTokenMap()
  map[token] = user.id
  writeTokenMap(map)
  setAccessToken(token)

  return { accessToken: token, expiresIn: 3600 }
}

export async function logout(): Promise<{ success: boolean }> {
  await sleep(100)

  const token = getAccessToken()
  if (token) {
    const map = readTokenMap()
    delete map[token]
    writeTokenMap(map)
  }

  clearAccessToken()
  return { success: true }
}

export async function me(): Promise<MeResponse> {
  seedIfNeeded()
  await sleep(200)

  const token = getAccessToken()
  if (!token) {
    throw toApiError('AUTH_UNAUTHORIZED', 'Unauthorized')
  }

  const map = readTokenMap()
  const userId = map[token]
  if (!userId) {
    throw toApiError('AUTH_TOKEN_EXPIRED', 'Token expired')
  }

  const users = readUsers()
  const user = users.find((u) => u.id === userId)
  if (!user) {
    throw toApiError('AUTH_UNAUTHORIZED', 'Unauthorized')
  }

  const isAdmin = user.account === 'admin'
  return {
    id: user.id,
    name: isAdmin ? '管理员' : user.account,
    roles: isAdmin ? ['admin'] : ['user'],
    permissionCodes: isAdmin
      ? ['dashboard.view', 'profile.view', 'system.users.view', 'system.roles.view']
      : ['dashboard.view', 'profile.view'],
  }
}
