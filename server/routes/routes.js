const express = require('express');
const User = require('../schemas/UserSchema.js');
const Newsletter = require('../schemas/NewsletterSchema.js');
// const lmsController = require('../controllers/lmsContentController.js');

const router = express.Router();

function saveSession(req, doc) {
    // eslint-disable-next-line no-underscore-dangle
    req.session.userID = doc._id;
    req.session.user = doc;
}

router.route('/').get((req, res) => res.redirect('/home'));

// router.route('/modules/:module').get(lmsController, serveModule);

router.route('/login').post((req, res) => {
    const { username, password } = req.body;
    User.findOne({ uname: username }, (err, doc) => {
        if (err) {
            return res.sendStatus(500);
        } if (doc) {
            if (doc.validPassword(password)) {
                saveSession(req, doc);
                return res.sendStatus(200);
            }
        }
        return res.sendStatus(400);
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
});

router.post('/signup-newsletter', (req, res) => {
    const { email } = req.body;
    Newsletter.create({ email }, (err) => {
        if (err) {
            return res.sendStatus(400);
        }
        return res.sendStatus(200);
    });
});

router.route('/register').post((req, res) => {
    const { username, email, password } = req.body;

    const newUser = new User({
        uname: username,
        email,
    });
    newUser.setPassword(password);
    newUser.save((err, user) => {
        if (err) {
            console.log(`Error saving user -> ${err}`);
            return res.sendStatus(400);
        }
        saveSession(req, user);
        console.log(`Saved user -> ${user}`);
        console.log(`Binded session id -> ${req.session.userID}`);
        return res.sendStatus(200);
    });
});


router.get('/session', (req, res) => {
    if (req.session && req.session.userID) {
        const { user } = req.session;
        return res.send({
            valid: true,
            user: {
                username: user.uname,
                email: user.email,
                courses: user.courses,
                isAdmin: user.isAdmin,
                joinDate: user.joinDate,
            },
        });
    }
    return res.send({ valid: false });
});

module.exports = router;
