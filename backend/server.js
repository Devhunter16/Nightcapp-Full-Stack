const app = require("./app");

const PORT = process.env.PORT || 3002; // Use the provided port by Vercel or default to 3002

app.listen(PORT, function () {
    console.log(`Listening on http://localhost:${PORT}`);
});