import express from "express";
import dotenv from 'dotenv';
import { db_connect } from "./Configure/db_connect.js";
import cors from "cors";
import { authRouter } from "./Routes/authRoutes.js";
import bodyParser from "body-parser";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import { roomRouter } from "./Routes/roomRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

db_connect();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.send("hi");
});

app.use("/api/user", authRouter);
app.use("/api/room", roomRouter);


app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => console.log(`app listening on ${PORT}`))
