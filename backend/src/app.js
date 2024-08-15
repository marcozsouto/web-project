import express from 'express'
import cors from 'cors'
import api from '#routes/api.js'
import errorHandler from '#middlewares/Error.js'
import path from 'path'

export default class App {
    constructor() {
        this.server = express()
        this.server.use(express.urlencoded({ extended: true }))
        this.server.use(express.json({limit: '5mb'}))

        this.server.use('*/images', express.static('public/uploads'))
        this.server.use(cors())
        this.routes()
        this.database()
        this.server.use(errorHandler)
    }

    routes() {
        this.server.use(api)
    }

    database() {}
}
