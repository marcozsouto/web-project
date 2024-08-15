import AuthController from '#controllers/AuthController.js'
import ItemController from '#controllers/ItemController.js'
import OrderController from '#controllers/OrderController.js'
import TableController from '#controllers/TableController.js'
import Auth from '#middlewares/Auth.js'
import { Router } from 'express'

const api = Router()

api.post('/token', AuthController.getToken)
api.post('/signup', AuthController.signup)

api.get(`/tables`, Auth.authenticated, TableController.index)
api.post(`/tables`, Auth.authenticated, TableController.store)
api.get('/tables/:id', Auth.authenticated, TableController.show)
api.put(`/tables/:id`, Auth.authenticated, TableController.update)
api.delete(`/tables/:id`, Auth.authenticated, TableController.delete)

api.get(`/itens`, Auth.authenticated, ItemController.index)
api.post(`/itens`, Auth.authenticated, ItemController.store)
api.get('/itens/:id', Auth.authenticated, ItemController.show)
api.put(`/itens/:id`, Auth.authenticated, ItemController.update)
api.delete(`/itens/:id`, Auth.authenticated, ItemController.delete)

api.get('/orders', Auth.authenticated, OrderController.index)
api.get('/orders/:id', Auth.authenticated, OrderController.show)
api.post('/orders/:id/read', Auth.authenticated, OrderController.read)
api.post('/orders/:id/ready', Auth.authenticated, OrderController.ready)
api.post('/orders/:id/finish', Auth.authenticated, OrderController.finish)

export default api
