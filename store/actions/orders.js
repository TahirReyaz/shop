export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totAmt) => {
  return async dispatch => {
    const date = new Date();
    const response = await fetch(
      'https://shop-c9c03-default-rtdb.firebaseio.com/orders/u1.json', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        items: cartItems,
        amount: totAmt,
        date: date.toISOString()
      })
    });

    const resData = await response.json();
    dispatch({ 
      type: ADD_ORDER, 
      orderData: { 
        id: resData.name, 
        items: cartItems, 
        amount: totAmt, 
        date
      }
    });
  }
}