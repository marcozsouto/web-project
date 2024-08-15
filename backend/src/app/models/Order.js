import database from '#database/index.js'
import { Model, DataTypes } from 'sequelize'
import Table from '#models/Table.js'
import OrderItem from '#models/OrderItem.js'
import Item from '#models/Item.js'

const OrderStatus = Object.freeze({
    NEW: 'NEW',
    CANCELLED: 'CANCELLED',
    READ: 'READ',
    READY: 'READY',
    FINISHED: 'FINISHED',
})

class Order extends Model {}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(OrderStatus)),
            allowNull: false,
        },
        value: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        tableId: {
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
        tableName: 'orders',
    }
)

Order.belongsTo(Table, {
    onDelete: 'SET NULL',
})
OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)
Table.hasMany(Order)
OrderItem.belongsTo(Item)

export default Order

export { OrderStatus }
