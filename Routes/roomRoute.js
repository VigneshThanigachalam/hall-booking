import { addRoom, bookRoom, listCustomers, listRooms } from "../Controller/roomController.js";
import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";


export const roomRouter = express.Router();
roomRouter.post("/add", authMiddleware, isAdmin, addRoom);
roomRouter.get("/list-customer", authMiddleware, isAdmin, listCustomers);
roomRouter.put("/book", authMiddleware, bookRoom);
roomRouter.get("/list", authMiddleware, listRooms);