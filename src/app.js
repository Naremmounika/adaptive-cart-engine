const express = require("express");
const cors = require("cors");

const cartRoutes = require("./routes/cartRoutes");
const logger = require("./middleware/logger");

const app = express();

app.use(cors());
app.use(express.json());

// request logger (FEATURE X)
app.use(logger);

// health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Shopping Cart Engine API Running",
  });
});

// routes
app.use("/cart", cartRoutes);

module.exports = app;