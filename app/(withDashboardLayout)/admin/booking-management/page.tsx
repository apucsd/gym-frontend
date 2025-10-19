'use client';

import { Table, Button, Space, Tag, message, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useGetAllBookingsQuery, useUpdateBookingStatusMutation } from '@/redux/features/booking/bookingApi';

const { Option } = Select;

interface TraineeType {
  _id: string;
  name: string;
  email: string;
}

interface ScheduleType {
  _id: string;
  title: string;
  trainer: any;
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
  const { data: bookingData, isLoading } = useGetAllBookingsQuery([]);
  const [updateBookingStatus] = useUpdateBookingStatusMutation();


  const handleChangeStatus = async(bookingId: string, newStatus: BookingType['status']) => {
    try {
      const res = await updateBookingStatus({ id: bookingId, status: newStatus }).unwrap();
      if(res.success){
        message.success(res.message || 'Booking status updated successfully');
      }
    } catch (error:any) {
      message.error(error?.data?.message || 'Failed to update booking status');
    }
  };

  const columns: ColumnsType<BookingType> = [
    {
      title: 'Trainee',
      dataIndex: ['trainee', 'name'],
      key: 'trainee',
      render: (_, record) => (
        <div>
          <div className="font-medium">{record?.trainee?.name}</div>
          <div className="text-xs text-gray-500">{record?.trainee?.email}</div>
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
      render: (_, record :any) => record?.schedule?.trainer?.name,
    },
    {
      title: 'Date',
      dataIndex: ['schedule', 'date'],
      key: 'date',
      render: (date) => dayjs(date).format('YYYY-MM-DD'),
    },
    // {
    //   title: 'Time',
    //   key: 'time',
    //   render: (_, record) =>
    //     `${record.schedule.startTime} - ${record.schedule.endTime}`,
    // },
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
        loading={isLoading}
        columns={columns}
        dataSource={bookingData}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default BookingManagementPage;
