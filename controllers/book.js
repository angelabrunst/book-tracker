const db = require('../models');
const Book = db.book;

module.exports.createBook = (req, res) => {
    try {
        const book = new Book(req.body);
        book
            .save()
            .then((data) => {
                console.log(data);
                res.status(201).send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the book.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.getAllBook = (req, res) => {
    try {
        Book.find({})
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving books.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.getBook = (req, res) => {
    try {
        const bookName = req.params.bookName;
        Book.find({ bookName: bookName })
            .then((data) => {
                if (!data) res.status(404).send({ message: 'Book not found named: ' + bookName });
                else res.send(data[0]);
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Error retrieving book with book name =' + bookName,
                    error: err
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.updateBook = async(req, res) => {
    try {
        const bookName = req.params.bookName;
        if (!bookName) {
            res.status(400).send({ message: 'Invalid book name supplied' });
            return;
        }
        Book.findOne({ bookName: bookName }, function(err, book) {
            book.bookname = req.params.bookName;
            book.bookAuthor = req.body.bookAuthor;
            book.numberOfPages = req.body.numberOfPages;
            book.bookDescription = req.body.bookDescription;
            book.bookCoverImg = reg.body.bookCoverImg;
            book.save(function(err) {
                if (err) {
                    res.status(500).json(err || 'Some error occurred while updating the book.');
                } else {
                    res.status(204).send();
                }
            });
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.deleteBook = async(req, res) => {
    try {
        const bookName = req.params.bookName;
        if (!bookName) {
            res.status(400).send({ message: 'Invalid book name supplied' });
            return;
        }
        Book.deleteOne({ bookName: bookName }, function(err, result) {
            if (err) {
                res.status(500).json(err || 'Some error occurred while deleting the book.');
            } else {
                res.status(204).send(result);
            }
        });
    } catch (err) {
        res.status(500).json(err || 'Some error occurred while deleting the book.');
    }
};