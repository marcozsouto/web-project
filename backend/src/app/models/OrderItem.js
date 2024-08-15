import database from '#database/index.js'
import { Model, DataTypes } from 'sequelize'

class OrderItem extends Model {}

OrderItem.init(
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
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false,
        },
        orderId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        itemId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
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
        tableName: 'order_itens',
    }
)

export default OrderItem
