import { configureStore } from "@reduxjs/toolkit";
import User from "./modules/user";
import Post from "./modules/post";
import Chat from "./modules/chat";
import Notification from "./modules/notification";
import UserPage from "./modules/userpage";

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
    chat: Chat,
    userpage: UserPage,
    notification: Notification,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middlewares),
});
