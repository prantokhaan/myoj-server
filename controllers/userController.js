const {
  registerUser,
  allUsers,
  singleUserById,
  singleUserByUsername,
  putUser,
  deleteUser,
} = require("../services/userServices");
const { loginUser } = require("../services/userServices");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    university: user.university,
  }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

const register = async (req, res) => {
  try {
    const { username, displayName, university, password } = req.body;

    const newUser = await registerUser({
      username,
      displayName,
      university,
      password,
    });

    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      data: { user: newUser, token },
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { user, token } = await loginUser({ username, password });

    res.status(200).json({
      message: "User logged in successfully",
      data: { user, token },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await allUsers();

    res.status(201).json({
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const getSingleUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await singleUserById(id);

    res.status(201).json({
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const getSingleUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await singleUserByUsername(username);

    res.status(201).json({
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { displayName, university } = req.body;
    const updatedUser = await putUser(id, displayName, university);

    res.status(201).json({
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const removedUser = await deleteUser(id);

    res.status(201).json({
      data: removedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}


module.exports = {
  register,
  login,
  getAllUsers,
  getSingleUserById,
  getSingleUserByUsername,
  updateUser,
  removeUser
};
