import { createSlice } from '@reduxjs/toolkit';
import type { templateSliceType } from '../../models/redux/templateType';

let initialState: templateSliceType = {
  templateString: '',
};

export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplateString(state, action) {
      state.templateString = action.payload;
    },
    resetTemplateStringToInitalState(state) {
      state.templateString = initialState.templateString;
    },
  },
});

export const { setTemplateString } = templateSlice.actions;

export default templateSlice.reducer;
