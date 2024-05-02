import { ReduxPayload } from "@/interfaces/ReducersPayload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

const myTokenSlice = createSlice({
  name: "myToken",
  initialState,
  reducers: {
    setMyToken(state, action: PayloadAction<ReduxPayload<string | undefined>>) {
      return action.payload.value;
    },
}});

export const { setMyToken } = myTokenSlice.actions;
export default myTokenSlice.reducer;
