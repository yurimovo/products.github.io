import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
    isShowFavorites: boolean;
};

const initialState: FavoritesState = {
    isShowFavorites: false
};

const isFavoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setIsShowFavorites(state, action: PayloadAction<{ 
            isShowFavorites: boolean | false, 
        }>) {
            state.isShowFavorites = action.payload.isShowFavorites;
        },
    },
});

export const { setIsShowFavorites } = isFavoritesSlice.actions;

export default isFavoritesSlice.reducer;