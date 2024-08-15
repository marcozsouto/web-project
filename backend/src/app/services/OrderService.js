import Order, { OrderStatus } from '#models/Order.js'
import OrderItem from '#models/OrderItem.js'
import Table from '#models/Table.js'
import OrderInfoDto from '#dtos/OrderInfoDto.js'

export default class OrderService {
    async index(filter) {
        const orders = await Order.findAll({
            include: [{ model: OrderItem }, { model: Table, paranoid: false, }],    
            ...this.getWhere(filter?.status)
        })

        return orders.map(order => OrderInfoDto.fromOrder(order));
    }

    async show(id) {
        const order = await Order.findByPk(id, {
            include: [{ model: OrderItem }, { model: Table }],
        })

        return OrderInfoDto.fromOrder(order)
    }

    getWhere(status) {
        var obj = {}

        switch (status) {
            case 'cancelled':
                obj = { where: { status: OrderStatus.CANCELLED } }
                break
            case 'new':
                obj = { where: { status: OrderStatus.NEW } }
                break
            case 'read':
                obj = { where: { status: OrderStatus.READ } }
                break
            case 'ready':
                obj = { where: { status: OrderStatus.READY } }
                break
            case 'finished':
                obj = { where: { status: OrderStatus.FINISHED } }
                break
        }

        return obj
    }

    async setStatus(id, status) {
        return await Order
            .update({ status: status }, {
                where: {
                    id: id
                }
            });
    }
}
