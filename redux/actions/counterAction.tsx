import type { AppDispatch, RootState } from '../store';
import { addNextStep, changeStepSize } from '../reducers/counterReducer'

export const changeCounterStepSizeAction = (stepSize: number) => (dispatch: AppDispatch) => {
  dispatch(changeStepSize(stepSize));
};

export const addNextStepAction = () => (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(addNextStep());
};