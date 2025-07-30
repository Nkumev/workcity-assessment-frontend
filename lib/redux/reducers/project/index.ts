import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProjectState = {
  loading: false,
  projects: [],
  project: null,
  total: 0,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProjects: (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload;
    },
    setProject: (state, action: PayloadAction<IProject | null>) => {
      state.project = action.payload;
    },
    setProjectTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

export const { setProjectLoading, setProjects, setProject, setProjectTotal } =
  projectSlice.actions;
export const projectReducer = projectSlice.reducer;
