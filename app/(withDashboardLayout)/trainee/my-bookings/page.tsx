"use client";

import { useState } from "react";
import { Table, Tag, Button, Space, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

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
  const [bookings, setBookings] = useState<Booking[]>([
    {
      _id: "1",
      schedule: {
        _id: "68f369b7b9d8f49321f14e8e",
        title: "Yoga Basics",
        date: "2025-10-20",
        startTime: "09:00",
        endTime: "11:00",
        trainer: { _id: "68f35923f78c9aa49753be78", name: "John Doe" },
      },
      status: "BOOKED",
      bookedAt: "2025-10-18T14:25:41.762Z",
    },
    {
      _id: "2",
      schedule: {
        _id: "68f369b7b9d8f49321f14e8f",
        title: "HIIT Training",
        date: "2025-10-21",
        startTime: "13:00",
        endTime: "15:00",
        trainer: { _id: "68f35923f78c9aa49753be79", name: "Jane Smith" },
      },
      status: "BOOKED",
      bookedAt: "2025-10-17T09:10:22.110Z",
    },
    {
      _id: "3",
      schedule: {
        _id: "68f369b7b9d8f49321f14e90",
        title: "Zumba Dance",
        date: "2025-10-22",
        startTime: "17:00",
        endTime: "19:00",
        trainer: { _id: "68f35923f78c9aa49753be80", name: "Mike Johnson" },
      },
      status: "COMPLETED",
      bookedAt: "2025-10-15T10:05:12.000Z",
    },
  ]);

  const handleCancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: "CANCELLED" } : b))
    );
    message.success("Booking cancelled successfully");
  };

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
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "BOOKED" ? (
          <Popconfirm
            title="Are you sure you want to cancel this booking?"
            onConfirm={() => handleCancelBooking(record._id)}
          >
            <Button danger size="small">
              Cancel
            </Button>
          </Popconfirm>
        ) : (
          <span className="text-gray-400">N/A</span>
        ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <Table
        columns={columns}
        dataSource={bookings}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default TraineeMyClasses;
