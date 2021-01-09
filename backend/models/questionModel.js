import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Question = mongoose.model("Question", questionSchema)

export default Question