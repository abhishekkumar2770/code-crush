import { createSlice } from "@reduxjs/toolkit";

const connectionsFeedSlice = createSlice({
    name: 'connectionsFeed',
    initialState: [],
    reducers: {
        addConnectionsFeed: (state, action) => action.payload,
        removeConnectionsFeed: (state, action) => [],
    }
});

export const { addConnectionsFeed, removeConnectionsFeed } = connectionsFeedSlice.actions;

export default connectionsFeedSlice.reducer;

