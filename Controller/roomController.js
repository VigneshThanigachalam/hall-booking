import asyncHandler from "express-async-handler";
import { roomModel as room } from "../Model/roomModel.js";



//  create room
export const addRoom = asyncHandler(async (req, res) => {
    try {
        const newRoom = await room.create(req.body);
        res.json({
            message: "successfully added",
        });
    } catch {
        res.json({
            message: "user alerady exists",
        });
    }
});

//book a room

export const bookRoom = asyncHandler(async (req, res) => {
    const { roomId, date, startTime, endTime } = req.body;
    const { name } = req.user;
    const bookingDetails = {
        customerName: name,
        date: date,
        startTime,
        endTime
    }
    try {
        const checkAvailability = await room.find({ $and: [{ "bookingList.date": date }, { roomId }] });
        if (checkAvailability.length == 0) {

            const booked = await room.findOneAndUpdate({ roomId },
                { $push: { bookingList: bookingDetails } },
                { new: true }
            );

            booked ? res.json({
                message: "successfully booked"
            }) : res.json({
                message: "no rooms found"
            })
        }
        else {
            res.json({
                message: "room is not available on your requested date"
            })
        }
    } catch (error) {
        res.json({
            message: error
        })
    }
});

// listi the rooms
export const listRooms = asyncHandler(async (req, res) => {
    const findRooms = await room.find({}).select("bookingList roomId -_id");

    res.json({
        listRooms: findRooms
    })
})

// list of customers
export const listCustomers = asyncHandler(async (req, res) => {
    const listFilter = await room.find({}).select("bookingList -_id roomId");

    res.json({
        listCustomersAndBooking: listFilter
    })
})