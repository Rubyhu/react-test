import { Button, Card, Form, Input, Space, Typography, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect,useState } from 'react'

import { userApi } from '@/api/user'
import type { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

type FormValues = {
  account: string
  password: string
  confirmPassword: string
}

export function RegisterPage() {
    const [isLoading, setIsLoading ]  = useState(false)
  const { t } = useTranslation()
  const [form] = Form.useForm<FormValues>()
  const navigate = useNavigate()
  const token = useSelector((s:RootState) => s.auth.accessToken)

  useEffect(() => {
    if (token) navigate('/dashboard', { replace: true })
  }, [navigate, token])

  const onFinish = async (values: FormValues) => {
    setIsLoading(true)
    if (values.password !== values.confirmPassword) {
      message.error(t('passwordNotMatch'))
      setIsLoading(false)
      return
    }

    const result:any = await userApi.register()

    if ('success' in result && result.success) {
      message.success(t('registerSuccess'))
      navigate('/login', { replace: true })
      setIsLoading(false)
      return
    }

    const code = (result as { code?: string }).code
    if (code === 'AUTH_ACCOUNT_EXISTS') {
         setIsLoading(true)
      message.error(t('accountExists'))
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
            {t('register')}
          </Typography.Title>
          <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
            <Form.Item name="account" label={t('account')} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label={t('password')} rules={[{ required: true, min: 6 }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="confirmPassword" label={t('confirmPassword')} rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              {t('submit')}
            </Button>
          </Form>
          <Typography.Text>
            <Link to="/login">{t('goToLogin')}</Link>
          </Typography.Text>
        </Space>
      </Card>
    </div>
  )
}
