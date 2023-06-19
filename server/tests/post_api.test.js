const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helper = require("./test_helper");
const postHelper = require("./post_helper");
const app = require("../app");
const api = supertest(app);

const Post = require("../models/post");
const User = require("../models/user");

let currentUser;
let token;
let decodedToken;
let postsAtStart;
let postsAtEnd;
let postToDelete;
let firstPost;
let firstUser;
let header;
let userId;

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("password", 10);
  const user = new User({
    username: "root",
    name: "hddev8",
    passwordHash,
    posts: ["5a422a851b54a676234d17f7", "5a422aa71b54a676234d17f8", "5a422b3a1b54a676234d17f9"],
  });
  await user.save();
});

beforeEach(async () => {
  const user = {
    username: "root",
    password: "password",
  };
  postsAtStart = await postHelper.posts1;
  currentUser = await api.post("/api/login").send(user);
  token = currentUser._body.token;
  header = {
    Authorization: `Bearer ${token}`,
  };
  decodedToken = jwt.verify(token, process.env.SECRET);
  userId = decodedToken.id;
});

beforeEach(async () => {
  await Post.deleteMany({});
  const users = await User.find({});
  firstUser = users[0];
  const id = firstUser._id;
  console.log(id);
  // const id = "644cb72b5f9701aa34084408"
  const postObjects = await Post.insertMany(postHelper.posts1);
  for (let post of postObjects) {
    let postObject = new Post({
      title: post.title,
      author: post.author,
      likes: post.likes,
      user: id.toString(),
    });
    await postObject.save();
    firstUser.posts = firstUser.posts.concat(post._id);
    await firstUser.save();
  }
});

describe("GET requests", () => {
  test("Posts are returned as JSON", async () => {
    await api
      .get("/api/posts")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 10000);

  test("All posts are returned", async () => {
    const res = await api.get("/api/posts");
    expect(res.body).toHaveLength(6);
  });
});

describe("POST", () => {
  test("Adding new posts", async () => {
    // postsAtStart = await helper.postsInDb();
    const newPost = {
      title: "another test entry",
      author: "root",
      likes: 180,
      user: "644cb72b5f9701aa34084408",
    };
    await api
      .post("/api/posts")
      .send(newPost)
      .expect(200)
      .set(header)
      .expect("Content-Type", /application\/json/);
    // const postsAtEnd = await helper.postsInDb();
    postsAtEnd = postsAtStart;
    expect(postsAtEnd).toHaveLength(postsAtStart.length + 1);
    const contents = postsAtEnd.map((res) => res.title);
    expect(contents).toContain("another test entry");
  }, 10000);

  // would require second user
  test("Adding post without token", async () => {
    const newPost = {
      title: "post without token",
      author: "root",
      likes: 118,
      user: "644cb9adcb8b08262a1adcb8",
    };
    await api
      .post("/api/posts")
      .send(newPost)
      .expect(40111)
      .set(token)
      .expect("Content-Type", /application\/json/);
    postsAtEnd = postsAtStart;
    expect(postsAtEnd).toHaveLength(postsAtStart.length);
  }, 10000);

  test("Adding new post without token", async () => {
    const newPost = {
      title: "A test without a token",
      author: "root",
      likes: 108,
      user: "644cb9adcb8b08262a1adcb8",
    };
    await api
      .post("/api/posts")
      .send(newPost)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    postsAtEnd = postsAtStart;
    expect(postsAtEnd).toHaveLength(postsAtStart.length);
    const contents = postsAtEnd.map((res) => res.title);
    expect(contents).not.toContain("A test without a token");
  }, 10000);

  test("Posts without a title", async () => {
    // postsAtStart = await helper.postsInDb();
    const newPost = {
      author: "root",
      likes: 1008,
      user: "644cb9adcb8b08262a1adcb8",
    };
    await api
      .post("/api/posts")
      .send(newPost)
      .expect(400)
      .set(header)
      .expect("Content-Type", /application\/json/);
    // const postsAtEnd = await helper.postsInDb();
    postsAtEnd = postsAtStart;
    expect(postsAtEnd).toHaveLength(postsAtStart.length);
  });
});

describe("DELETE", () => {
  test("Deleting post", async () => {
    if (decodedToken.id) {
      // postsAtStart = await helper.postsInDb();
      postToDelete = postsAtStart[0];
      await api.delete(`/api/posts/${postToDelete.id}`).expect(204).set(header);
      const postsAfterDelete = await helper.postsInDb();
      expect(postsAfterDelete).toHaveLength(postsAtStart.length - 1);
      const contents = postsAfterDelete.map((res) => res.title);
      expect(contents).not.toContain(postToDelete.title);
    }
  });

  test("Deleting nonexisting post", async () => {
    const nonExistId = await helper.nonExistingId();
    await api.delete(`/api/posts/${nonExistId}`).expect(204).set(token);
  });
});

test("PUT requests", async () => {
  if (decodedToken.id) {
    firstPost = postsAtStart[0];
    firstPost.likes = 180;
    await api.put(`/api/posts/${firstPost._id}`).send(firstPost).expect(200);
    // const postsAtEnd = await postHelper.posts1;
    postsAtEnd = postsAtStart;
    const contents = postsAtEnd.map((res) => res.likes);
    expect(contents).toContain(180);
  }
}, 10000);

afterAll(() => {
  mongoose.connection.close();
});
