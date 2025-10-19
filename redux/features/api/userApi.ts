import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTrainer: build.mutation({
      query: (data) => {
        return {
          url: "users/create-user",
          method: "POST",
          body: data,
        };
      },
    }),
    getTrainer: build.query({
      query: () => {
        return {
          url: "/users/get-user/TRAINER", // Pass 'role' as a query parameter
          method: "GET",
        };
      },
    }),
    getAdmin: build.query({
      query: () => {
        return {
          url: "/users/get-user/SUPER_ADMIN",
          method: "GET",
        };
      },
    }),
    getAllAdmin: build.query({
      query: (args) => {
        return {
          url: `/get-admin/${args.id}`,
          method: "GET",
          body: args.data,
        };
      },
    }),
    editTrainer: build.mutation({
      query: (data) => {
        return {
          url: "users/update-user", // Pass 'role' as a query parameter
          method: "PATCH",
          body: data,
        };
      },
    }),

    deleteTrainer: build.mutation({
      query: (id) => {
        return {
          url: `users/delete-user?id=${id}`, // Pass 'id' as a query parameter
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateTrainerMutation,
  useGetTrainerQuery,
  useEditTrainerMutation,
  useDeleteTrainerMutation,
  useGetAdminQuery,
} = userApi;
