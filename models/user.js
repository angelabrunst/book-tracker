module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
        username: {
            type: String
        },
        password: {
            type: String
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        booksRead: [
            mongoose.SchemaTypes.ObjectId
        ]
    });

    return mongoose.model('users', userSchema);
};