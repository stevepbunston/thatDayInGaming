const Joi = require('joi');

const sportAndEntSchema = Joi.object({
    title: Joi.string().required(),
    url: Joi.string().required() // Assuming the image is a URL
});

module.exports.articleSchema = Joi.object({
    article: Joi.object({
        title: Joi.string().required(),
        game: Joi.string().required(),
        release: Joi.string().required(),
        console: Joi.string().required(),
        blog: Joi.string().required(),  
        //image: Joi.string().uri().required(),
        movies: Joi.array().items(sportAndEntSchema).min(5).required(),
        songs: Joi.array().items(sportAndEntSchema).min(5).required(),
        nflTeams: Joi.array().items(sportAndEntSchema).min(5).required(),
        mlbTeams: Joi.array().items(sportAndEntSchema).min(5).required(),
        nhlTeams: Joi.array().items(sportAndEntSchema).min(5).required(), 
        nbaTeams: Joi.array().items(sportAndEntSchema).min(5).required(),        
    }).required(),
    deleteImages: Joi.array()
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(10),
        body: Joi.string().required()
    }).required()
});