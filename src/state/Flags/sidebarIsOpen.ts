import { ReduxPayload } from "@/interfaces/ReducersPayload";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = false;

const sidebarIsOpenSlice = createSlice({
  name: "sidebarIsOpened",
  initialState,
  reducers: {
    switchSidebarIsOpen(state, action) {
      return !state;
    },
    setSidebarIsOpen(state, action: PayloadAction<ReduxPayload<boolean>>) {
      return action.payload.value;
    },
  },
});

export const { setSidebarIsOpen, switchSidebarIsOpen } =
  sidebarIsOpenSlice.actions;
export default sidebarIsOpenSlice.reducer;
