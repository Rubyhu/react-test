import { Card, Descriptions } from 'antd'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'

export function ProfilePage() {
  const { t } = useTranslation()
  const profile = useSelector((s:RootState) => s.user.profile)
  const roles = useSelector((s:RootState) => s.user.roles)

  return (
    <Card title={t('profile')}>
      <Descriptions column={1}>
        <Descriptions.Item label="ID">{profile?.id ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="Name">{profile?.name ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="Roles">{roles.join(', ') || '-'}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
