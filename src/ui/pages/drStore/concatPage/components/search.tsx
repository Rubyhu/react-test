import { Button, Checkbox, Form, Input } from 'antd';
import type { FormInstance } from 'antd/es/form';
import React from 'react';

const SearchForm: React.FC = (props) => {
    const formRef = React.useRef<FormInstance>(null);
  const onFinish = (values: any) => {
    debugger
    console.log('Success:', values);
    props.onSearch(values);
  };

  const onFinishFailed = (errorInfo: any) => {

    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <Form
      name="nest-messages"
       layout="inline"
      ref={formRef}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="联系人名称"
        name="contactName"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="关联达人名称"
        name="anchorId"
      >
        <Input />
      </Form.Item>

       <Form.Item
        label="微信昵称"
        name="wechatNickname"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="微信微信号"
        name="wechatAccount"
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' ,marginTop: 12}}>  <Button type="primary" htmlType="submit">
          搜索
        </Button>
        
          <Button htmlType="button" onClick={onReset} style={{marginLeft: 8}}>
            重置
          </Button></div>
      
      </Form.Item>
    </Form>
  );
};

export default SearchForm;