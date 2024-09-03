import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SliderState {
    pageNumber: number;
};

const initialState: SliderState = {
    pageNumber: 1
};

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        setPageNumber(state, action: PayloadAction<{ 
            pageNumber: number | 0, 
        }>) {
            state.pageNumber = action.payload.pageNumber;
        },
    },
});

export const { setPageNumber } = sliderSlice.actions;

export default sliderSlice.reducer;