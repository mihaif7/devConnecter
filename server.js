const express = require("express");
const connectDB = require("./config/db");
const morgan = require('morgan')

const app = express();

// connect db
connectDB();

app.get("/", (req, res) => res.send("API Running"));

// Init Middleware
app.use(express.json({
    extended: false
}))
app.use(morgan('dev'));


// Define Routes
var users = require("./routes/api/usesr");
var auth = require("./routes/api/auth");
var profiles = require("./routes/api/profile");
var posts = require("./routes/api/posts");

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/profile", profiles);
app.use("/api/posts", posts);


// Defining the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));