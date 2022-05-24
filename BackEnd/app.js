const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path"); //required for express static path for file accessing
//------------------Models---------------------------
const HttpError = require("./models/http-error");

//-------------------Instantiation---------------
const app = express();

//-------------------Routes-----------------------
const inventory = require("./routes/inventory-routes");
const store = require("./routes/store-routes");
const user = require("./routes/user-routes");
const part = require("./routes/part-routes");

//-----------------MiddleWare--------------------
app.use(bodyParser.json());

app.use("/data/images", express.static(path.join("data", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //Access-control-Allow-Origin required to let browser use api, the the * can be replaced by urls (for the browser) that are allowed to use it
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

//-----------------Known Routes--------------------------
app.use("/api/organization", organization);
app.use("/api/location", location);
app.use("/api/schedule", schedule);
app.use("/api/user", user);

//-----------------Unknown Route Handling-------------------
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  return next(error);
});

//------------------Mongo------------------------
mongoose
  .connect(
    `mongodb+srv://${process.env.MongoDB_User}:${process.env.MongoDB_Password}@${process.env.MongoDB_Server}/${process.env.MongoDB_DBName}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((error) => {
    console.log("Fail to connect to DB");
    console.log(error);
  });
