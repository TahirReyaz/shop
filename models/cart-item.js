import cart from "../store/reducers/cart";

class CartItem {
  constructor(title, price, qty, sum) {
    this.title = title;
    this.price = price;
    this.qty = qty;
    this.sum = sum;
  }
}

export default cartItem;