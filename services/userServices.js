const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async ({
  username,
  displayName,
  university,
  password,
}) => {
  try {
    if (!password) throw new Error("Password is required");
    if (!username) throw new Error("Username is required");
    if (!displayName) throw new Error("Display name is required");
    if (!university) throw new Error("University is required");

    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await User.create({
      username,
      displayName,
      university,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // Propagate the error to the caller
  }
};

const loginUser = async ({ username, password }) => {
  try {
    if (!username) throw new Error("Username is required");
    if (!password) throw new Error("Password is required");

    // Check if user exists
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) throw new Error("User not found");

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: process.env.JWT_EXPIRES_IN } // Expiration
    );

    // Return the user and token
    return { user, token };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

const allUsers = async () => {
  try{
    const users = await User.findAll();

    if(!users || users.length === 0){
      throw new Error("No users found");
    }

    return users;
  }catch(error){
    console.error("Error fetching users:", error);
    throw error;
  }
}

const singleUserById = async (id) => {
  try{
    const user = await User.findByPk(id);

    if(!user){
      throw new Error("User not found");
    }

    return user;
  }catch(error){
    console.error("Error fetching user:", error);
    throw error;
  }
}

const singleUserByUsername = async (username) => {
  try{
    const user = await User.findOne({where: {username}});

    if(!user){
      throw new Error("User not found");
    }

    return user;
  }catch(error){
    console.error("Error fetching user:", error);
    throw error;
  }
}

const putUser = async (id, displayName, university) => {
  try{
    const user = await User.findByPk(id);

    if(!user){
      throw new Error("User not found");
    }

    const updatedUser = await user.update({
      displayName,
      university,
    });

    return updatedUser;
  }catch(error){
    console.error("Error updating user:", error);
    throw error;
  }
}

const deleteUser = async (id) => {
  try{
    const user = await User.findByPk(id);

    if(!user){
      throw new Error("User not found");
    }

    await user.destroy();

    return user;
  }catch(error){
    console.error("Error deleting user:", error);
    throw error;
  }
}





module.exports = {
  registerUser,
  loginUser,
  allUsers,
  singleUserById,
  singleUserByUsername,
  putUser,
  deleteUser,
};
