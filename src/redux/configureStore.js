import { configureStore } from '@reduxjs/toolkit'
import User from "./modules/user";

const middlewares = [];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}


export default configureStore({
  reducer: {
    user: User,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
})