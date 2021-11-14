export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totAmt) => {
  return { 
    type: ADD_ORDER, 
    orderData: {items: cartItems, amount: totAmt}
  };
}