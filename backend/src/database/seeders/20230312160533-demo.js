'use strict'

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcrypt')

const LoremIpsum = require("lorem-ipsum").LoremIpsum;

async function encrypt(value) {
    return new Promise(async (resolve) => {
        const salt = await bcrypt.genSalt(10)
        value = await bcrypt.hash(value, salt)
        resolve(value)
    })
}

var OrderStatus = {
    NEW: 'NEW',
    CANCELLED: 'CANCELLED',
    READ: 'READ',
    READY: 'READY',
    FINISHED: 'FINISHED',
}

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
    async up(queryInterface, Sequelize, SystemUser) {
        const user = await queryInterface.bulkInsert(
            'users',
            [
                {
                    name: 'saturn',
                    email: 'saturn@saturn.com',
                    password: await encrypt('123456'),
                    birth_date: new Date(),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {
                returning: true,
                validate: true,
                individualHooks: true,
            }
        )

        let tables = [];
        for (let i = 0; i < 5; i++) {
            tables.push({
                name: lorem.generateWords(1),
                created_at: new Date(),
                updated_at: new Date(),
            });
        }
        await queryInterface.bulkInsert(
            'tables',
            tables,
            {
                returning: false,
                validate: true,
                individualHooks: true,
            }
        )

        let itens = [];

        for (let i = 0; i < 5; i++) {
            itens.push({
                name: lorem.generateWords(1),
                description: lorem.generateWords(1),
                price: 4.45,
                image: null,
                created_at: new Date(),
                updated_at: new Date(),
            });
        }

        await queryInterface.bulkInsert(
            'itens',
            itens,
            {
                returning: false,
                validate: true,
                individualHooks: true,
            }
        )

        await queryInterface.bulkInsert(
            'orders',
            [
                {
                    status: OrderStatus.NEW,
                    description: 'order 1',
                    value: 12.13,
                    table_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    status: OrderStatus.CANCELLED,
                    description: 'order 2',
                    value: 23.95,
                    table_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    status: OrderStatus.FINISHED,
                    description: 'order 3',
                    value: 3.45,
                    table_id: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    status: OrderStatus.READY,
                    description: 'order 4',
                    value: 24.59,
                    table_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    status: OrderStatus.READ,
                    description: 'order 5',
                    value: 48.45,
                    table_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    status: OrderStatus.NEW,
                    description: 'order 6',
                    value: 12.13,
                    table_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    status: OrderStatus.CANCELLED,
                    description: 'order 7',
                    value: 23.95,
                    table_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    status: OrderStatus.FINISHED,
                    description: 'order 8',
                    value: 3.45,
                    table_id: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    status: OrderStatus.READY,
                    description: 'order 9',
                    value: 24.59,
                    table_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    status: OrderStatus.READ,
                    description: 'order 10',
                    value: 48.45,
                    table_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {
                returning: false,
                validate: true,
                individualHooks: true,
            }
        )

        let orderItems = [];

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 5; j++) {
                orderItems.push({
                    name: lorem.generateWords(1),
                    description: lorem.generateWords(1),
                    item_id: j+1,
                    order_id: i+1,
                    price: 1.5,
                    quantity: getRandomInt(10),
                    created_at: new Date(),
                    updated_at: new Date(),
                });
            }     
        }

        await queryInterface.bulkInsert(
            'order_itens',
            orderItems,
            {
                returning: false,
                validate: true,
                individualHooks: true,
            }
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {})
        await queryInterface.bulkDelete('tables', null, {})
        await queryInterface.bulkDelete('itens', null, {})
        await queryInterface.bulkDelete('orders', null, {})
        await queryInterface.bulkDelete('order_itens', null, {})
    },
}
