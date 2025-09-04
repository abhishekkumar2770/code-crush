import { createSlice } from "@reduxjs/toolkit";

const requestsFeedSlice = createSlice({
    name: 'requestsFeed',
    initialState: null,
    reducers: {
        addRequestsFeed: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const newArray = state.filter((r) => r._id !== action.payload);
            return newArray;
        }
    }
});

export const { addRequestsFeed, removeRequest } = requestsFeedSlice.actions;

export default requestsFeedSlice.reducer;