import 'dotenv/config'

const config = {
    local: {
        dialect: 'sqlite',
        storage: './database.db',
        logging: console.log,
    },
}

export default config[String(process.env.NODE_ENV) ?? 'local']
