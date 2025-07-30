import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  loading: false,
  users: [],
  user: null,
  total: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    setUsersTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;

export const { setUserLoading, setUsers, setUser, setUsersTotal } =
  userSlice.actions;
