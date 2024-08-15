'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('itens', {
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
            image: {
                type: Sequelize.STRING(256),
                allowNull: true,
            },
            price: {
                type: Sequelize.FLOAT(10, 2),
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
        await queryInterface.dropTable('itens')
    },
}
