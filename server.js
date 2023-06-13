const express = require("express");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running");
});

//defining Routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/contact", require("./routes/api/contact"));
app.use("/api/favorites", require("./routes/api/favorites"));

app.listen(PORT, () => {
  console.log("Server is running on Port : " + PORT);
});
