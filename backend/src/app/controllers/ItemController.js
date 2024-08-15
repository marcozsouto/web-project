import ItemService from '#services/ItemService.js'
import itemUpdateRequest from '#validators/item/update.js'
import itemStoreRequest from '#validators/item/store.js'

class ItemController {
    itemService = new ItemService()

    index = async (req, res, next) => {
        try {
            var { filter } = req.query

            const result = await this.itemService.index(filter)

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }

    store = async (req, res, next) => {
        try {
            const data = await itemStoreRequest.validate(req.body)
            const result = await this.itemService.store(data)

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            const data = await itemUpdateRequest.validate(req.body)
            const itemId = Number(req.params.id)

            const result = await this.itemService.update(itemId, data)

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }

    delete = async (req, res, next) => {
        try {
            const itemId = Number(req.params.id)

            const result = await this.itemService.destroy(itemId)

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }

    show = async (req, res, next) => {
        try {
            var { id } = req.params

            const result = await this.itemService.show(Number(id))

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }
}

export default new ItemController()
