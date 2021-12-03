// api routes for export 
// server, user, post, comments

// server ///////////////////////////////
const router = require('express').Router();

// user 
const userRoutes = require('./userRoutes');
// post
const postRoutes = require('./postRoutes');
// comment
const commentRoutes = require('./commentRoutes');

// routes
router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
