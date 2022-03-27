/* author bijitashya*/

import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./reducers/userReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  auth: authReducer,
});

let initialState = {};

const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
