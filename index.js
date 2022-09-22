require("dotenv").config();
const express = require("express");
const app = express();
const routers = require("./src/route/router")
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
})

app.use(express.json())

app.use("/api", routers)


//error handler
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode);
    res.json({
      status: statusCode,
      message: message
    });
  });
  