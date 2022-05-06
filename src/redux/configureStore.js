import { configureStore } from '@reduxjs/toolkit'
import User from "./modules/user";
import Post from "./modules/post";
import Card from './modules/card';

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
    card: Card, //이거 지워도 될듯?
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
})