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
  SearchOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import type { ColumnsType } from 'antd/es/table';

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
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trainees, setTrainees] = useState<TraineeType[]>([]);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  // Mock data - replace with API call
  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockTrainees: TraineeType[] = [
          {
            _id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'TRAINEE',
            status: 'active',
            createdAt: '2025-10-15T10:30:00Z'
          },
          {
            _id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'TRAINEE',
            status: 'inactive',
            createdAt: '2025-10-16T14:20:00Z'
          }
        ];
        
        setTrainees(mockTrainees);
      } catch (error) {
        console.error('Error fetching trainees:', error);
        message.error('Failed to load trainees');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainees();
  }, []);

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
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      
      const traineeData = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'TRAINEE' as const
      };

      console.log('Registering trainee:', traineeData);
      
      // In a real app, you would call your API here
      // const response = await fetch('/api/trainees', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(traineeData),
      // });
      // const data = await response.json();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, add to local state
      const newTrainee = {
        ...traineeData,
        _id: Date.now().toString(),
        status: 'active' as const,
        createdAt: new Date().toISOString()
      };
      
      setTrainees([...trainees, newTrainee]);
      
      message.success('Trainee registered successfully');
      form.resetFields();
      setIsModalOpen(false);
      
    } catch (error) {
      console.error('Error registering trainee:', error);
      message.error('Failed to register trainee');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: TraineeType) => {
    // Implement edit functionality
    message.info('Edit functionality to be implemented');
  };

  const handleDelete = async (id: string) => {
    try {
      // In a real app, you would call your API here
      // await fetch(`/api/trainees/${id}`, { method: 'DELETE' });
      
      // For demo, remove from local state
      setTrainees(trainees.filter(trainee => trainee._id !== id));
      message.success('Trainee deleted successfully');
    } catch (error) {
      console.error('Error deleting trainee:', error);
      message.error('Failed to delete trainee');
    }
  };

  const filteredTrainees = trainees.filter(
    trainee =>
      trainee.name.toLowerCase().includes(searchText.toLowerCase()) ||
      trainee.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trainee Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Trainee
        </Button>
      </div>

      

      <Table
        columns={columns}
        dataSource={filteredTrainees}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title="Register New Trainee"
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
              loading={loading}
              className="w-full"
              size="large"
            >
              Register Trainee
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TraineeManagementPage;