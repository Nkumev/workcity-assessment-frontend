import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState: AuthState = {
  loggedIn: false,
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<Partial<AuthState>>) => {
      state = {
        ...state,
        ...action.payload,
      };

      return state;
    },
  },
});

export const { setAuthState } = authSlice.actions;

const reducer = authSlice.reducer;

const persistConfig: PersistConfig<AuthState> = {
  key: "auth",
  storage,
  whitelist: ["loggedIn", "email"],
};

export const authReducer = persistReducer(persistConfig, reducer);
