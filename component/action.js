import {LOAD_PRODUCT} from './constant'

export function listProducts(start, limit) {
    return {
      type: LOAD_PRODUCT,
      payload: {
        request: {
          url: `posts?_start=${start}&_limit=${limit}`
        }
      }
    }

}