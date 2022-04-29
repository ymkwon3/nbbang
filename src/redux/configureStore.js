import { configureStore } from '@reduxjs/toolkit'
import User from "./modules/user";
import Post from "./modules/post";

const middlewares = [];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}


export default configureStore({
  reducer: {
    user: User,
    post: Post,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
})