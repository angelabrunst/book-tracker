const db = require('../models');
const User = db.user;

exports.createUser = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    const user = new User(req.body);
    user
        .save()
        .then((data) => {
            console.log(data);
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the user.'
            });
        });
};

exports.getAllUser = (req, res) => {
    User.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users.'
            });
        });
};

exports.getUser = (req, res) => {
    const username = req.params.username;
    User.find({ username: username })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users.'
            });
        });
};

// exports.updateUser = async(req, res) => {
//     try {
//         const username = req.params.username;
//         if (!username) {
//             res.status(400).send({ message: 'Invalid Username Supplied' });
//             return;
//         }
//         User.findOne({ username: username }, function(err, user) {
//             user.username = req.params.username;
//             user.password = req.body.password;
//             user.displayName = req.body.displayName;
//             user.info = req.body.info;
//             user.profile = req.body.profile;
//             user.save(function(err) {
//                 if (err) {
//                     res.status(500).json(err || 'Some error occurred while updating the contact.');
//                 } else {
//                     res.status(204).send();
//                 }
//             });
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// exports.deleteUser = async(req, res) => {
//     try {
//         const username = req.params.username;
//         if (!username) {
//             res.status(400).send({ message: 'Invalid Username Supplied' });
//             return;
//         }
//         User.deleteOne({ username: username }, function(err, result) {
//             if (err) {
//                 res.status(500).json(err || 'Some error occurred while deleting the contact.');
//             } else {
//                 res.status(204).send(result);
//             }
//         });
//     } catch (err) {
//         res.status(500).json(err || 'Some error occurred while deleting the contact.');
//     }
// };