const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBook);
router.get('/:bookName', bookController.getBook);
// router.put('/:bookName', userController.updateBook);
// router.delete('/:bookName', userController.deleteBook);

module.exports = router;