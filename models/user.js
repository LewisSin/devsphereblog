const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');  
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(pw) {
        return bcrypt.compareSync(pw, this.password)
    }
}

userInfo.init({
    id: {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                length: [6]
            }
        }
    }
},
{
    hooks: {
        async beforeCreate(userData) {
            userData.password = await bcrypt.hash(
                userData.password,
                10
            );
            return userData;
        }
    },
    
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});

module.exports = User;