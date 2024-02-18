const User = require("../models/user.model.js");
bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider.js");
const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      throw new Error("User already exists with email : ", email);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    return User;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (userId) => {
  try {
    // const user = await User.findById(userId).populate("address");


    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found with id : ", userId);
    }

    return user;

  } 
  catch (error) {
    throw new Error(error.message);
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found with email : ", email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found with id : ", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  getProfileByToken,
  getAllUsers,
};
