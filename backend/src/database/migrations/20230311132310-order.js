'use strict'

var OrderStatus = ['NEW', 'CANCELLED', 'READ', 'READY', 'FINISHED']

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            status: {
                type: Sequelize.ENUM(OrderStatus),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(256),
                allowNull: false,
            },
            value: {
                type: Sequelize.FLOAT(10, 2),
                allowNull: false,
            },
            table_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                onDelete: 'SET NULL',
                references: {
                    model: {
                        tableName: 'tables',
                    },
                    key: 'id',
                },
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('orders')
    },
}
