class Product {
  constructor(id, ownerId, ownerPushToken, title, imgUrl, desc, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.pushToken = ownerPushToken;
    this.title = title;
    this.imgUrl = imgUrl;
    this.desc = desc;
    this.price = price;
  }
}

export default Product;