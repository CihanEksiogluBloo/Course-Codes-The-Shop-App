class Product {
  constructor(id, ownerId, title,ownerPushToken, imageUrl, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.pushToken = ownerPushToken
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

export default Product;