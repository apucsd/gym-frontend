import { baseApi } from "@/redux/base/baseApi"

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBookings: builder.query({
            query: () => ({
                url: '/bookings',
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['Booking']
        }),
        updateBookingStatus: builder.mutation({
            query: ({id, status}: { id: string; status: string }) => ({
                url: `/bookings/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Booking']
        })
    })
})

export const { useGetAllBookingsQuery, useUpdateBookingStatusMutation } = bookingApi