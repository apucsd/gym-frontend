import { baseApi } from "@/redux/base/baseApi";

const classApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllClasses: builder.query({
            query: () => ({
                url: '/schedules',
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['Class']
        }),
        addClass: builder.mutation({
            query: (data: any) => ({
                url: '/schedules',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: ['Class']
        }),
        updateClass: builder.mutation({
            query: ({id, data}: any) => ({
                url: `/schedules/${id}`,
                method: 'PATCH',
                body: data,
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: ['Class']
        }),
        deleteClass: builder.mutation({
            query: (id: string) => ({
                url: `/schedules/${id}`,
                method: 'DELETE',
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: ['Class']
        }),
    })
})

export const { useGetAllClassesQuery, useAddClassMutation, useUpdateClassMutation, useDeleteClassMutation } = classApi