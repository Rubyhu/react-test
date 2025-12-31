import request from '@/utils/request'

interface Role {
  id: number
  name: string
  description: string
}

export const roleApi = {
  getRoles: () => request.get<Role[]>('/roles'),
  createRole: (data: Role) => request.post('/roles', data),
  
}
