"use client";
import { useBookClassMutation } from "@/redux/features/booking/bookingApi";
import { useGetAllClassesQuery } from "@/redux/features/class/classApi";
import { useAppSelector } from "@/redux/hooks";
import { message, Modal } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

interface Trainer {
  _id: string;
  name: string;
  email: string;
}

interface ClassType {
  _id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  trainer: Trainer | string;
  maxTrainees: number;
}

const Service = () => {
  const { data: classes, isLoading } = useGetAllClassesQuery({});
  const [bookClass, {isLoading: isBooking}] = useBookClassMutation()
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleBookNow = (cls: ClassType) => {
    if (!user) {
      message.error("Please login first to book a class!");
      router.push("/auth/login");
      return;
    }

    Modal.confirm({
      title: `Confirm Booking`,
      content: (
        <div>
          <p>
            Are you sure you want to book{" "}
            <strong>{cls.title}</strong> on{" "}
            {dayjs(cls.date).format("MMMM D, YYYY")}?
          </p>
        </div>
      ),
      centered: true,
      okText: "Yes, Book It",
      cancelText: "Cancel",
      okButtonProps: { type: "primary" },
      onOk: async () => {
        try {
            const bookData = {
                trainee: user.id,
                schedule: cls._id,
                status: "BOOKED",
                bookedAt: new Date()
            }
           const res = await bookClass(bookData).unwrap()   
           if(res.success){
            message.success("Class booked successfully!");
            router.push("/trainee/my-bookings");
           }
        } catch (err: any) {
          message.error(err?.data?.message || "Failed to book the class. Please try again.");
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading classes...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Available Classes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes?.map((cls: ClassType) => {
          const trainer =
            typeof cls.trainer === "object"
              ? cls.trainer
              : { name: "Unknown Trainer", email: "" };
          const formattedDate = dayjs(cls.date).format("MMMM D, YYYY");

          return (
            <div
              key={cls._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {cls.title}
                </h2>

                <div className="space-y-2 text-gray-600 mb-4">
                  <p>{formattedDate}</p>
                  <p>
                    {cls.startTime} - {cls.endTime}
                  </p>
                  <p>Trainer: {trainer.name}</p>
                  <p className="text-sm text-gray-500">{trainer.email}</p>
                  <p className="text-sm">
                    <span className="font-medium">Max Trainees:</span>{" "}
                    {cls.maxTrainees}
                  </p>
                </div>

                <button
                  onClick={() => handleBookNow(cls)}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Service;
