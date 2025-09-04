import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: [],
    reducers: {
        addFeed: (state, action) => action.payload,
        removeFeed: (state, action) => [],
        removeUser: (state, action) => {
            const newArray = state.filter((user) => user._id !== action.payload);
            return newArray;
        }
    }
});

export const { addFeed, removeFeed, removeUser } = feedSlice.actions;

export default feedSlice.reducer;