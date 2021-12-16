const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');


// get all posts
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: {
                model: User,
                attributes: ['username'],
            },
            where: {
                user_id: req.session.user_id,
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/newPost', withAuth, async (req, res) => {
    if (req.session.logged_in) {
        res.render('newPost');
    } else {
        res.redirect('/signin');
    }
});

router.get('/updatePost/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        const post = postData.get({ plain: true });

        res.render('updatePost', {
            post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;