const express = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtTokens = require("../utils/jwt-helpers.js");
const router = express.Router();

const UsersService = require("../services/usersService");
const usersService = UsersService(pool);

router.post('/login', async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await usersService.readByEmail(email);
      if (user == undefined) return res.status(401).json({ error: "Email is incorrect" });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).json({ error: "Invalid password" });

      // Send JWT
      let tokens = jwtTokens(user);
      res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
      res.json(tokens);

   } catch (error) {
      res.status(401).json({ error: error.message });
   }
})

router.get('/refresh_token', (req, res) => {
   try {
      const refreshToken = req.cookies.refresh_token;
      if(refreshToken == null) return req.status(401).json({ error: "Null refresh_token" });

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
         if(error) return res.status(403).json({ error: error.message });
         let tokens = jwtTokens(user);
         res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
         res.json(tokens);
      });
   } catch (error) {  
      res.status(401).json({ error: error.message });
   }
})

router.delete('/refresh_token', (req, res) => {
   try {
      res.clearCookie('refresh_token');
      return res.status(200).json("Refresh token deleted");
   } catch (error) {
      res.status(401).json({ error: error.message });
   }
})

module.exports = router;