const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book');

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBook);
router.get('/:bookName', bookController.getBook);
router.put('/:bookName', bookController.updateBook);
router.delete('/:bookName', bookController.deleteBook);

module.exports = router;