require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
// const PORT = 3000;
const PORT = process.env.PORT || 3000;
const goalRouter = require("./routes/goalRouter");

console.log(process.env.secret);

//middleware - functions that runs on the server between request and responses
app.use(express.json()); // allows server to parse json data
app.use(cors());

//home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to GOAL api",
  });
});

app.use("/goals", goalRouter);

//error route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource not Found",
  });
});

const connectToDb = async () => {
  try {
    //db connection logic
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "goals",
    });
    app.listen(PORT, () => {
      console.log(`server running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connectToDb();
