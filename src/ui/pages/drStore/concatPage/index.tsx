import { Card, Space, Table, Button, Avatar, Typography } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import SearchForm from './components/search'
import styles from './index.module.css'
import { useEffect, useState } from 'react';

const { Text } = Typography;

export function ConcatPage() {
  
  interface AssociatedTalent {
    avatar?: string;
    name?: string;
    douyinId?: string;
    isGroup?: boolean; // To represent the +2 case
    count?: number;
  }

  interface DataType {
    key: string;
    userInfo: {
      avatar?: string;
      name: string;
      wechatId: string;
      phone: string;
    };
    addTime: string;
    associatedTalents: AssociatedTalent[];
    source: string;
    isWechatAdded: boolean;
    remark: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '联系人信息',
      dataIndex: 'userInfo',
      key: 'userInfo',
      width: 300,
      render: (userInfo) => (
        <Space align="start">
          <Avatar size={48} src={userInfo.avatar} icon={<UserOutlined />} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text strong>{userInfo.name}</Text>
            <Text type="secondary">微信号 {userInfo.wechatId || '-'}</Text>
            <Text type="secondary">手机号 {userInfo.phone}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: '添加时间',
      dataIndex: 'addTime',
      key: 'addTime',
      width: 150,
      render: (text) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text>{text.split(' ')[0]}</Text>
            <Text type="secondary">{text.split(' ')[1]}</Text>
        </div>
      )
    },
    {
      title: '关联达人',
      dataIndex: 'associatedTalents',
      key: 'associatedTalents',
      width: 250,
      render: (talents: AssociatedTalent[]) => (
        <Space direction="vertical">
          {talents.map((talent, index) => {
             if (talent.isGroup) {
                 return (
                     <Avatar.Group key={index}>
                         <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                         <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                         <Avatar style={{ backgroundColor: 'red' }}>+{talent.count}</Avatar>
                     </Avatar.Group>
                 )
             }
             return (
                <Space key={index}>
                    <Avatar src={talent.avatar} icon={<UserOutlined />} />
                    {talent.name && (
                         <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Space size={4}>
                                <Text strong>{talent.name}</Text>
                            </Space>
                            {talent.douyinId && <Text type="secondary" style={{ fontSize: 12 }}>抖音号：{talent.douyinId}</Text>}
                        </div>
                    )}
                </Space>
             )
          })}
        </Space>
      ),
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '是否添加微信',
      dataIndex: 'isWechatAdded',
      key: 'isWechatAdded',
      render: (val) => val ? '是' : '否',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      render: (text) => (
        <Space>
          <EditOutlined style={{ color: '#ff4d4f' }} /> 
          <Text>{text || '-'}</Text>
        </Space>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <a style={{ color: '#ff4d4f' }}>关联达人</a>
          <a style={{ color: '#ff4d4f' }}>解绑达人</a>
          <a style={{ color: '#ff4d4f' }}>修改信息</a>
          <a style={{ color: '#ff4d4f' }}>删除</a>
        </div>
      ),
    },
  ];
 const dataRes: DataType[] = [
    {
      key: '1',
      userInfo: {
        name: 'abcd',
        wechatId: '-',
        phone: '13888888888',
        avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1'
      },
      addTime: '2025-11-07 10:28:09',
      associatedTalents: [
          { 
              avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
              isGroup: true,
              count: 2
          }
      ],
      source: '后台',
      isWechatAdded: true,
      remark: ''
    },
    {
      key: '2',
      userInfo: {
        name: '小沫爱妈妈!',
        wechatId: '-',
        phone: '13888888888',
        avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3'
      },
      addTime: '2025-11-07 13:56:50',
      associatedTalents: [
          {
              avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=4',
              name: '小沫爱妈妈!',
              douyinId: '438762953754031'
          }
      ],
      source: '后台',
      isWechatAdded: false,
      remark: ''
    },
    {
      key: '3',
      userInfo: {
        name: '12314',
        wechatId: '-',
        phone: '13888888888',
        avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=5'
      },
      addTime: '2025-11-07 10:28:09',
      associatedTalents: [
        {
            avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=6',
            name: '12314',
            douyinId: '12314'
        }
      ],
      source: '后台',
      isWechatAdded: false,
      remark: ''
    },
    {
        key: '4',
        userInfo: {
          name: '',
          wechatId: '-',
          phone: '17131151157',
          avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=7'
        },
        addTime: '2025-10-13 17:27:52',
        associatedTalents: [
            {
                isGroup: true,
                count: 2
            }
        ],
        source: '小程序',
        isWechatAdded: true,
        remark: ''
      }, {
        key: '5',
        userInfo: {
          name: '',
          wechatId: '-',
          phone: '17131151157',
          avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=7'
        },
        addTime: '2025-10-13 17:27:52',
        associatedTalents: [
            {
                isGroup: true,
                count: 2
            }
        ],
        source: '小程序',
        isWechatAdded: true,
        remark: ''
      }, {
        key: '6',
        userInfo: {
          name: '',
          wechatId: '-',
          phone: '17131151157',
          avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=7'
        },
        addTime: '2025-10-13 17:27:52',
        associatedTalents: [
            {
                isGroup: true,
                count: 2
            }
        ],
        source: '小程序',
        isWechatAdded: true,
        remark: ''
      },
       {
        key: '7',
        userInfo: {
          name: '',
          wechatId: '-',
          phone: '17131151157',
          avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=7'
        },
        addTime: '2025-10-13 17:27:52',
        associatedTalents: [
            {
                isGroup: true,
                count: 2
            }
        ],
        source: '小程序',
        isWechatAdded: true,
        remark: ''
      },
       {
        key: '8',
        userInfo: {
          name: '',
          wechatId: '-',
          phone: '17131151157',
          avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=7'
        },
        addTime: '2025-10-13 17:27:52',
        associatedTalents: [
            {
                isGroup: true,
                count: 2
            }
        ],
        source: '小程序',
        isWechatAdded: true,
        remark: ''
      },
  ];
  const [searchParam,setSearchParam]=useState({})

  const [pageInfo,setPageInfo]=useState({
    current: 1,
    pageSize: 5,
    total: 8,
    showSizeChanger: true,
    showQuickJumper: true,
    defaultCurrent: 1,
    defaultPageSize: 5,
    showTotal: (total) => `共 ${total} 条`,
    onChange:(current,pageSize)=>{
        setPageInfo(prev => ({
            ...prev,
            current,
            pageSize,
        }))

      
    },
    onShowSizeChange:(current,pageSize)=>{
         setPageInfo(prev => ({
            ...prev,
            current,
            pageSize,
        }))

    }
  })
  const [tableData,setTableData]=useState<DataType[]>([])

  const onSearchEvent = (values: any) => {
    console.log('onSearch', values)
    setSearchParam(pre=>({
        ...pre,
        ...values
    }))
     setPageInfo(prev => ({
            ...prev,
            current:1,
        }))
  }
  
  const getList = () => {
      // Mock fetch
      const start = (pageInfo.current - 1) * pageInfo.pageSize;
      const end = start + pageInfo.pageSize;
      const endIndex=Math.min(end,dataRes.length)
      const arr = dataRes.slice(start, endIndex);
      setTableData(arr)
  }
  useEffect(() => {
    getList()
  }, [pageInfo,searchParam])


  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <Card title={'联系人'}>
        <SearchForm onSearch={(values)=>onSearchEvent(values)} />
        <div className={styles['mt-24']}>  
            <Button type="primary">新建联系人</Button>
        </div>
      
        <Table 
            rowSelection={{ type: 'checkbox' }}
            columns={columns} 
            dataSource={tableData} 
            pagination={pageInfo}
            className={styles['mt-24']}
        />
      </Card>
    </Space>
  )
}
