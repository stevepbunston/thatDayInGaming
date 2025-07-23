const Review = require('../models/review');
const Article = require('../models/article');

module.exports.createReview = async (req, res) =>{
    const article = await Article.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    article.reviews.push(review);
    await review.save();
    await article.save();
    req.flash('success', 'Successfully created new review');
    res.redirect(`/articles/${article._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Article.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/articles/${id}`);
}