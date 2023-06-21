const express = require("express");
// const path = require('path')
const mongoose = require("mongoose");
const config = require("./utils/config");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const logger = require("./utils/logger");
require("express-async-errors");

const middleware = require("./utils/middleware");
const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
const postsRouter = require("./controllers/posts");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

// const buildPath = path.join(__dirname, 'dist')

app.use(helmet());
app.use(cors());
// app.use(express.static(buildPath))
app.use(express.static("dist"));
app.use(express.json());


// app.get('*', (req, res) => {
//   res.sendFile(path.join(buildPath, 'index.html'))
// })



app.use(middleware.requestTime);
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", middleware.userExtractor, postsRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;









