import validator from "validator";

export const validateSignupData = (req) => {
    const { firstName , lastName, emailId, password } = req.body;

    if( !firstName || !lastName) {
        throw new Error("Enter all the required Fields.");
    } 
    
    else if(firstName.length > 30) {
        throw new Error("First name should be less than 30 letters.");
    } 
    
    else if(lastName.length > 30) {
        throw new Error("First name should be less than 30 letters.");
    } 
    
    else if(!validator.isEmail(emailId)) {
        throw new Error("Enter a valid email");
    } 
    
    else if(!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password.");
    }
};

export const validateLoginData = (req) => {
    const { emailId } = req.body;

    if(!validator.isEmail(emailId)) {
        throw new Error("Enter a valid email.");
    }

};

export const validateEditProfileData = (req) => {
    const newData = req.body;
    
    const ALLOWED_UPDATES = ["firstName", "lastName", "age", "gender", "skills", "about", "photoUrl"];
    
    const isUpdateAllowed = Object.keys(newData).every((k) => ALLOWED_UPDATES.includes(k));
            
    if(!isUpdateAllowed) {
        throw new Error("Update not allowed");
    }
};