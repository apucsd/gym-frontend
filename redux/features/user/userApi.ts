import { baseApi } from "@/redux/base/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: (data: any) => ({
                url: '/users/create-user',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: ({id, data}: any) => ({
                url: `/users/update-user-by-id/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['User']
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: '/users/all-user',
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['User']
            }),
        getAllTrainers: builder.query({
            query: () => ({
                url: '/users/all-trainer',
                method: 'GET',
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ['User']
        }),
    })
})

export const { useGetAllUsersQuery, useGetAllTrainersQuery, useAddUserMutation } = userApi