const userService = require("../services/user.service.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart.service.js");
const register = async(req, res) => {
  try{

    const user = await userService.createUser(req.body);
    const jwt = jwtProvider.generateToken(user._id);

    await cartService.createCart(user);

    return res.status(200).send({jwt,message: "User registered successfully"});

  }catch(error){
    return res.status(500).send({error: error.message});
  }
}

const login = async(req, res) => {
  const { email, password } = req.body;
  try{
    const user = await userService.findUserByEmail(email);
    if(!user){
      return res.status(401).send({error: "Invalid credentials"});
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch){
      return res.status(401).send({error: "Invalid credentials"});
    }

    const jwt = jwtProvider.generateToken(user._id);

    return res.status(200).send({jwt,message: "User logged in successfully"});

  }catch(error){
    return res.status(500).send({error: error.message});
  }
}

module.exports = {
  register,
  login,
};