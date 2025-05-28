import { Tanking } from '@/models/Tanking';
import { Station } from '@/models/Station';
import { createSlice } from '@reduxjs/toolkit';
import { loadMoreTankings } from '../actions/tankingAction';

export type TankingRecord = Tanking & { station: Station };

interface TankingState {
    records: TankingRecord[];
}

export const initialState: TankingState = {
    records: []
}

const tankingSlice = createSlice({
    name: 'tanking',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadMoreTankings.fulfilled, (state, action) => {
            state.records.push(...action.payload);
        });
    }
});

export default tankingSlice.reducer;