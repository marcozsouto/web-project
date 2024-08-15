export default class OrderInfoDto {
    static fromOrder(order) {
        return {
            id: order.id,
            status: order.status,
            value: order.value,
            description: order.description,
            tableId: order.tableId,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            table: {
                id: order.Table.id,
                name: order.Table.name,
            },
            orderItems: order.OrderItems.map((orderItem) => {
                return {
                    id: orderItem.id,
                    quantity: orderItem.quantity,
                    name: orderItem.name,
                    description: orderItem.description,
                    price: orderItem.price,
                }
            }),
        }
    }
}
