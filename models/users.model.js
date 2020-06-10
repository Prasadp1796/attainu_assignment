const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');
const AutoIncrement = require('../lib/auto_increment')(mongoose);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../lib/consts');

//User Schema Created Here
const userSchema = mongoose.Schema({
    _id: Number,
    "email": {type: String, unique: "User With This Email Already Exist",  lowercase: true},
    "password": String,
    "isDisabled": {type:Boolean, default: false},
    "token": String
}, { _id: false });

//Validate Data
userSchema.plugin(validator);

//Check Whether Password Is Modified Before Saving 
userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})



//Method To Find User By Credentials
userSchema.statics.findByCredentials = async (email, password, User) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    return user;
}

//Add Auto Increament To Event ID
userSchema.plugin(AutoIncrement, {
    modelName: 'users',
    type: Number,
    unique: true,
    fieldName: '_id'
});


module.exports = mongoose.model('users', userSchema);