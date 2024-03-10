const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

User.hasMany(Post, {
    foreignKey: 'userId'
})

User.hasMany(Comment, {
    foreignKey: 'userId'
})

Post.belongsTo(User, {
    foreignKey: 'userId'
})

Post.hasMany(Comment, {
    foreignKey: 'userId'
})

Comment.belongsTo(User, {
    foreignKey: 'userId'
})

Comment.belongsTo(Post, {
    foreignKey: 'postId'
})

module.exports = {User, Post, Comment};