import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  search: "",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
