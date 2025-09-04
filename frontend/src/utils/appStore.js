import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import feedReducer from "./feedSlice.js";
import connectionsFeedReducer from "./connectionsSlice.js";
import requestsFeedReducer from "./requestsSlice.js";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connectionsFeed: connectionsFeedReducer,
        requestsFeed: requestsFeedReducer,
    },
});

export default appStore;