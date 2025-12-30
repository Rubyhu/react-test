import { Card, Table } from 'antd'
import { useTranslation } from 'react-i18next'

type Row = { id: string; account: string; role: string }

const data: Row[] = [
  { id: 'u_admin', account: 'admin', role: 'admin' },
]

export function UsersPage() {
  const { t } = useTranslation()

  return (
    <Card title={t('users')}>
      <Table<Row>
        rowKey="id"
        dataSource={data}
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'Account', dataIndex: 'account' },
          { title: 'Role', dataIndex: 'role' },
        ]}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  )
}

