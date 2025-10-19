'use client';

import { useState, useEffect } from 'react';
import { Button, Form, Input, message, Card, Table, Space, Tag, Modal, Input as AntdInput } from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  LockOutlined, 
  EditOutlined, 
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useAddUserMutation, useGetAllTrainersQuery } from '@/redux/features/user/userApi';

interface TraineeType {
  _id: string;
  name: string;
  email: string;
  role: 'TRAINEE';
  status: 'active' | 'inactive';
  createdAt: string;
}

const TraineeManagementPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data:trainerData, isLoading} = useGetAllTrainersQuery([])
  const [createUser, {isLoading: isCreatingUser}] = useAddUserMutation()






  const columns: ColumnsType<TraineeType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Joined Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    
  ];

  const onFinish = async (values: any) => {
    try {
      
      const traineeData = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'TRAINER' as const
      };

      const res = await createUser(traineeData).unwrap()
      if(res.success){
        form.resetFields();
        setIsModalOpen(false);
        message.success(res.message || 'Trainee registered successfully');
      }

    } catch (error:any) {
      console.error('Error registering trainee:', error);
      message.error(error?.data?.message || 'Failed to register trainee');
    } 
  };


  const handleDelete = async (id: string) => {
    try {
      // In a real app, you would call your API here
      // await fetch(`/api/trainees/${id}`, { method: 'DELETE' });
      
      // For demo, remove from local state
  
      message.success('Trainee deleted successfully');
    } catch (error) {
      console.error('Error deleting trainee:', error);
      message.error('Failed to delete trainee');
    }
  };



  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trainer Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Trainer
        </Button>
      </div>

      

      <Table
        columns={columns}
        dataSource={trainerData?.data}
        rowKey="_id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title="Register New Trainer"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className="mt-6"
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please input full name!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Full Name" 
              size="large" 
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
              size="large" 
              type="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input password!' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Password" 
              size="large" 
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords do not match!');
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Confirm Password" 
              size="large" 
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isCreatingUser}
              className="w-full"
              size="large"
            >
              Register Trainer
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TraineeManagementPage;