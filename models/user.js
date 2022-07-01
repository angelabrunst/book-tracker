const bcrypt = require('bcrypt');

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
            mongoose.SchemaTypes.String
        ]
    });

    userSchema.pre('save', async function(next) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt)
        next();
    });

    return mongoose.model('users', userSchema);
};