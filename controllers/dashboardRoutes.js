const router = require('express').router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, (req, res) => {
    Post.findAll({
        where: {
            userId: req.session.userId
        },
        attributes: [ 'id', 'title', 'commentBody', 'userId' ]
    })
});