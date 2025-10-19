import { baseApi } from "./baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmin: build.mutation({
      query: (data) => {
        return {
          url: "/create-admin",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllAdmin: build.query({
      query: (args) => {
       
        return {
          url: `/get-admin/${args.id}`,
          method: "GET",
          body: args.data
        };
      },
    }),
    
  }),
});

export const { useCreateAdminMutation,useGetAllAdminQuery} = adminApi;
