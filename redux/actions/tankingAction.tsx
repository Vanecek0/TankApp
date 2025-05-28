import { createAsyncThunk } from '@reduxjs/toolkit';
import { TankingModel } from '@/models/Tanking';
import type { RootState } from '../store';
import type { TankingRecord } from '../reducers/tankingReducer';

export const loadMoreTankings = createAsyncThunk<TankingRecord[], void, { state: RootState }>
    (
        'tanking/loadMore',
        async (_, thunkAPI) => {
            const state = thunkAPI.getState();
            const { value, stepSize } = state.count;

            const data = await TankingModel.getNextTankingsWithStation(value, stepSize);
            return data;
        }
    );