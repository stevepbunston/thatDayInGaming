const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isAdmin, validateArticle} = require('../middleware');
const articles = require('../controllers/articles');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(catchAsync(articles.index))
    .post(isAdmin, upload.array('image'), validateArticle, catchAsync(articles.createArticle));

router.get('/new', isAdmin, articles.renderNewForm);

router.route('/:id')
    .get(catchAsync(articles.showArticle))
    .put(isAdmin, upload.array('image'), validateArticle, catchAsync(articles.editArticle))
    .delete(isAdmin, catchAsync(articles.deleteArticle));

router.get('/:id/edit', isAdmin, catchAsync(articles.renderEditForm));

module.exports = router;