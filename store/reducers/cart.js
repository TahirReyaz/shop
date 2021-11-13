import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
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
      const prodId = addedProduct.id;

      if(state.items[addedProduct.id]) { //Item already exists in the cart
        const updatedCartItem = new CartItem(
          title,
          price, 
          state.items[addedProduct.id].qty + 1,
          state.items[addedProduct.id].price + price,
          prodId
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem},
          totalAmount: state.totalAmount + price
        }
      } else { // New Item in cart
        const newItem = new CartItem(title, price, 1, price, prodId);
        return {
          ...state,
          items: {...state.items, [addedProduct.id]: newItem},
          totalAmount: state.totalAmount + price
        }
      }
    break;
    case REMOVE_FROM_CART: 
      const itemId = action.id;
      const selectedItem = state.items[itemId];
      let updatedCartItems;
      if(selectedItem.qty <= 1) { // If qty is one then remove the item from the cart
        updatedCartItems = {...state.items};
        delete updatedCartItems[itemId];
      } else { // Else decrease the quantity and price
        const updatedCartItem = new CartItem(
          selectedItem.title,
          selectedItem.price,
          selectedItem.qty - 1,
          selectedItem.sum - selectedItem.price,
          itemId
        );
        updatedCartItems = {...state.items, [itemId]: updatedCartItem}
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedItem.price
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