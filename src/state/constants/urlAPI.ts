import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "http://ec2-3-140-253-127.us-east-2.compute.amazonaws.com";
//const initialState = "http://localhost";

const urlAPISlice = createSlice({
  name: "urlAPI",
  initialState,
  reducers: {},
});

// export const { setAnimationsDuration } = animationsDurationSlice.actions;
export default urlAPISlice.reducer;
