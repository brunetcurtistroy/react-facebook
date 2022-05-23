import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./root-reducer";

const debug = () => {
  return next => action => {
    // console.info(action.type, action);
    next(action);
  };
};

const composeEnhancer =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunkMiddleware)
    : composeWithDevTools(applyMiddleware(thunkMiddleware, debug));

export const store = createStore(rootReducer, composeEnhancer);
export const persistor = persistStore(store);
