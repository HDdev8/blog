const postsRouter = require("express").Router();
const Post = require("../models/post");

postsRouter.get("/", async (req, res) => {
  const posts = await Post.find({}).populate("user", {username: 1, name: 1});
  res.json(posts);
});

postsRouter.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).end();
  }
});

postsRouter.post("/", async (req, res) => {
  const body = req.body;
  const user = req.user;

  const post = new Post({
    title: body.title,
    author: user.username,
    content: body.content,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedPost = await post.save();
  user.posts = user.posts.concat(savedPost._id);

  await user.save();
  res.json(savedPost);
});

postsRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const post = await Post.findById(req.params.id);

  const postObject = {
    title: post.title,
    author: post.author,
    content: post.content,
    url: post.url,
    likes: body.likes,
    user: post.user,
  };

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, postObject, {
    new: true,
    runValidators: true,
    context: "query",
  });

  res.json(updatedPost);
});

postsRouter.delete("/:id", async (req, res) => {
  const user = req.user;
  const post = await Post.findById(req.params.id);

  if (user.username === post.author) {
    const deletedPost = await Post.findByIdAndRemove(req.params.id);
    const postId = deletedPost._id;

    user.posts.pull(postId);
    await user.save();

    res.status(204).end();
  } else {
    res.status(401).end();
  }
});

module.exports = postsRouter;
