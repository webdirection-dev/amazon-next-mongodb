import {createSlice, createAsyncThunk, PayloadAction, AnyAction} from '@reduxjs/toolkit'
import {RootState, DetailsExtra} from './index'
import {IProduct} from '../types/types-app'
import Cookies from 'js-cookie'

interface IProductToCart extends IProduct{
    quantityThisProduct: number;
    localId: string;
}

type ICart = any
type TCartState = {
    status: string;
    error: null | string;
    cart: ICart | {};
    products: IProductToCart[];
    quantityAllItems: number;
}

const initialState: TCartState = {
    status: 'idle', // loading | successful | rejected
    error: null,
    cart: {},
    // products: [],
    products: Cookies.get('productsCookies') ? JSON.parse(Cookies.get('productsCookies') as string) : [],
    quantityAllItems: Cookies.get('quantityAllCookies') ? Number(JSON.parse(Cookies.get('quantityAllCookies') as string)) : 0,
    // quantityAllItems: 0,
}

export const getCart = createAsyncThunk<
    ICart,
    undefined,
    { extra: DetailsExtra; rejectValue: string }
>(
    '@@cart/get-cart',

    async (_, { extra: { client }, rejectWithValue }) => {
        return await client
            .get('/cart', {headers: {}})
            .then(({ data }) => data)
            .catch((err) => {return rejectWithValue(err.message)})
    }
)

const cartSlice = createSlice({
    name: '@@cart',
    initialState,
    reducers: {
        resetCart: () => initialState,

        addProductToCart: (state, action) => {
            const isInclude = state.products.find(i => i.slug === action.payload.slug)
            Cookies.set('quantityAllCookies', JSON.stringify(state.quantityAllItems +1))

            if (!isInclude) {
                const out = {
                    ...action.payload,
                    quantityThisProduct: 1,
                    localId: String(action.payload.slug + Math.random())
                }

                Cookies.set('productsCookies', JSON.stringify([...state.products, out]))

                return {
                    ...state,
                    quantityAllItems: state.quantityAllItems +1,
                    products: [...state.products, out],
                }
            } else {
                const products = state.products.map(i => {
                    if (i.slug === isInclude.slug) {
                        return {...i, quantityThisProduct: i.quantityThisProduct+1}
                    } else return i
                })
                Cookies.set('productsCookies', JSON.stringify(products))

                return {
                    ...state,
                    quantityAllItems: state.quantityAllItems +1,
                    products
                }
            }
        },

        managerQuantityThisItem: (state, action) => {
            const {localId, act} = action.payload
            let quantityAllItems = state.quantityAllItems

            const out = state.products.map(i => {
                if (i.localId === localId) {
                    if (act === 'dec' && i.quantityThisProduct > 0) {
                        if (quantityAllItems > 0) {
                            Cookies.set('quantityAllCookies', JSON.stringify(quantityAllItems -1))
                            quantityAllItems--
                        }

                        return (
                            {
                                ...i,
                                quantityThisProduct: i.quantityThisProduct - 1
                            }
                        )
                    }
                    if (act === 'inc') {
                        Cookies.set('quantityAllCookies', JSON.stringify(quantityAllItems +1))
                        quantityAllItems++
                        return (
                            {
                                ...i,
                                quantityThisProduct: i.quantityThisProduct + 1
                            }
                        )
                    }
                }
                return i
            })

            Cookies.set('productsCookies', JSON.stringify(out))
            return {
                ...state,
                quantityAllItems,
                products: out,
            }
        },

        removeProductFromCart: (state, action) => {
            const removeItem = action.payload.quantityThisProduct
            const products = state.products.filter(i => i.localId !== action.payload.localId)
            Cookies.set('quantityAllCookies', JSON.stringify(state.quantityAllItems - removeItem))
            Cookies.set('productsCookies', JSON.stringify(products))

            return {
                ...state,
                quantityAllItems: state.quantityAllItems - action.payload.quantityThisProduct,
                products
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getCart.fulfilled, (state, action) => {
                state.status = 'successful'
                state.cart = action.payload
            })

            .addMatcher(isLoading, (state) => {
                state.error = null
                state.status = 'loading'
            })

            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.status = 'rejected'
            })
    },
})

export const {managerQuantityThisItem, addProductToCart, removeProductFromCart} = cartSlice.actions
export const cartReducer = cartSlice.reducer

//selectors
export const selectCartInfo = (state: RootState) => ({
    status: state.cartReducer.status,
    error: state.cartReducer.error,
    cart: state.cartReducer.cart,
    products: state.cartReducer.products,
    productsLength: state.cartReducer.products.length,
    quantityAllItems: state.cartReducer.quantityAllItems,
    totalCost: state.cartReducer.products.reduce((prev, next) => prev + (next.price * next.quantityThisProduct), 0),
})

// //helpers
function isError(action: AnyAction) {
    return action.type.endsWith('rejected') && action.type.startsWith('@@cart')
}

function isLoading(action: AnyAction) {
    return action.type.endsWith('pending') && action.type.startsWith('@@cart')
}
