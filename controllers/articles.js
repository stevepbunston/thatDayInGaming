//article controller

const Article = require('../models/article');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const articles = await Article.find({});
    res.render('articles/index', { articles });
}

module.exports.renderNewForm = (req, res) => {
    res.render('articles/new');
}

module.exports.createArticle = async (req, res, next) => {
    const article = new Article(req.body.article);
    article.images = req.files.map(f =>({url: f.path, filename: f.filename}));
    await article.save();
    console.log(article);
    req.flash('success', 'Successfully created new article');
    res.redirect(`/articles/${article._id}`);
}

module.exports.showArticle = async(req, res) => {
    const article = await Article.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    });
    if(!article){
        req.flash('error', 'Cannot find article!');
        return res.redirect('/articles');
    }
    res.render('articles/show', {article});
}

module.exports.renderEditForm = async(req, res) => {
    const article = await Article.findById(req.params.id);
    if(!article){
        req.flash('error', 'Cannot find article!');
        return res.redirect('/articles');
    }
    res.render('articles/edit', {article});
}

module.exports.editArticle = async(req, res) => {
    const { id } =req.params;
    const article = await Article.findByIdAndUpdate(id, { ...req.body.article });
    const imgs = req.files.map(f =>({url: f.path, filename: f.filename}));
    article.images.push(...imgs);
    await article.save();
    if(req.body.deleteImages) {
        for(let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await article.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    };
    req.flash('success', 'Successfully updated article');
    res.redirect(`/articles/${article._id}`);
}

module.exports.deleteArticle = async (req, res) => {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted article');
    res.redirect('/articles');
}