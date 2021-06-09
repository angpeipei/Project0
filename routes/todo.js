const router = require('express').Router()
const controller = require('../controllers/todo')
const verifyToken = require('./verifyToken')

router.get('/', controller.listTodo)
router.post('/', controller.createTodo)
router.get('/new',  (req, res) => res.render('todoCreate', {title:'Add to do'}))
router.get('/:id', controller.getTodo)
router.put('/:id', controller.updateTodo)
router.delete('/:id', controller.deleteTodo)
module.exports = router