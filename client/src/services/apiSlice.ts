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
    registerUser: builder.mutation<any, any>({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
    useRegisterUserMutation,
} = apiSlice;
