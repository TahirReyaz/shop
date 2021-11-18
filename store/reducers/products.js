import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/products';
import { 
  DEL_PRODUCT, 
  CREATE_PRODUCT, 
  UPDATE_PRODUCT, 
  SET_PRODUCTS
} from '../actions/products';

const initialState = {
  availableProducts: [],
  userProducts: []
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
    case SET_PRODUCTS: 
      return {
        availableProducts: action.products,
        userProducts: action.userProducts
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.product.id,
        action.product.ownerId,
        action.product.title,
        action.product.imgUrl,
        action.product.desc,
        action.product.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
    case UPDATE_PRODUCT:
      const prodIndex = state.userProducts.findIndex(
        prod => prod.id === action.id
      );
      const updatedProduct = new Product(
        action.id,
        state.availableProducts[prodIndex].ownerId,
        action.product.title,
        action.product.imgUrl,
        action.product.desc,
        state.availableProducts[prodIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[prodIndex] = updatedProduct;
      const availableProdIndex = state.availableProducts.findIndex(
        prod => prod.id === action.id
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProdIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };
    default: 
      return state;
  }
  return state;
}