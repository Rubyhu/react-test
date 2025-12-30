import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  'zh-CN': {
    translation: {
      appName: '后台管理系统',
      login: '登录',
      register: '注册',
      logout: '退出登录',
      dashboard: '仪表盘',
      profile: '个人中心',
      system: '系统管理',
      users: '用户管理',
      roles: '角色管理',
      language: '语言',
      account: '账号',
      password: '密码',
      confirmPassword: '确认密码',
      submit: '提交',
      goToRegister: '没有账号？去注册',
      goToLogin: '已有账号？去登录',
      registerSuccess: '注册成功',
      invalidCredentials: '账号或密码错误',
      accountExists: '账号已存在',
      passwordNotMatch: '两次密码不一致',
      forbidden: '没有权限访问该页面',
      notFound: '页面不存在',
    },
  },
  'en-US': {
    translation: {
      appName: 'Admin Console',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      dashboard: 'Dashboard',
      profile: 'Profile',
      system: 'System',
      users: 'Users',
      roles: 'Roles',
      language: 'Language',
      account: 'Account',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      submit: 'Submit',
      goToRegister: "Don't have an account? Register",
      goToLogin: 'Already have an account? Login',
      registerSuccess: 'Registration successful',
      invalidCredentials: 'Invalid credentials',
      accountExists: 'Account already exists',
      passwordNotMatch: 'Passwords do not match',
      forbidden: 'You do not have permission to access this page',
      notFound: 'Page not found',
    },
  },
}

void i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') ?? 'zh-CN',
  fallbackLng: 'zh-CN',
  interpolation: { escapeValue: false },
})

export { i18n }
