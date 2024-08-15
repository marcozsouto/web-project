import database from '#database/index.js'
import Encrpyt from '#helpers/Encrypyt.js'
import { Model, DataTypes } from 'sequelize'

class User extends Model {
    async checkPassword(password) {
        return await Encrpyt.compare(password, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            unique: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        paranoid: true,
        sequelize: database.connection,
        underscored: true,
        tableName: 'users',
    }
)

User.addHook('beforeSave', async (user) => {
    if (user.password) {
        user.password = await Encrpyt.encrypt(user.password)
    }
})

export default User
