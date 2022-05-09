const express = require("express");
const pool = require("../db");
const router = express.Router();
const bcrypt = require("bcrypt");
const authenticateToken = require("../middleware/authorization");

const UsersService = require("../services/usersService");
const usersService = UsersService(pool);

router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await usersService.readAll();
        res.json({ users: users });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, email, password: hashedPassword };

    try {
        await usersService.create(user);
        res.json({ users: user });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router;