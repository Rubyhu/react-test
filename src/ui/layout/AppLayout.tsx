import { Layout, Menu, Dropdown, Button, Space, Typography, type MenuProps } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, GlobalOutlined } from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { appActions } from '../../store/slices/appSlice'
import { authActions } from '../../store/slices/authSlice'
import { userActions } from '../../store/slices/userSlice'
// import { authApi, useLogoutMutation } from '../../store/apii/authApi'

const { Header, Sider, Content } = Layout

type MenuItem = {
  key: string
  label: string
  path?: string
  children?: MenuItem[]
  roles?: string[]
}

function getSelectedKeys(pathname: string) {
  if (pathname.startsWith('/system/users')) return ['/system/users']
  if (pathname.startsWith('/system/roles')) return ['/system/roles']
  if (pathname.startsWith('/drStore/drPage')) return ['/drStore/drPage']
  if (pathname.startsWith('/drStore/concatPage')) return ['/drStore/concatPage']
  if (pathname.startsWith('/profile')) return ['/profile']
  return ['/dashboard']
}

export function AppLayout() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const collapsed = useAppSelector((s) => s.app.collapsed)
  const roles = useAppSelector((s) => s.user.roles)
  const userName = useAppSelector((s) => s.user.profile?.name)

//   const [doLogout, { isLoading: isLoggingOut }] = useLogoutMutation()

  const menuTree: MenuItem[] = useMemo(() => {
    const items: MenuItem[] = [
      { key: '/dashboard', label: t('dashboard'), path: '/dashboard' },
      { key: '/profile', label: t('profile'), path: '/profile' },
       {
        key: '/drStore',
        label: "达人库",
        children: [
          { key: '/drStore/drPage', label: "达人库", path: '/drStore/drPage',  },
          { key: '/drStore/concatPage', label: "联系人", path: 'drStore/concatPage', },
        ],
      },
      {
        key: '/system',
        label: t('system'),
        // roles: ['admin'],
        children: [
          { key: '/system/users', label: t('users'), path: '/system/users',  },
          { key: '/system/roles', label: t('roles'), path: '/system/roles',  },
        ],
      },
    ]

    const canSee = (item: MenuItem) => {
      if (!item.roles || item.roles.length === 0) return true
      return item.roles.some((r) => roles.includes(r))
    }

    const filterTree = (list: MenuItem[]): MenuItem[] => {
      return list
        .filter(canSee)
        .map((it) => {
          if (!it.children) return it
          return { ...it, children: filterTree(it.children) }
        })
        .filter((it) => (it.children ? it.children.length > 0 || it.path : true))
    }

    return filterTree(items)
  }, [roles, t])

  const menuItems = useMemo(() => {
    const toAntdItems = (items: MenuItem[]): NonNullable<MenuProps['items']> => {
      return items.map((it) => ({
        key: it.key,
        label: it.label,
        children: it.children ? toAntdItems(it.children) : undefined,
      }))
    }
    return toAntdItems(menuTree)
  }, [menuTree])

  const selectedKeys = useMemo(() => getSelectedKeys(location.pathname), [location.pathname])

  const onMenuClick = (e: { key: string }) => {
    navigate(e.key)
  }

  const toggle = () => dispatch(appActions.toggleCollapsed())

  const switchLanguage = async () => {
    const next = i18n.language.startsWith('zh') ? 'en-US' : 'zh-CN'
    localStorage.setItem('language', next)
    await i18n.changeLanguage(next)
  }

  const onLogout = async () => {
    dispatch(authActions.logout())
    dispatch(userActions.reset())
    navigate('/login', { replace: true })
  }

  const userMenuItems: NonNullable<MenuProps['items']> = [
    { key: 'profile', label: t('profile'), onClick: () => navigate('/profile') },
    { key: 'logout', label: t('logout'), onClick: onLogout, disabled: false },
  ]

  return (
    <Layout style={{ height: '100%' }}>
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div style={{ height: 48, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
          <Typography.Text style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
            {collapsed ? '后' : t('appName')}
          </Typography.Text>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          selectedKeys={selectedKeys}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button type="primary" onClick={toggle} aria-label="toggle-sider">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Space size={12}>
            <Button type="primary" onClick={switchLanguage} aria-label="switch-language" icon={<GlobalOutlined />} />
            <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
              <Button type="primary">
                <span>{userName ?? '-'}</span>
              </Button>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ padding: 16, overflow: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
