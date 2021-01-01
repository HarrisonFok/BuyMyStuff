import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true,
        unique: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    isAdmin: {
        type: Boolean, 
        required: true,
        default: false
    }
}, {
    timestamps: true
})

// Can put method into the model (to use with an instantiated user)
userSchema.methods.matchPassword = async function(enteredPassword) {
    // compare if the passwords are equal
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema);

export default User; 