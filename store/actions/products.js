export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DEL_PRODUCT = 'DEL_PRODUCT';

export const addProduct = id => {

}

export const delProduct = id => {
  return { type: DEL_PRODUCT, prodId: id };
}