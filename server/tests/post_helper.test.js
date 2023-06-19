const postHelper = require("./post_helper");

test("dummy returns one", () => {
  const posts = [];

  const result = postHelper.dummy(posts);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has only one post, equals the likes of that", () => {
    const result = postHelper.totalLikes(postHelper.listWithOnePost);
    expect(result).toBe(7);
  });

  test("when list has two posts, equals the total likes between them", () => {
    const result = postHelper.totalLikes(postHelper.listWithTwoPosts);
    expect(result).toBe(15);
  });
});

describe("favorite post", () => {
  test("post with most amount of likes", () => {
    const result = postHelper.favoritePost(postHelper.posts);
    expect(result).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});

describe("most posts", () => {
  test("author with the most posts, and number of posts", () => {
    const result = postHelper.mostPosts(postHelper.posts);
    expect(result).toEqual({
      author: "Robert C. Martin",
      posts: 3,
    });
  });
});

describe("most likes", () => {
  test("author whose post posts have most likes, along with amount of likes", () => {
    const result = postHelper.mostLikes(postHelper.posts);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});
