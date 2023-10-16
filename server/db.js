import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("eroor", (errro) => console.log("DB Error", error));

db.once("open", () => console.log("Connected to DB"));
