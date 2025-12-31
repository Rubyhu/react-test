import { Card, Space, Statistic } from 'antd'
import { useTranslation } from 'react-i18next'

export function DrPage() {
  const { t } = useTranslation()

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <Card title={'达人库'}>
        <Space size={24} wrap>
          <Statistic title="UV" value={1280} />
          <Statistic title="PV" value={9456} />
          <Statistic title="Errors" value={3} />
        </Space>
      </Card>
    </Space>
  )
}
