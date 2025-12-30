import request from '@/utils/request'

interface LoginParams {
  account: string
  password: string
}

interface UserInfo {
  id: string
  name: string
  avatar?: string,
  roles?: string[],
  permissionCodes?: string[]
}
const mockUserList: UserInfo = {
  id: '1',
  name: 'admin',
  avatar: 'https://avatars.githubusercontent.com/u/10656201?s=200&v=4',
  roles: ['admin'],
  permissionCodes: ['*'],
}

export const userApi = {
  login: (data: LoginParams) => request.post('/auth/login', data),
  //getUserInfo: () => request.get<UserInfo>('/users/me'),
  getUserInfo:()=>{ return new Promise(resolve => setTimeout(() => resolve(mockUserList), 1000))}
 
}
