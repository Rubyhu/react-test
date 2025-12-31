import { Button, Card, Form, Input, Space, Typography, message } from 'antd'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect,useState } from 'react'
import { authActions } from '../../store/slices/authSlice'
import { userApi } from '@/api/user'
import { getUserInfoAsync } from '../../store/slices/userSlice'
import { useDispatch,useSelector, } from 'react-redux'
import type { RootState } from '@/store/store'


type FormValues = {
  account: string
  password: string
}

export function LoginPage() {
     const [isLoading, setIsLoading ]  = useState(false)
  const { t } = useTranslation()
  const [form] = Form.useForm<FormValues>()
  const [params] = useSearchParams()
  const navigate = useNavigate()
 const dispatch = useDispatch()
  const token = useSelector((s:RootState) => s.auth.accessToken)


  useEffect(() => {
    if (token) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate, token])

  const onFinish = async (values:FormValues) => {
    setIsLoading(true)
    const result:any = await userApi.login()
    if ('accessToken' in result) {
      dispatch(authActions.setCredentials({ accessToken: result.accessToken }))
          dispatch(getUserInfoAsync(values))
      const redirect = params.get('redirect')
      navigate(redirect ? decodeURIComponent(redirect) : '/dashboard', { replace: true })
      setIsLoading(false)
      return
    }

    const code = (result as { code?: string }).code
    if (code === 'AUTH_INVALID_CREDENTIALS') {
      message.error(t('invalidCredentials'))
      setIsLoading(false)
      return
    }
    setIsLoading(false)
    message.error((result as { message?: string }).message ?? 'Error')
  }

  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Card style={{ width: 360 }}>
        <Space orientation="vertical" size={16} style={{ width: '100%' }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {t('login')}
          </Typography.Title>
          <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
            <Form.Item name="account" label={t('account')} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label={t('password')} rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              {t('submit')}
            </Button>
          </Form>
          <Typography.Text>
            <Link to="/register">{t('goToRegister')}</Link>
          </Typography.Text>
          <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
            admin / admin123
          </Typography.Paragraph>
        </Space>
      </Card>
    </div>
  )
}
