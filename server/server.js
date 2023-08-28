import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const PORT = 8080;
const __dirname = path.resolve();
const app = express();

app.use(express.static("build"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});
