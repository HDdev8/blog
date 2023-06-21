import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    // baseUrl: "/api",
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
      providesTags: (result = [], error, arg) => [
        "Post",
        ...result.map(({id}) => ({type: "Post", id})),
      ],
    }),
    getUsers: builder.query({
      query: () => "/users",
      providesTags: (result = [], error, arg) => [
        "User",
        ...result.map(({id}) => ({type: "User", id})),
      ],
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{type: "Post", id}],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{type: "User", id}],
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Post"],
    }),
    addNewUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    updatePost: builder.mutation({
      query: (patch) => ({
        url: `posts/${patch.id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted(patch, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPostById", patch.id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, {id}) => [{type: "Post", id}],
    }),
    deletePost: builder.mutation({
      query(post) {
        return {
          url: `posts/${post.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, {id}) => [{type: "Post", id}],
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
