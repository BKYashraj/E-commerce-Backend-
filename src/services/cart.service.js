const Cart = require("../models/cart.model");

async function createCart(user) {
  try {
    const newCart = new Cart({user});
    const savedCart = await newCart.save();
    return savedCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createCart
};