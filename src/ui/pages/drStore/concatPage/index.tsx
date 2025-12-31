import { Card, Space, Table, Tag, Button} from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { useTranslation } from 'react-i18next'
import SearchForm from './components/search'
import styles from './index.module.css'



export function ConcatPage() {
  const { t } = useTranslation()
  interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
  const onSearchEvent = (values: any) => {
    debugger
    console.log('onSearch', values)
    getList()
  }
  const getList = () => {
      
  }

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <Card title={'联系人'}>
        <SearchForm onSearch={(values)=>onSearchEvent(values)} />
            <div className={styles['mt-24']}>  
                <Button type="primary">新建联系人</Button>
                </div>
      
        <Table columns={columns} dataSource={data} />
      </Card>
    </Space>
  )
}
