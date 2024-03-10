const router = require('express').router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');


router.get('/', (req, res) => {
    post.findAll({
        attributes: ['id', 'title', 'body', 'userId'],
        include: [
            {
                model: Comment, 
                attributes: ['id', 'commentBody', 'userId'],
            },
            {
                model: User,
                attributes: ['username'],
            }
        ]
    })
})
.then(postData => {
    const posts = postData.map(post => post.get({plain: true}));
    res.render('home', {posts, loggedIn: req.session.loggedIn});
}) .catch(err => {
    res.status(500).json(err);
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'body', 'userId'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'commentBody', 'userId'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }

        ]
    })
}) .then((postData) => {
    if (!postData) {
        res.status(404).json({
            message: 'Post not found'
        });
        return;
    }
    const posts = postData.get({plain: true});
    res.render('onePost', {
        posts, 
        loggedIn: req.session.loggedIn
    });
}) .catch((error) => {
    res.status(500).json(err);
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;