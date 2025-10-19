'use client';

import { Button, Table, Space, Tag, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';


interface UserType {
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'TRAINER' | 'TRAINEE';
  status: 'active' | 'inactive';
}

const UserManagementPage = () => {
  const { data: userData, isLoading } = useGetAllUsersQuery([]);
  console.log(userData);
  
  


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
    
  ];







  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>

      </div>

      <Table
      loading={isLoading}
        columns={columns}
        dataSource={userData?.data}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />

     
    </div>
  );
};

export default UserManagementPage;