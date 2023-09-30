const express = require("express");
const router = require("./routes/routes");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require('helmet');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_STR);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

// mongoose.connect(process.env.MONGO_STR, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
      },
    },
  })
);



// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://nomishpriv.github.io");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
app.use(
  cors({
    // allowedHeaders: ['Origin'],
    origin: ["https://nomishpriv.github.io"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,

  })
);
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// app.options('*', cors()) // include before other routes

app.use("/", router);

connectDB().then(() => {app.listen(process.env.PORT, () => {
  console.log("server is active");
});
})
