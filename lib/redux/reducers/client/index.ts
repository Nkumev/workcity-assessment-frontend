import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ClientState = {
  loading: true,
  clients: [],
  client: null,
  total: 0,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setClients: (state, action: PayloadAction<IClient[]>) => {
      state.clients = action.payload;
    },
    setClient: (state, action: PayloadAction<IClient | null>) => {
      state.client = action.payload;
    },
    setClientTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

export const { setClientLoading, setClients, setClient, setClientTotal } =
  clientSlice.actions;
export const clientReducer = clientSlice.reducer;
