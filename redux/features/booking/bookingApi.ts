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
        getMyBookings: builder.query({
            query: () => ({
                url: '/bookings/my-bookings',
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
        }),
        bookClass: builder.mutation({
            query: (data) => ({
                url: `/bookings`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Booking']
        })
    })
})

export const { useGetAllBookingsQuery, useUpdateBookingStatusMutation, useGetMyBookingsQuery, useBookClassMutation } = bookingApi