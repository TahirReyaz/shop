export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
// export const SET_FILTERS = 'SET_FILTERS';

export const addToCart = prod => {
  return {type: ADD_TO_CART, product: prod}
}

export const removeFromCart = prodId => {
  return {type: REMOVE_FROM_CART, id: prodId}
}

// export const setFilters = filters => {
//   return {type: SET_FILTERS, filters: filters }
// }