import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});


const Contact = mongoose.model('message', messageSchema);

export default Contact;
