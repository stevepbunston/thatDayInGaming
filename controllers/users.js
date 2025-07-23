const User = require('../models/user');
const Review = require('../models/review');
const { sendVerificationEmail } = require('../utils/email');
const crypto = require('crypto');

module.exports.renderRegisterForm = (req, res) => {
    res.render('./users/register');
}

module.exports.createNewUser = async (req, res, next) => {
    try {
        const { email, username, password, avatar } = req.body;
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const user = new User({ email, username, avatar, verificationToken });
        await User.register(user, password);
        //const registeredUser = await User.register(user, password);

        sendVerificationEmail(user, verificationToken);

        req.flash('success', 'Verification email sent. Please check your inbox.');
        res.redirect('/login');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.verifyEmail = async (req, res) => {
    const { token } = req.query;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
        req.flash('error', 'Invalid or expired token.');
        return res.redirect('/register');
    }

    user.isVerified = true;
    await user.save();

    req.flash('success', 'Email verified successfully.');
    res.redirect('/login');
}

module.exports.resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        req.flash('error', 'No account with that email address.');
        return res.redirect('/register');
    }

    if (user.isVerified) {
        req.flash('error', 'This email is already verified.');
        return res.redirect('/login');
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.verificationToken = verificationToken;
    await user.save();

    sendVerificationEmail(user, verificationToken);

    req.flash('success', 'Verification email sent. Please check your inbox.');
    res.redirect('/login');
}

module.exports.renderLoginForm = (req, res) => {
    res.render('./users/login');
}

module.exports.userLogin = (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = res.locals.returnTo || '/articles';
    res.redirect(redirectUrl);
}

module.exports.userLogout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/articles');
    });
}

module.exports.userIndex = async(req, res) => {
    const users = await User.find({});
    res.render('./users/users', {users});
}

module.exports.userProfile = async(req, res) => {
    const user = await User.findById(req.params.id)
    if(!user){
        req.flash('error', 'Cannot find user!');
        return res.redirect('/articles');
    }
    res.render('users/show', {user});
}

module.exports.updateUserProfile = async(req, res) => {
    const { id } = req.params;
    const { avatar } = req.body;
    await User.findByIdAndUpdate(id, { avatar });
    req.flash('success', 'Avatar updated successfully!');
    res.redirect(`/users/${id}`);
}

module.exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        req.flash('error', 'Cannot find user!');
        return res.redirect('/articles');
    }

    // Find all reviews by this user and delete them
    await Review.deleteMany({ author: user._id });

    // Delete user
    await User.findByIdAndDelete(id);

    req.flash('success', 'Successfully deleted user and their reviews');
    if(req.user && req.user.role === 'admin'){
    res.redirect('/users');
    }
    else{
        res.redirect('/articles');      
    }
}


