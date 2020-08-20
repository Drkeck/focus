const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        requred: true,
        trim: true
    },


    email: {
        type: String,
        requred: true,
        trim: true
    },
    password: {
        type: String,
        requred: true,
        trim: true
    },
});

userSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }

    next();
})

userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoosse.model('User', userSchema);

module.exports = User;