import * as mongoose from "mongoose";


var roomSchema = new mongoose.Schema({
    numberOfSeats: {
        type: Number,
        required: true,
    },
    amenities: [],
    pricePerHour: {
        type: Number,
        required: true
    },
    roomId: {
        type: Number,
        required: true,
        unique:true
    },
    bookingList: [
        {
            customerName: String,
            date: Date,
            startTime: String,
            endTime: String
        },
    ],
});


export const roomModel = mongoose.model("rooms", roomSchema);
