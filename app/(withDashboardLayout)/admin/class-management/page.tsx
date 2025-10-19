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
  message,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import {
  useAddClassMutation,
  useDeleteClassMutation,
  useGetAllClassesQuery,
  useUpdateClassMutation,
} from '@/redux/features/class/classApi';
import { useGetAllTrainersQuery } from '@/redux/features/user/userApi';

interface ScheduleType {
  _id?: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  trainer: string;
  maxTrainees: number;
  status?: 'active' | 'cancelled' | 'completed';
}

const ScheduleManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingSchedule, setEditingSchedule] = useState<ScheduleType | null>(null);

  const { data: scheduleData, isLoading } = useGetAllClassesQuery([]);
  const { data: trainerData, isLoading: trainerLoading } = useGetAllTrainersQuery([]);
  const [addClass, { isLoading: isAddingClass }] = useAddClassMutation();
  const [updateClass, { isLoading: isUpdatingClass }] = useUpdateClassMutation();
  const [deleteClass, { isLoading: isDeletingClass }] = useDeleteClassMutation();

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
        const trainer = trainerData?.data?.find((t: any) => t._id === trainerId);
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            loading={isDeletingClass}
            onClick={() => handleDelete(record._id!)}
          />
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

      const formattedSchedule: ScheduleType = {
        title: values.title,
        date: values.date.format('YYYY-MM-DD'),
        startTime: values.time[0].format('HH:mm'),
        endTime: values.time[1].format('HH:mm'),
        trainer: values.trainer,
        maxTrainees: values.maxTrainees,
        status: 'active',
      };

      let res;
      if (editingSchedule) {
        // ✅ Update existing class
        res = await updateClass({ id: editingSchedule._id, data: formattedSchedule }).unwrap();
        if (res.success) message.success(res.message || 'Schedule updated successfully');
      } else {
        // ✅ Add new class
        res = await addClass(formattedSchedule).unwrap();
        if (res.success) message.success(res.message || 'Schedule added successfully');
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch (err: any) {
      console.error(err);
      message.error(err?.data?.message || 'Failed to submit schedule');
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

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this schedule?',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        try {
          const res = await deleteClass(id).unwrap();
          if (res.success) {
            message.success(res.message || 'Schedule deleted successfully');
          }
        } catch (err: any) {
          console.error(err);
          message.error(err?.data?.message || 'Failed to delete schedule');
        }
      },
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Schedule Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          Add New Schedule
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={scheduleData || []}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        loading={isLoading}
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title={editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        confirmLoading={isAddingClass || isUpdatingClass}
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
            <Select
              loading={trainerLoading}
              placeholder="Select trainer"
            >
              {trainerData?.data?.map((t: any) => (
                <Select.Option key={t._id} value={t._id}>
                  {t.name}
                </Select.Option>
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
