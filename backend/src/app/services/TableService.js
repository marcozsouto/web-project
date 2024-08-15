import Table from '#models/Table.js'
import { Op } from 'sequelize';

export default class TableService {
    async index(filter) {
        const tables = await Table.findAll(this.getFilter(filter))
        return tables
    }

    getFilter(filter) {
        if (filter?.name) {
            return {
                where: {
                    name: {
                        [Op.like]: `%${filter.name}%`
                    }
                }    
            };
        }

        return {};
    }

    async store(data) {
        const table = await Table.create(data)
        return table
    }

    async update(id, data) {
        const table = await Table.findByPk(id)

        if (!table) {
            return null
        }

        await table.update(data)
        return table
    }

    async destroy(id) {
        const result = await Table.destroy({ where: { id } })
        return result === 1
    }

    async show(id) {
        const table = await Table.findByPk(id)

        return table;
    }
}
