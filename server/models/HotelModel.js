import mongoose from "mongoose";

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    hotelName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    perDayPrice: {
        type: Number,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
    },
    userID :{
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    people: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],
});

const Hotel = mongoose.model("hotel", hotelSchema);
export default Hotel;