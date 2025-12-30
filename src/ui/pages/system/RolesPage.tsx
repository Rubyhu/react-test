import { Card, Table } from 'antd'
import { useTranslation } from 'react-i18next'

type Row = { id: string; name: string }

const data: Row[] = [
  { id: 'r_admin', name: 'admin' },
  { id: 'r_user', name: 'user' },
]

export function RolesPage() {
  const { t } = useTranslation()

  return (
    <Card title={t('roles')}>
      <Table<Row>
        rowKey="id"
        dataSource={data}
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'Name', dataIndex: 'name' },
        ]}
        pagination={false}
      />
    </Card>
  )
}

