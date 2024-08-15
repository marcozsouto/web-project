import database from '#database/index.js'
import { Model, DataTypes } from 'sequelize'
import OrderItem from '#models/OrderItem.js'

class Item extends Model {}

Item.init(
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
        description: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(256),
            allowNull: false,
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
        tableName: 'itens',
    }
)

Item.hasOne(OrderItem, {
    onDelete: 'SET NULL',
})

export default Item
