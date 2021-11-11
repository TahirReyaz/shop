import PRODUCTS from "../../data/dummy-data";
import { ADD_TO_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const price = addedProduct.price;
      const title = addedProduct.title;

      if(item[addedProduct.id]) { //Item already exists in the cart
        const updatedCartItem = new CartItem(
          title,
          price, 
          state.items[addedProduct.id].qty + 1,
          price + state.items[addedProduct.id].qty
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem},
          totalAmount: state.totalAmount + price
        }
      } else { // New Item in cart
        const newItem = new CartItem(title, price, 1, price);
        return {
          ...state,
          items: {...state.items, [addedProduct.id]: newItem},
          totalAmount: state.totalAmount + price
        }
      }
    // case SET_FILTERS:
    //   const appliedFilters = action.filters;
    //   const updatedFilteredAnimes = state.allAnimes.filter(anime => {
    //     if(!appliedFilters.tv && anime.type === 'TV') {
    //       return false;
    //     } 
    //     if(!appliedFilters.movie && anime.type === 'Movie') {
    //       return false;
    //     }
    //     if(!appliedFilters.ova && anime.type === 'OVA') {
    //       return false;
    //     }
    //     if(!appliedFilters.ona && anime.type === 'ONA') {
    //       return false;
    //     }
    //     if(!appliedFilters.special && anime.type === 'Special') {
    //       return false;
    //     }
    //     if(!appliedFilters.music && anime.type === 'Music') {
    //       return false;
    //     }
    //     if(!appliedFilters.unknown && anime.type === 'Unknown') {
    //       return false;
    //     }
    //     return true;
    //   })
    //   return {...state, filteredAnimes: updatedFilteredAnimes}
    default: 
      return state;
  }
  return state;
}