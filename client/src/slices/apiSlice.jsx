import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, {getState}) => {
      const token = getState().user.currentUser.token;
      headers.set("authorization", `Bearer ${token}`);
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Post", "User", "Login"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: (result) =>
        result
          ? [...result.map(({id}) => ({type: "Post", id})), {type: "Post", id: "LIST"}]
          : [{type: "Post", id: "LIST"}],
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{type: "Post", id}],
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: [
        {type: "Post", id: "LIST"},
        {type: "User", id: "USER_LIST"},
        {type: "User", id: "LIST"},
      ],
    }),
    updatePost: builder.mutation({
      query: (patch) => ({
        url: `posts/${patch.id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, {id}) => [{type: "Post", id}],
    }),
    deletePost: builder.mutation({
      query(post) {
        return {
          url: `posts/${post.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [
        {type: "Post", id: "LIST"},
        {type: "User", id: "USER_LIST"},
        {type: "User", id: "LIST"},
      ],
    }),
    getUsers: builder.query({
      query: () => "/users",
      providesTags: (result) =>
        result
          ? [...result.map(({id}) => ({type: "User", id})), {type: "User", id: "LIST"}]
          : [{type: "User", id: "LIST"}],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [
        {type: "User", id},
        {type: "User", id: "USER_LIST"},
      ],
    }),
    addNewUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [{type: "User", id: "LIST"}],
    }),
    DeleteUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "DELETE",
        body: user,
      }),
      invalidatesTags: [{type: "User", id: "LIST"}],
    }),
    signIn: builder.mutation({
      query: (userCredentials) => ({
        url: "/login",
        method: "POST",
        body: userCredentials,
      }),
      invalidatesTags: ["Login"],
    }),
  }),
});

export const {
  useAddNewPostMutation,
  useAddNewUserMutation,
  useDeletePostMutation,
  useGetPostByIdQuery,
  useGetPostsQuery,
  useGetUserByIdQuery,
  useGetUsersQuery,
  useSignInMutation,
  useUpdatePostMutation,
} = apiSlice;
