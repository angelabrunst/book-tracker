module.exports = (mongoose) => {
    const Book = mongoose.model(
        'books',
        mongoose.Schema({
            bookName: {
                type: String
            },
            bookAuthor: {
                type: String
            },
            numberOfPages: {
                type: Number
            },
            bookDescription: {
                type: String
            },
            bookCoverImg: {
                type: String
            }
        })
    );

    return Book;
};