const db = require('../models');
const Book = db.book;

exports.createBook = (req, res) => {
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
};

exports.getAllBook = (req, res) => {
    Book.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving books.'
            });
        });
};

exports.getBook = (req, res) => {
    const bookId = (req.params.id);
    Book.FindById(bookId)
        .then((data) => {
            if (!data) res.status(404).send({ message: 'Book not found named: ' + bookId });
            else res.send(data[0]);
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving book with book ID =' + bookId,
                error: err
            });
        });
};

// exports.updateBook = async(req, res) => {
//     try {
//         const bookName = req.params.bookName;
//         if (!bookName) {
//             res.status(400).send({ message: 'Invalid book name supplied' });
//             return;
//         }
//         Book.findOne({ bookName: bookName }, function(err, book) {
//             book.bookname = req.params.bookName;
//             book.bookAuthor = req.body.bookAuthor;
//             book.displayName = req.body.displayName;
//             book.numberOfPages = req.body.numberOfPages;
//             book.bookDescription = req.body.bookDescription;
//             book.save(function(err) {
//                 if (err) {
//                     res.status(500).json(err || 'Some error occurred while updating the book.');
//                 } else {
//                     res.status(204).send();
//                 }
//             });
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// exports.deleteBook = async(req, res) => {
//     try {
//         const bookName = req.params.bookName;
//         if (!bookName) {
//             res.status(400).send({ message: 'Invalid book name supplied' });
//             return;
//         }
//         Book.deleteOne({ bookName: bookName }, function(err, result) {
//             if (err) {
//                 res.status(500).json(err || 'Some error occurred while deleting the book.');
//             } else {
//                 res.status(204).send(result);
//             }
//         });
//     } catch (err) {
//         res.status(500).json(err || 'Some error occurred while deleting the book.');
//     }
// };