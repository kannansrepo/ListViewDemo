import { LOAD_PRODUCT, LOAD_PRODUCT_SUCCESS, LOAD_PRODUCT_FAIL } from './constant'

export default function reducer(state = {
    products: [],
    loading: false,
    ended: false,
    start: 1,
    limit: 10
}, action) {
    switch (action.type) {
        case LOAD_PRODUCT:
            return { ...state, loading: true };
        case LOAD_PRODUCT_SUCCESS:
            if (action.payload.data.length === 0) {
                return {
                    ...state,
                    ended: true
                };
            }
            console.log(state.start)
            return {
                ...state,
                loading: false,
                products: state.products.concat(action.payload.data),
                start: state.start + state.limit
            };
        case LOAD_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching products'
            };
        default:
            return state;
    }
}