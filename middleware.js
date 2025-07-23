const {articleSchema, reviewSchema} = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Review = require('./models/review');
const User = require('./models/user');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // add this line
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.ensureVerified = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // Store the original URL
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }

    if (!req.user.isVerified) {
        req.flash('error', 'Please verify your email.');
        return res.redirect('/login'); // Redirect to login or any appropriate route
    }

    next();
};

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}


module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    const referer = req.get('Referer') || '/ahahahhh';
    res.redirect(referer);
};

module.exports.validateArticle = (req, res, next) => {
    const { error } = articleSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }    
}

module.exports.isReviewAuthorOrAdmin = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
        req.flash('error', 'Review not found!');
        return res.redirect(`/articles/${id}`);
    }

    // Check if the user is the author of the review or an admin
    if (!review.author.equals(req.user._id) && !req.user.role === 'admin') {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/articles/${id}`);
    }
    next();
}

module.exports.isProfileOwnerOrAdmin = async (req, res, next) => {
    const { id } = req.params;
    if (req.isAuthenticated()) {
        const user = await User.findById(id);
        if (!user) {
            req.flash('error', 'User not found!');
            return res.redirect('/articles');
        }

        // Check if the current user is the profile owner or an admin
        if (user._id.equals(req.user._id) || req.user.role === 'admin') {
            return next();
        } else {
            req.flash('error', 'You do not have permission to do that!');
            return res.redirect('/articles');
        }
    } else {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
};

/* module.exports.ensureVerified = async (req, res, next) => {
    if (!req.user.isVerified) {
        req.flash('error', 'Please verify your email to access this feature.');
        return res.redirect('/login'); // Redirect to login or any appropriate route
    }
    next();
} */