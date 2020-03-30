const User = require('../schemas/UserSchema.js');

module.exports = (req, res, next) => {
    if (req.session.userID) {
        User.findById(req.session.userID, (err, user) => {
            if (err) {
                res.status(403).send('Not authorized.');
            } else if (user.isAdmin || user.courses.includes(req.body.course)) {
                next();
            }
        });
    } else {
        res.status(403).send('Not authorized.');
    }
};
