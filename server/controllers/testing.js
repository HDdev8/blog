const testingRouter = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");

testingRouter.post("/reset", async (req, res) => {
  await Post.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

module.exports = testingRouter;
