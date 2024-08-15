import TableService from '#services/TableService.js'
import tableStoreRequest from '#validators/table/store.js'
import tableUpdateRequest from '#validators/table/update.js'

class TableController {
    tableService = new TableService()

    index = async (req, res, next) => {
        try {
            var { filter } = req.query

            const result = await this.tableService.index(filter)

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }

    store = async (req, res, next) => {
        try {
            const data = await tableStoreRequest.validate(req.body)
            const result = await this.tableService.store(data)

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            const data = await tableUpdateRequest.validate(req.body)
            const tableId = Number(req.params.id)

            const result = await this.tableService.update(tableId, data)

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }

    delete = async (req, res, next) => {
        try {
            const tableId = Number(req.params.id)

            const result = await this.tableService.destroy(tableId)

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }

    show = async (req, res, next) => {
        try {
            var { id } = req.params

            const result = await this.tableService.show(Number(id))

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }
    
}

export default new TableController()
