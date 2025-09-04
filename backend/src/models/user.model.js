import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, // DATATYPE OF FIELD
        maxLength: 30 // MAXIMUM LENGHT OF THE FIELD
    },
   
    lastName: {
        type: String
    },
    
    emailId: {
        type: String,
        lowercase: true, // LOWERCASING THE FIELD
        required: true, // REQUIRED FIELD
        unique: true, // UNIQUE FIELD
        trim: true, // TRIMS THE SPACES FROM THE FIELD
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid.");
            };
        }
    },
    
    password: {
        type: String,
        required: true,
        minLength: 6 
    },
    
    age: {
        type: Number,
        min: 18
    },
    
    gender: {
        type: String,
        validate(value) { // CHECKING FOR VALIDATION
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    },
    
    photoUrl: {
        type: String,
        default: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
    },
    
    about: {
        type: String,
        default: "This is a default about of user." // DEFAULT VALUE OF THE FIELD
    },
    
    skills: {
        type: [String] // ARRAY OF STRNGS
    }
}, {
    timestamps: true
});

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id}, process.env.JWT_SECRET, { expiresIn : "1d" });

    return token;
};

userSchema.methods.validatePassword = async function (inputPassword) {
    const user = this;

    const hashedPassword = user.password;

    const isPasswordCorrect = await bcrypt.compare(inputPassword, hashedPassword);

    return isPasswordCorrect;
};

export const User = mongoose.model("User", userSchema);
