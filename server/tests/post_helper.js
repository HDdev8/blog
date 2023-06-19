const listWithOnePost = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
];

const listWithTwoPosts = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
];

const posts1 = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "644cb113a96739b67aa4474e",
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: "644cb113a96739b67aa4474e",
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: "644cb113a96739b67aa4474e",
    __v: 0,
  },
];
const posts2 = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "644cb226d0d3588400e46a60",
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: "644cb226d0d3588400e46a60",
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: "644cb226d0d3588400e46a60",
    __v: 0,
  },
];

const dummy = (posts) => {
  return posts.length === 0 ? (posts.length = 1) : (posts.length = 1);
};

const totalLikes = (posts) => {
  const pluck = (objs, key) => objs.map((obj) => obj[key]);
  let likesArray = pluck(posts, "likes");
  return likesArray.reduce((a, b) => a + b);
};

const favoritePost = (posts) => {
  const sortBy = (arr, key) => arr.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));
  const sorted = sortBy([...posts], "likes");
  return sorted[sorted.length - 1];
};

const mostPosts = (postList) => {
  const listCopy = [...postList];
  const countBy = (arr, fn) =>
    arr.map(typeof fn === "function" ? fn : (val) => val[fn]).reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
  const counted = countBy([...listCopy], "author");
  const authorArray = Object.entries(counted);
  const [a, b] = authorArray[authorArray.length - 1];
  return {
    author: a,
    posts: b,
  };
};

const mostLikes = (postList) => {
  const sortBy = (arr, key) => arr.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0));
  const sorted = sortBy([...postList], "likes");
  const author = sorted[sorted.length - 1];
  return {
    author: author.author,
    likes: author.likes,
  };
};

module.exports = {
  posts1,
  posts2,
  dummy,
  totalLikes,
  favoritePost,
  mostPosts,
  mostLikes,
  listWithTwoPosts,
  listWithOnePost,
};
