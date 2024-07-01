const express = require('express')
const route = express.Router()
const {getInventory, withdrawProduct} = require('../controllers/inventory')

route.get('/inventory',getInventory)
route.post('/withdraw-product',withdrawProduct)

module.exports =route