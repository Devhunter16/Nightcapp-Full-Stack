import app from "../app.js";

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

app.get('/favicon.ico', (req, res) => res.status(204));

export default app;