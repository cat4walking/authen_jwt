const { createUsers,
        getUserById,
        getUser,
        updateUser,
        deleteUser,
        login
        } = require('../controllers/user.controller');

const router = require('express').Router();
const auth = require('../middleware/auth')

router.post("/user", createUsers);
router.get("/user", auth.verifyToken, getUser);
router.get("/user/:id", auth.verifyTokenAdmin, getUserById);
router.patch("/user/:id", auth.verifyToken, updateUser);
router.delete("/user/:id", auth.verifyToken, deleteUser);
router.post("/login", login);
module.exports = router;

