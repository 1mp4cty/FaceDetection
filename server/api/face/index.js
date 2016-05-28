var Router = require('express').Router
var controller = require('./face.controller')
var router = new Router()

router.get('/:id', controller.index)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

exports['default'] = router
module.exports = exports['default']
