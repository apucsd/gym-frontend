"use client";

import { useState } from "react";
import { Table, Tag, Button, Space, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useGetMyBookingsQuery, useUpdateBookingStatusMutation } from "@/redux/features/booking/bookingApi";

interface Trainer {
  _id: string;
  name: string;
}

interface Schedule {
  _id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  trainer: Trainer;
}

interface Booking {
  _id: string;
  schedule: Schedule;
  status: "BOOKED" | "CANCELLED" | "COMPLETED";
  bookedAt: string;
}

const TraineeMyClasses = () => {

  const {data: bookingData, isLoading} = useGetMyBookingsQuery([])
  const [updateBookingStatus] = useUpdateBookingStatusMutation()



  const columns: ColumnsType<Booking> = [
    {
      title: "Class Title",
      dataIndex: ["schedule", "title"],
      key: "title",
    },
    {
      title: "Trainer",
      dataIndex: ["schedule", "trainer", "name"],
      key: "trainer",
    },
    {
      title: "Date",
      dataIndex: ["schedule", "date"],
      key: "date",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Time",
      key: "time",
      render: (_, record) =>
        `${record.schedule.startTime} - ${record.schedule.endTime}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "BOOKED"
            ? "blue"
            : status === "COMPLETED"
            ? "green"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={bookingData}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default TraineeMyClasses;
