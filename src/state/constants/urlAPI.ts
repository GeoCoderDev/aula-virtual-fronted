import { ReduxPayload } from "@/interfaces/ReducersPayload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "http://localhost";

const urlAPISlice = createSlice({
  name: "urlAPI",
  initialState,
  reducers: {

  },
});

// export const { setAnimationsDuration } = animationsDurationSlice.actions;
export default urlAPISlice.reducer;
