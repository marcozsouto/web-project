'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('order_itens', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING(128),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(128),
                allowNull: false,
            },
            quantity: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true,
            },
            price: {
                type: Sequelize.FLOAT(10, 2),
                allowNull: false,
            },
            order_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: {
                        tableName: 'orders',
                    },
                    key: 'id',
                },
                allowNull: false,
            },
            item_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                onDelete: 'SET NULL',
                references: {
                    model: {
                        tableName: 'itens',
                    },
                    key: 'id',
                },
                allowNull: true,
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
        await queryInterface.dropTable('order_itens')
    },
}
