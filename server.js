import dotenv from "dotenv";
dotenv.config(); // load env variables first

import app from "./back-end/src/app.js";

import connectDB from "./back-end/src/config/database.js";


// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Main page');
});


app.listen(5000, () => {
  console.log("Server is running http://localhost:5000");
});
