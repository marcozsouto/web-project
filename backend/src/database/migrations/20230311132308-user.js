'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING(128),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(128),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(256),
                allowNull: false,
            },
            birth_date: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('users')
    },
}
