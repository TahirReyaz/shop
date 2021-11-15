export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DEL_PRODUCT = 'DEL_PRODUCT';

export const createProduct = (title, imgUrl, price, desc) => {
  return {
    type: CREATE_PRODUCT, 
    product: {
      title,
      imgUrl,
      price,
      desc
    }
  }
}

export const updateProduct = (title, imgUrl, desc, id) => {
  return {
    type: UPDATE_PRODUCT, 
    id,
    product: {
      title,
      imgUrl,
      desc
    }
  }
}

export const delProduct = id => {
  return { type: DEL_PRODUCT, prodId: id };
}