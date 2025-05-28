import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountState {
  value: number;
  stepSize: number;
}

export const initialState: CountState = {
  value: 0,
  stepSize: 1,
};

const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    changeStepSize(state, action: PayloadAction<number>) {
      state.stepSize = action.payload;
    },
    addNextStep(state) {
      state.value += state.stepSize;
    }
  }
});

export const { changeStepSize, addNextStep } = countSlice.actions;

export default countSlice.reducer;