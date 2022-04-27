import { createAction, createReducer } from "@reduxjs/toolkit";

// actions
const TEST = "TEST";

// actions creators
const setTest = createAction(TEST, (test) => ({ test }));

// initialState
const initialState = {
  test: 1,
};

// middlewares
const testDB = idList => {
  return async function (dispatch, getState, { history }) {
    history.push("/123123")
  };
};

// reducer
export default createReducer(initialState, (builder) => {
  builder
    .addCase(TEST, (state, action) => {
      state.test = 2;
    })
})

// return Action Creators to export
const actionCreator = {
  setTest,
  testDB,
};

export { actionCreator };
