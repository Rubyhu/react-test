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
const mockUserList2: UserInfo = {
  id: '1',
  name: '张三',
  avatar: 'https://avatars.githubusercontent.com/u/10656201?s=200&v=4',
  roles: ['user'],
  permissionCodes: ['user'],
}
const mockLogininfo={"accessToken":"123456"}
const mockRegisterinfo={"accessToken":"123456","success":true}

export const userApi = {
  //getUserInfo: () => request.get<UserInfo>('/users/me'),
  getUserInfo:(params:LoginParams)=>{ return new Promise(resolve => setTimeout(() => {
     return params.account === 'admin'?resolve(mockUserList):resolve(mockUserList2)}, 1000))},
   login:()=>{ return new Promise(resolve => setTimeout(() => {
   resolve(mockLogininfo)
   }, 1000))},
   register:()=>{ return new Promise(resolve => setTimeout(() => resolve(mockRegisterinfo), 1000))},
 
}
