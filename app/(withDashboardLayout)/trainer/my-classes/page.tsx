'use client';

import { useState } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

interface TrainerClass {
  _id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  maxTrainees: number;
  bookedTrainees: number;
  status: 'active' | 'completed' | 'cancelled';
}

const TrainerMyClasses = () => {
  const [classes, setClasses] = useState<TrainerClass[]>([
    {
      _id: '1',
      title: 'Yoga Basics',
      date: '2025-10-20',
      startTime: '09:00',
      endTime: '11:00',
      maxTrainees: 10,
      bookedTrainees: 7,
      status: 'active',
    },
    {
      _id: '2',
      title: 'HIIT Training',
      date: '2025-10-21',
      startTime: '13:00',
      endTime: '15:00',
      maxTrainees: 10,
      bookedTrainees: 10,
      status: 'active',
    },
    {
      _id: '3',
      title: 'Zumba Dance',
      date: '2025-10-22',
      startTime: '17:00',
      endTime: '19:00',
      maxTrainees: 10,
      bookedTrainees: 5,
      status: 'completed',
    },
  ]);

  const columns: ColumnsType<TrainerClass> = [
    {
      title: 'Class Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Time',
      key: 'time',
      render: (_, record) => `${record.startTime} - ${record.endTime}`,
    },
    {
      title: 'Booked Trainees',
      key: 'bookedTrainees',
      render: (_, record) => `${record.bookedTrainees} / ${record.maxTrainees}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color =
          status === 'active'
            ? 'green'
            : status === 'completed'
            ? 'blue'
            : 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          {record.status === 'active' && (
            <Button
              size="small"
              onClick={() => {
                // Optional: mark as completed
                setClasses((prev) =>
                  prev.map((cls) =>
                    cls._id === record._id
                      ? { ...cls, status: 'completed' }
                      : cls
                  )
                );
              }}
            >
              Mark Completed
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Classes</h1>
      <Table
        columns={columns}
        dataSource={classes}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default TrainerMyClasses;
