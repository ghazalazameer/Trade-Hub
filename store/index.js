import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
// Removed the import of thunk since it's included in getDefaultMiddleware
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cart from "./cartSlice";
import expandSidebar from "./ExpandSlice";
import dialog from "./DialogSlice";

const reducers = combineReducers({ cart, expandSidebar, dialog });

const config = {
  key: "root",
  storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: true,
});

export default store;