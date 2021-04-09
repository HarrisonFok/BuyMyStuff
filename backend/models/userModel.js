import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    questions: [questionSchema],
    isAdmin: {
        type: Boolean, 
        required: true,
        default: false
    },
    resetLink: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

// Can put method into the model (to use with an instantiated user)
userSchema.methods.matchPassword = async function(enteredPassword) {
    // compare if the passwords are equal
    return await bcrypt.compare(enteredPassword, this.password)
}

// Can set certain things to happen on save
userSchema.pre("save", async function (next) {
    // only want to do the below if the password is motified
    // otherwise, it'll create a new hash and we won't be able to log in
    if(!this.isModified("password")) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  })

const User = mongoose.model("User", userSchema);

export default User; 