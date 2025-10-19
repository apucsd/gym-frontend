'use client';

import { useState } from 'react';
import {
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  Select,
  TimePicker,
  DatePicker,
  InputNumber,
  Tag,
  message,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Option } = Select;

interface ScheduleType {
  _id?: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  trainer: string; // trainer ID
  maxTrainees: number;
  status?: 'active' | 'cancelled' | 'completed';
}

interface Trainer {
  _id: string;
  name: string;
}

const ScheduleManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleType | null>(null);

  // Mock trainers
  const [trainers] = useState<Trainer[]>([
    { _id: '68f35923f78c9aa49753be78', name: 'John Doe' },
    { _id: '68f35923f78c9aa49753be79', name: 'Jane Smith' },
  ]);

  // Mock schedule data
  const [schedules, setSchedules] = useState<ScheduleType[]>([
    {
      _id: '1',
      title: 'Zym For All',
      date: '2025-10-19',
      startTime: '09:00',
      endTime: '11:00',
      trainer: '68f35923f78c9aa49753be78',
      maxTrainees: 10,
      status: 'active',
    },
    {
      _id: '2',
      title: 'HIIT Session',
      date: '2025-10-20',
      startTime: '13:00',
      endTime: '15:00',
      trainer: '68f35923f78c9aa49753be79',
      maxTrainees: 15,
      status: 'active',
    },
  ]);

  // --- Table Columns ---
  const columns: ColumnsType<ScheduleType> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Trainer',
      dataIndex: 'trainer',
      key: 'trainer',
      render: (trainerId) => {
        const trainer = trainers.find((t) => t._id === trainerId);
        return trainer ? trainer.name : 'Unknown';
      },
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
      title: 'Max Trainees',
      dataIndex: 'maxTrainees',
      key: 'maxTrainees',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 'active' ? 'green' : status === 'completed' ? 'blue' : 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id!)} />
        </Space>
      ),
    },
  ];

  // --- Handlers ---
  const showModal = () => {
    setEditingSchedule(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const newSchedule: ScheduleType = {
        _id: editingSchedule ? editingSchedule._id : Date.now().toString(),
        title: values.title,
        date: values.date.format('YYYY-MM-DD'),
        startTime: values.time[0].format('HH:mm'),
        endTime: values.time[1].format('HH:mm'),
        trainer: values.trainer,
        maxTrainees: values.maxTrainees,
        status: 'active',
      };

      if (editingSchedule) {
        setSchedules((prev) =>
          prev.map((s) => (s._id === editingSchedule._id ? newSchedule : s))
        );
        message.success('Schedule updated successfully');
      } else {
        setSchedules((prev) => [...prev, newSchedule]);
        message.success('Schedule added successfully');
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error('Failed to submit schedule');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: ScheduleType) => {
    setEditingSchedule(record);
    form.setFieldsValue({
      title: record.title,
      trainer: record.trainer,
      date: dayjs(record.date),
      time: [dayjs(record.startTime, 'HH:mm'), dayjs(record.endTime, 'HH:mm')],
      maxTrainees: record.maxTrainees,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s._id !== id));
    message.success('Schedule deleted successfully');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Schedule Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add New Schedule
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={schedules}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title={editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Class Title"
            rules={[{ required: true, message: 'Please enter class title' }]}
          >
            <Input placeholder="e.g., Zym For All" />
          </Form.Item>

          <Form.Item
            name="trainer"
            label="Trainer"
            rules={[{ required: true, message: 'Please select a trainer' }]}
          >
            <Select placeholder="Select trainer">
              {trainers.map((t) => (
                <Option key={t._id} value={t._id}>
                  {t.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select date' }]}
          >
            <DatePicker className="w-full" format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            name="time"
            label="Time Range"
            rules={[{ required: true, message: 'Please select start and end time' }]}
          >
            <TimePicker.RangePicker className="w-full" format="HH:mm" />
          </Form.Item>

          <Form.Item
            name="maxTrainees"
            label="Maximum Trainees"
            rules={[{ required: true, message: 'Please enter max trainees' }]}
          >
            <InputNumber min={1} max={50} className="w-full" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ScheduleManagementPage;
