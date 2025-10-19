'use client';

import { useState } from 'react';
import { Table, Button, Space, Tag, message, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Option } = Select;

interface TraineeType {
  _id: string;
  name: string;
  email: string;
}

interface ScheduleType {
  _id: string;
  title: string;
  trainer: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface BookingType {
  _id: string;
  trainee: TraineeType;
  schedule: ScheduleType;
  status: 'BOOKED' | 'CANCELLED' | 'COMPLETED';
  bookedAt: string;
}

const BookingManagementPage = () => {
  // Mock bookings
  const [bookings, setBookings] = useState<BookingType[]>([
    {
      _id: '1',
      trainee: { _id: '68f36a23b9d8f49321f14e90', name: 'Alice Johnson', email: 'alice@email.com' },
      schedule: {
        _id: '68f369b7b9d8f49321f14e8e',
        title: 'Yoga Basics',
        trainer: 'John Doe',
        date: '2025-10-20',
        startTime: '09:00',
        endTime: '11:00',
      },
      status: 'BOOKED',
      bookedAt: '2025-10-18T14:25:41.762Z',
    },
    {
      _id: '2',
      trainee: { _id: '68f36a23b9d8f49321f14e91', name: 'Robert Brown', email: 'robert@email.com' },
      schedule: {
        _id: '68f369b7b9d8f49321f14e8f',
        title: 'HIIT Training',
        trainer: 'Jane Smith',
        date: '2025-10-21',
        startTime: '13:00',
        endTime: '15:00',
      },
      status: 'CANCELLED',
      bookedAt: '2025-10-17T09:10:22.110Z',
    },
  ]);

  const handleChangeStatus = (bookingId: string, newStatus: BookingType['status']) => {
    setBookings((prev) =>
      prev.map((b) =>
        b._id === bookingId ? { ...b, status: newStatus } : b
      )
    );
    message.success(`Booking status updated to ${newStatus}`);
  };

  const columns: ColumnsType<BookingType> = [
    {
      title: 'Trainee',
      dataIndex: ['trainee', 'name'],
      key: 'trainee',
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.trainee.name}</div>
          <div className="text-xs text-gray-500">{record.trainee.email}</div>
        </div>
      ),
    },
    {
      title: 'Class Title',
      dataIndex: ['schedule', 'title'],
      key: 'title',
    },
    {
      title: 'Trainer',
      dataIndex: ['schedule', 'trainer'],
      key: 'trainer',
    },
    {
      title: 'Date',
      dataIndex: ['schedule', 'date'],
      key: 'date',
      render: (date) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Time',
      key: 'time',
      render: (_, record) =>
        `${record.schedule.startTime} - ${record.schedule.endTime}`,
    },
    {
      title: 'Booked At',
      dataIndex: 'bookedAt',
      key: 'bookedAt',
      render: (date) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color =
          status === 'BOOKED'
            ? 'green'
            : status === 'COMPLETED'
            ? 'blue'
            : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Select
            value={record.status}
            style={{ width: 140 }}
            onChange={(value) => handleChangeStatus(record._id, value)}
          >
            <Option value="BOOKED">BOOKED</Option>
            <Option value="COMPLETED">COMPLETED</Option>
            <Option value="CANCELLED">CANCELLED</Option>
          </Select>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Booking Management</h1>
      </div>

      <Table
        columns={columns}
        dataSource={bookings}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default BookingManagementPage;
