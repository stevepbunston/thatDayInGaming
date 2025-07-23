const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const SportAndEntSchema = new Schema({
    title: String,
    url: String
});

const imageSchema = new Schema({
    url: String,
    filename: String
});

imageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200')
});


const ArticleSchema = new Schema({
    title: String,
    game: String,
    images: [imageSchema],
    release: String,
    console: String,
    blog: String,
    movies: [SportAndEntSchema],
    songs: [SportAndEntSchema],
    nflTeams: [SportAndEntSchema],
    mlbTeams: [SportAndEntSchema],
    nhlTeams: [SportAndEntSchema],
    nbaTeams: [SportAndEntSchema],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]

});

ArticleSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});

module.exports = mongoose.model('Article', ArticleSchema);