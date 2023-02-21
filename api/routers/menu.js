const express = require('express')
const { menuController } = require ('../controllers')
const route = express.Router()
const { uploader } = require('../config/upload')

const uploadFile = uploader('/img_food','/IMGFOOD').array('img',1)

route.get('/',menuController.getDataFood)
route.post('/',uploadFile,menuController.addFood)
route.delete('/:id',menuController.deleteFood)

module.exports=route