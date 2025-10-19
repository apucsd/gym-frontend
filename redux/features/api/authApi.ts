import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (data) => {
        return {
          url: "/create-user",
          method: "POST",
          body: data,
        };
      },
    }),
    loginUser: build.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
    createUser: build.mutation({
      query: (data) => {
        return {
          url: "users/create-user",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useCreateUserMutation,
} = authApi;
