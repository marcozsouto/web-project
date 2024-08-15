import OrderService from '#services/OrderService.js'
import { OrderStatus } from '#models/Order.js';

class OrderController {
    orderService = new OrderService()

    index = async (req, res, next) => {
        try {
            var { filter } = req.query

            const result = await this.orderService.index(filter)

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }

    show = async (req, res, next) => {
        try {
            var { id } = req.params

            const result = await this.orderService.show(Number(id))

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }

    read = async (req, res, next) => {
        try {
            var { id } = req.params

            const result = await this.orderService.setStatus(Number(id), OrderStatus.READY)

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }

    ready = async (req, res, next) => {
        try {
            var { id } = req.params

            const result = await this.orderService.setStatus(Number(id), OrderStatus.READY)

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }

    finish = async (req, res, next) => {
        try {
            var { id } = req.params

            const result = await this.orderService.setStatus(Number(id), OrderStatus.FINISHED)

            return res.json({ sucess: true, data: result })
        } catch (error) {
            next(error)
        }
    }
}

export default new OrderController()
