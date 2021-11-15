import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DEL_PRODUCT } from "../actions/products";
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
          state.items[addedProduct.id].sum + price,
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
    case ADD_ORDER: 
      return initialState;
    case DEL_PRODUCT:
      if(!state.items[action.prodId]) {
        return state;
      }
      const updatedItems = {...state.items};
      const itemTotal = updatedItems[action.prodId].sum;
      delete updatedItems[action.prodId];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
      }
    default: 
      return state;
  }
  return state;
}