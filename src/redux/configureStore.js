import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

import User from "./modules/user";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: User,
  router: connectRouter(history),
});

const middlewares = [routerMiddleware(history)];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//       })
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
  // enhancers: enhancer,
})