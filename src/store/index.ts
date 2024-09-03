import { configureStore } from "@reduxjs/toolkit";
import productsListReducer from "./slices/productsSlice";
import productReducer from "./slices/oneProductSlice";
import sliderReducer from "./slices/sliderSlice";
import favoritesReducer from "./slices/favoritesSlice";

export const reduxStore = configureStore({
    reducer: {
        productsList: productsListReducer,
        product: productReducer,
        slider: sliderReducer,
        favorites: favoritesReducer
    }
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
