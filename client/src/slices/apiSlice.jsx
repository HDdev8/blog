/* eslint-disable default-param-last */
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import axios from "axios";
import postService from "../services/posts";
import {useSelector, useDispatch} from "react-redux";
import {selectCurrentUserToken} from "./userSlice";

const postSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    setPosts(state, action) {
      return action.payload;
    },
    appendPost(state, action) {
      state.push(action.payload);
    },
    update(state, action) {
      const postToUpdate = action.payload;
      return state.map((b) => (b.id !== postToUpdate.id ? b : postToUpdate));
    },
    remove(state, action) {
      const postToDelete = action.payload;
      return state.filter((b) => b.id !== postToDelete.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializePostz.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const {setPosts, appendPost, update, remove} = postSlice.actions;
export default postSlice.reducer;

// export const initializePostz = createAsyncThunk("posts/initializePostz", async () => {
//   const response = await postService.getAll();
//   return response;
// });

export const initializePostz = createAsyncThunk("posts/initializePostz", async () => {
  const response = await axios.get(`http://localhost:3001/api/posts`);
  return response.data;
});

export const initializePosts = async (dispatch) => {
  const posts = await postService.getAll();
  await dispatch(setPosts(posts));
};

// const create = async (newObject) => {
//   const config = {
//     headers: {Authorization: token},
//   };
//   const response = await axios.post(baseUrl, newObject, config);
//   console.log("postService create parseJwt", parseJwt(token));
//   return response.data;
// };

export const createPost = async (dispatch, postObject) => {
  const newPost = await postService.create(postObject);
  await dispatch(appendPost(newPost));
};

// const update = async (postObject) => {
// const config = {
//   headers: {Authorization: token},
// };
//   const {id} = postObject;
//   const response = await axios.put(`${baseUrl}/${id}`, postObject, config);
//   return response.data;
// };

export const updatePost = async (dispatch, postObject) => {
  const updatedPost = await postService.update(postObject);
  await dispatch(update(updatedPost));
};

export const getPostPost = async (dispatch, postObject) => {
  const post = await postService.getPost(postObject);
  return post;
};

export const removePost = async (dispatch, postObject) => {
  await postService.deletePost(postObject);
  await dispatch(remove(postObject));
};

// let token = null;
// let token;
// export const setToken = (newToken) => {
//   token = `Bearer ${newToken}`;
// };

// export const setToken = (newToken) => {
//   token = newToken;
//   console.log("setToken token", token);
// };

// const config = {
//   headers: {Authorization: token},
// };

// const create = async (newObject) => {
//   const config = {
//     headers: {Authorization: token},
//   };
//   const response = await axios.post(baseUrl, newObject, config);
//   return response.data;
// };
// export const createPost = async (dispatch, postObject) => {
//   const newPost = await postService.create(postObject);
//   await dispatch(appendPost(newPost));
// };
// const postPost = async (e) => {
//   e.preventDefault();
//   const postObject = {
//     title: newTitle,
//     content: newContent,
//     author: currentUser.username,
//   };
//   try {
//     await createPost(dispatch, postObject);
//     setNewTitle("");
//     setNewContent("");
//     successNotification(dispatch, `You created a new post: "${postObject.title}"`);
//   } catch (exception) {
//     errorNotification(dispatch, exception.response.data.error);
//   }
// };
// const addUser = async (credentials) => {
//   const response = await axios.post(baseUrl, credentials);
//   return response.data;
// };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    prepareheaders: (headers, {getState}) => {
      const token = getState().users.currentUser.token;
      if (token) {
        console.log("apiSlice token", token);
        headers.set("authorization", `Bearer ${token}`);
        console.log("apiSlice headers", headers);
      }
      return headers;
    },
  }),
  tagTypes: ["Post", "User", "Login"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    setUser: builder.mutation({
      query: (userCredentials) => ({
        url: "/login",
        method: "POST",
        body: userCredentials,
      }),
      invalidatesTags: ["Login"],
    }),
    protected: builder.mutation({
      query: () => "protected",
    }),
    getPosts: builder.query({
      query: () => "/posts",
      // providesTags: ["Post"],
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
      // providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, arg) => [{type: "User", id: arg}],
    }),
    setToken: builder.mutation({
      query: (userToken) => ({
        url: "/posts",
        method: "POST",
        body: userToken,
      }),
      invalidatesTags: ["Post"],
      // invalidatesTags: ["User"],
    }),
    addNewUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: {initialPost, config},
      }),
      invalidatesTags: ["Post"],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `posts/${post.id}`,
        // method: "PATCH",
        method: "PUT",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{type: "Post", id: arg.id}],
    }),
    addLike: builder.mutation({
      query: (post) => ({
        // url: `posts/${postId}/likes`,
        url: `posts/${post.id}`,
        // method: "PATCH",
        method: "PUT",
        // body: {post, config},
        body: post,
      }),
      async onQueryStarted(post, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPosts", undefined, (draftObject) => {
            const updatedPost = draftObject.find((b) => b.id === post.id);
            if (updatedPost) {
              updatedPost.likes++;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    addReaction: builder.mutation({
      query: ({postId, reaction}) => ({
        url: `posts/${postId}`,
        method: "POST",
        body: {reaction},
      }),
      invalidatesTags: (result, error, arg) => [{type: "Post", id: arg.postId}],
    }),
    // getPostById: builder.query({
    //   query: (id) => `/posts/${id}`,
    //   providesTags: (result, error, arg) => [{type: "Post", id: arg}],
    // }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{type: "Post", id}],
    }),
    getPost: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{type: "Post", id}],
    }),
    updateThePost: builder.mutation({
      query: ({id, ...patch}) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: patch,
        headers: apiSlice.headers,
      }),
      async onQueryStarted({id, ...patch}, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPostById", id, (draft) => {
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
    deleteThePost: builder.mutation({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{type: "Post", id}],
    }),
  }),
});

export const {
  useAddLikeMutation,
  useAddNewPostMutation,
  useAddNewUserMutation,
  useLoginMutation,
  useProtectedMutation,
  useSetUserMutation,
  useSetTokenMutation,
  useAddReactionMutation,
  useEditPostMutation,
  useGetPostByIdQuery,
  useGetPostsQuery,
  useGetUserByIdQuery,
  useGetUsersQuery,
  useUpdateThePostMutation,
  useDeleteThePostMutation,
} = apiSlice;
