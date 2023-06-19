const Post = require("../models/post");
const User = require("../models/user");

const nonExistingId = async () => {
  const post = new Post({title: "willremovethissoon", url: "notreal"});
  await post.save();
  await post.deleteOne();
  return post._id.toString();
};

const postsInDb = async () => {
  const posts = await Post.find({});
  return posts.map((post) => post.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  nonExistingId,
  postsInDb,
  usersInDb,
};
