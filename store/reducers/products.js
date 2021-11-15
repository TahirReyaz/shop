import PRODUCTS from '../../data/dummy-data';
import { DEL_PRODUCT } from '../actions/products';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default (state = initialState, action) => {
  switch(action.type) {
    case DEL_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          prod => prod.id !== action.prodId
        ),
        availableProducts: state.availableProducts.filter(
          prod => prod.id !== action.prodId
        )
      };
  }
  return state;
}