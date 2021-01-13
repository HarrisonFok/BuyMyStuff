import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Question"
    },
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Comment = mongoose.model("Comment", commentSchema)

export default Comment