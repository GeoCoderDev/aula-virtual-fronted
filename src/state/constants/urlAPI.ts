import { createSlice } from "@reduxjs/toolkit";

const initialState = "https://api.aula-virtual-jbsf.com";
// const initialState = "http://localhost";

const urlAPISlice = createSlice({
  name: "urlAPI",
  initialState,
  reducers: {},
});

// export const { setAnimationsDuration } = animationsDurationSlice.actions;
export default urlAPISlice.reducer;
