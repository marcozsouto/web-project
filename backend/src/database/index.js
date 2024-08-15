import { Sequelize } from 'sequelize'
import config from '#config/database.js'

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(config)
    }
}

const database = new Database()

export default database
