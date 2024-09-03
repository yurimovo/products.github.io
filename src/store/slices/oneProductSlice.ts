import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
    productId: number;
};

const initialState: ProductState = {
    productId: 0
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductId(state, action: PayloadAction<{ 
            productId: number | 0, 
        }>) {
            state.productId = action.payload.productId;
        },
    },
});

export const { setProductId } = productSlice.actions;

export default productSlice.reducer;