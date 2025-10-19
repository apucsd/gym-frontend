'use client';

import { useState } from 'react';
import { Button, Table, Space, Select, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';


interface UserType {
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'TRAINER' | 'TRAINEE';
  status: 'active' | 'inactive';
}

const UserManagementPage = () => {
  
  
  // Mock data - replace with API call
  const [users, setUsers] = useState<UserType[]>([{
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'ADMIN',
    status: 'active'
  }, {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'TRAINER',
    status: 'active'
  }, {
    _id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'TRAINEE',
    status: 'inactive'
  }]);

  const columns: ColumnsType<UserType> = [
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
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'ADMIN' },
        { text: 'Trainer', value: 'TRAINER' },
        { text: 'Trainee', value: 'TRAINEE' },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role: string) => (
        <Tag color={role === 'ADMIN' ? 'red' : role === 'TRAINER' ? 'blue' : 'green'}>
          {role.charAt(0) + role.slice(1).toLowerCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
        
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record._id)} 
          />
        </Space>
      ),
    },
  ];






  const handleDelete = async (id: string) => {
    try {
      // In a real app, you would call your API here
      // await api.deleteUser(id);
      
      // For demo, just remove from local state
      setUsers(users.filter(user => user._id !== id));
      message.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Failed to delete user');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>

      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />

     
    </div>
  );
};

export default UserManagementPage;