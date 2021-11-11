export const ADD_TO_CART = 'ADD_TO_CART';
// export const SET_FILTERS = 'SET_FILTERS';

export const addToCart = prod => {
  return {type: ADD_TO_CART, product: prod}
}

// export const setFilters = filters => {
//   return {type: SET_FILTERS, filters: filters }
// }