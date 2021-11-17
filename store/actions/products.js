import Product from '../../models/products';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DEL_PRODUCT = 'DEL_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://shop-c9c03-default-rtdb.firebaseio.com/products.json'
      );

      if(!response.ok) {
        throw new Error('Something went wrong! Sad Emoji.');
      }
    
      const resData = await response.json();
      const loadedProducts = [];

      for(const key in resData) {
        loadedProducts.push(new Product(
          key,
          'u1',
          resData[key].title,
          resData[key].imgUrl,
          resData[key].desc,
          resData[key].price
        ))
      }
      dispatch({type: SET_PRODUCTS, products: loadedProducts});
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = (title, imgUrl, price, desc) => {
  return async dispatch => {
    const response = await fetch('https://shop-c9c03-default-rtdb.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        title,
        imgUrl,
        price,
        desc
      })
    });

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT, 
      product: {
        id: resData.name,
        title,
        imgUrl,
        price,
        desc
      }
    })
  }
};

export const updateProduct = (title, imgUrl, desc, id) => {
  return async dispatch => {
    const response = await fetch(
      `https://shop-c9c03-default-rtdb.firebaseio.com/products/${id}.json`, 
      {
        method: 'PATCH',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          title,
          imgUrl,
          desc
        })
      }
    );

    if(!response.ok) {
      throw new Error('Something went wrong!');  
    }

    dispatch({
      type: UPDATE_PRODUCT, 
      id,
      product: {
        title,
        imgUrl,
        desc
      }
    })
  }
};

export const delProduct = id => {  
  return async dispatch => {
    const response = await fetch(
      `https://shop-c9c03-default-rtdb.firebaseio.com/products/${id}.json`, 
      {
        method: 'DELETE'
      }
    );

    if(!response.ok) {
      throw new Error('Something went wrong!');  
    }

    dispatch({ type: DEL_PRODUCT, prodId: id });
  }
};