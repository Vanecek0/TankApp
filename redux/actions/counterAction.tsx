import { RootState } from '../store'

export const changeCounterStepSizeAction = (stepSize: number) => {
    return {
        type: "CHANGE_COUNTER_STEP_SIZE_ACTION",
        payload: stepSize
    }
}

export const addNextStepAction = () => {
    return (dispatch: any, getState: () => RootState) => {
        const { stepSize } = getState().count
        dispatch({
            type: 'ADD_NEXT_STEP_ACTION',
            payload: stepSize
        })
    }
}