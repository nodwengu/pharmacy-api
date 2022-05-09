const jwt = require("jsonwebtoken");

function jwtTokens(id, username, password) {
    const user = { id, username, password };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "5min" });
    return ({ accessToken, refreshToken });
}

module.exports = jwtTokens