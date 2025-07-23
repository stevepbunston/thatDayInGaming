const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Review = require('./review');  // Import the Review model
const Article = require('./article'); // Import the Article model

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user' // Default role is 'user'
    },
    avatar: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        required: false // Make verificationToken not required initially
    }
});

// Ensure verificationToken is not required after verification
UserSchema.pre('save', function (next) {
    if (this.isModified('isVerified') && this.isVerified) {
        this.verificationToken = ''; // Clear verification token after verification
    }
    next();
});

UserSchema.pre('remove', async function (next) {
    await Review.deleteMany({ author: this._id });
    next();
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
