const User = require('../schemas/UserSchema.js');
const lmsController = require('../controllers/lmsContentController.js');
const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    return res.redirect("/home");
});

//router.route('/modules/:module').get(lmsController, serveModule);

router.route('/login').post((req, res) => {
    const { username, password } = req.body;
    User.findOne({ uname: username}, (err, doc) => {
        if (err) {
            return res.sendStatus(500);
        } else if (doc) {
            if (doc.validPassword(password)) {
                req.session.userID = doc._id;
                return res.sendStatus(200);
            }
        }
        return res.sendStatus(400);
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
})

router.route('/register').post((req, res) => {
    const { username, email, password } = req.body;

    let newUser = new User({
        uname: username,
        email: email
    }
    );
    newUser.setPassword(password);
    newUser.save((err, user) => {
        if (err) {
            console.log(`Error saving user -> ${err}`);
            return res.sendStatus(400);
        } else {
            req.session.userID = user._id;
            console.log(`Saved user -> ${user}`);
            console.log(`Binded session id -> ${req.session.userID}`);
            return res.sendStatus(200);
        }
    });
});

module.exports = router;