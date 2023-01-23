const express = require('express');
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());

const authRoute = require('./routes/auth.routes');
const userRoute = require("./routes/user.routes");

app.use('/api/', authRoute);
app.use("/api/", userRoute);

app.use(
  cookieSession({
    name: process.env.COOKIE_NAME,
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

app.get('/', (req, res) => {
  res.send('Welcome to Backend App');
});

module.exports = app;
