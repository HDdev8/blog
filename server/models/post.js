const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {type: String, minLength: 1, required: true},
  author: {type: String, default: ""},
  content: {type: String, default: ""},
  url: {type: String, default: ""},
  likes: {type: Number, default: 0},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
