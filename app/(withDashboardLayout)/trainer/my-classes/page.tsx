"use client";

import { useState } from "react";
import { Table, Tag, Space, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import {
  useDeleteClassMutation,
  useGetAllClassesQuery,
} from "@/redux/features/class/classApi";
import { useAppSelector } from "@/redux/hooks";
import { FaTrashAlt } from "react-icons/fa";

interface TrainerClass {
  _id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  maxTrainees: number;
  bookedTrainees: number;
  status: "active" | "completed" | "cancelled";
  trainer: string;
}

const TrainerMyClasses = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: classesData, isLoading } = useGetAllClassesQuery([]);
  const myClasses = classesData?.filter(
    (cls: TrainerClass) => cls?.trainer === user?.id
  );
  const [deleteClass, { isLoading: deleteLoading }] = useDeleteClassMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteClass(id).unwrap();
      if (res?.success) {
        message.success(res?.message || "Class deleted successfully");
      }
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to delete class");
    }
  };

  const columns: ColumnsType<TrainerClass> = [
    {
      title: "Class Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Time",
      key: "time",
      render: (_, record) => `${record?.startTime} - ${record?.endTime}`,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => handleDelete(record?._id)}
            icon={<FaTrashAlt />}
            size="small"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Classes</h1>
      <Table
        columns={columns}
        dataSource={myClasses}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default TrainerMyClasses;
