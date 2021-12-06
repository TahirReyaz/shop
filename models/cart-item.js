class CartItem {
  constructor(title, price, qty, sum, prodId, pushToken) {
    this.title = title;
    this.price = price;
    this.qty = qty;
    this.sum = sum;
    this.prodId = prodId;
    this.pushToken = pushToken;
  }
}

export default CartItem;