import { createSlice } from "@reduxjs/toolkit";

const initialState =
  "http://ec2-18-218-163-145.us-east-2.compute.amazonaws.com";
// const initialState = "http://localhost";

const urlAPISlice = createSlice({
  name: "urlAPI",
  initialState,
  reducers: {},
});

// export const { setAnimationsDuration } = animationsDurationSlice.actions;
export default urlAPISlice.reducer;
