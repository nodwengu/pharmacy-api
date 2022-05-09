const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser"); // add this line

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const corsOptions = { credentials: true, origin: process.env.url || '*' } ;

app.use(cors(corsOptions));
//app.use(json());
app.use(cookieParser());
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const usersRouter = require("./routes/users-routes.js");
const authRouter = require("./routes/auth-routes.js");

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);


app.listen(PORT, function () {
   console.log('Pharmacy server listening on port:', PORT);
});
