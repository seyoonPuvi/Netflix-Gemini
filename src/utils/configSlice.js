import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    prefferedLang: "en",
  },
  reducers: {
    setLanguage: (state, action) => {
      state.prefferedLang = action.payload;
    },
  },
});

export const { setLanguage } = configSlice.actions;

export default configSlice.reducer;
