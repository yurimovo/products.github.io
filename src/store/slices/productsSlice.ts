import { RootState } from '..';
import { Product } from '../../types/products';
import { createSlice } from '@reduxjs/toolkit';

interface ProductsState {
    productsList: Array<Product>;
}

const initialState: ProductsState = {
    productsList: [],
};

const productsSlice = createSlice({
    name: 'productsList',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.productsList = action.payload;
        },
        addProduct: (state, action) => {
            state.productsList.push(action.payload);
        },
        removeProduct: (state, action) => {
            state.productsList = state.productsList.filter(item => item.id !== action.payload.id);
        },
        updateProduct: (state, action) => {
            const product = state.productsList.find(item => item.id === action.payload.id);
            if (product) {
                product.title = action.payload.title;
                product.description = action.payload.description;
                product.price = action.payload.price;
                product.image = action.payload.image;
            }
        },
        toggleFavorite: (state, action) => {
            const product = state.productsList.find(item => item.id === action.payload.id);
            if (product) {
                product.isFavorite = !product.isFavorite;
            }
        },
    },
});

export const selectItemById = (state: RootState, id: number) =>
    state.productsList.productsList.find((item: Product) => item.id === id);

export const { setProducts, addProduct, removeProduct, updateProduct, toggleFavorite } = productsSlice.actions;

export default productsSlice.reducer;
