import app from "../app.js";

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

export default app;