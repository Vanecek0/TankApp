import { Action, ActionCreator, AnyAction, UnknownAction } from "redux";

interface CounterState {
    stepSize: number
    value: number
}

export const initialState = {
    stepSize: 2,
    value: 0,
}

export default (state: CounterState = initialState, { type, payload }: any): CounterState => {
    switch (type) {
        case 'CHANGE_COUNTER_STEP_SIZE_ACTION':
            return { ...state, stepSize: payload };
        case 'ADD_NEXT_STEP_ACTION':
            return { ...state, value: state.value + state.stepSize };
        default:
            return state
    }
} 