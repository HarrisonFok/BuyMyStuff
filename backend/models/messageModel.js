import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // adds a relationship between product and user
        ref: "User"
    },
    username: {
        type: String,
        required: true
    },
    room: {
        type: String, 
        required: true
    }, 
    message: {
        type: String, 
        required: true,
    }
}, {
    timestamps: true
})

const Message = mongoose.model("Message", messageSchema);

export default Message; 