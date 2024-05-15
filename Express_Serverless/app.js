const express = require("express");
const cors = require("cors");
const app = express();
const createError = require('http-errors');

const db = require("./models/conmodel");
const routeUser = require('./routes/user');
const routeAuth = require('./routes/auth');

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({origin : "*"}));

app.use('/user', routeUser);
app.use('/auth', routeAuth);

db.mongoose.connect(db.url)
  .then(() => console.log("Database connected"))
  .catch(err => { console.log("Connection failed ->", err) });

const apiTimeout = 900 * 1000;
app.use((req, res, next) => {
  // Set the timeout for all HTTP requests
  req.setTimeout(apiTimeout, () => {
    let err = new Error('Request Timeout');
    err.status = 408;
    next(err);
  });

  // Set the server response timeout for all HTTP requests
  res.setTimeout(apiTimeout, () => {
    let err = new Error('Service Unavailable');
    err.status = 503;
    next(err);
  });
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(11011, () => {
   console.log("Server started on port 11011");
})