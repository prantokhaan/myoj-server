const express = require('express');
const {
  register,
  getAllUsers,
  getSingleUserById,
  getSingleUserByUsername,
  updateUser,
  removeUser,
} = require("../controllers/userController");
const {login} = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllUsers);
router.get('/:id', getSingleUserById);
router.get('/username/:username', getSingleUserByUsername);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', removeUser);

module.exports = router;