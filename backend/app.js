/** Express app for nightcapp */
const express = require("express");
// CORS is important because our backend and frontend are running on different ports
const cors = require("cors");

const cocktailDbRoutes = require("./routes/cocktailDbRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", cocktailDbRoutes);

/** Handle 404 errors */
app.use(function (req, res, next) {
    res.status(404).json({ error: "Not Found" });
});

/** Generic error handler; this middleware should log anything that hits it to the console */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;