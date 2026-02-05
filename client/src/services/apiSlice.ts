import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BASE_URI
    : "/api";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUser: builder.query({
      query: (id: string) => `/user/${id}`,
      providesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: ({ id, data }: { id: string; data: FormData }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getUsers: builder.query({
      query: () => "/user/users",
      providesTags: ["User"],
    }),
  }),
});

export const {
    useRegisterUserMutation,
    useGetUsersQuery,
    useGetUserQuery,
    useEditUserMutation
} = apiSlice;
