const User = require('../schemas/UserSchema.js');
const Newsletter = require('../schemas/NewsletterSchema.js');
const Blog = require('../schemas/BlogPostSchema.js');
const Courses = require('../schemas/CourseSchema.js');
const ForumPost = require('../schemas/ForumPostSchema.js')
const adminRouter = require('./admin');
const forumRouter = require('./forum');
const express = require('express');
const router = express.Router();

//Routes that contain /admin go here
router.use('/admin', adminRouter);
//Routes that contain /forum go here
router.use('/forum', forumRouter);

function saveSession(req, doc) {
    req.session.userID = doc._id;
    req.session.user = doc;
}

function sendProfileInfo(res, user) {
    return res.send({
        valid: true,
        user: {
            username: user.uname,
            email: user.email,
            courses: user.courses,
            isAdmin: user.isAdmin,
            joinDate: user.joinDate,
        }
    });
}

router.route('/').get((_, res) => {
    return res.redirect("/home");
});

//router.route('/modules/:module').get(lmsController, serveModule);

router.route('/login').post((req, res) => {
    const { username, password } = req.body;
    User.findOne({ uname: username }, (err, doc) => {
        if (err) {
            return res.sendStatus(400);
        } else if (doc) {
            if (doc.validPassword(password)) {
                saveSession(req, doc);
                return sendProfileInfo(res, doc);
            }
            res.status(201);
            res.write("Incorrect password.");
            res.end();
            return res.send();
        }
        res.status(201);
        res.write("Username not found.");
        res.end();
        return res.send();
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.sendStatus(500);
        } else {
            return res.sendStatus(200);
        }
    });
})

router.post('/signup-newsletter', (req, res) => {
    const { email } = req.body;
    Newsletter.create({ email }, (err, doc) => {
        if (err || !doc) {
            return res.sendStatus(400);
        } else {
            return res.sendStatus(200);
        }
    });
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
            if (err.name === 'ValidationError') {
                res.status(201);
                if (err.errors.uname) {
                    res.write('Username is already taken. ');
                }
                if (err.errors.email) {
                    res.write('Email is already taken. ');
                }
                res.end();
                return res.send();
            }
            return res.sendStatus(400);
        } else {
            saveSession(req, user);
            console.log(`Saved user -> ${user}`);
            console.log(`Binded session id -> ${req.session.userID}`);
            return sendProfileInfo(res, user);
        }
    });
});


router.get('/session', (req, res) => {
    if (req.session && req.session.userID) {
        const user = req.session.user
        return sendProfileInfo(res, user);
    } else {
        return res.send({ valid: false });
    }
})


//make this prettier
router.route('/initdata').get((req, res) => {
    //TODO, these data points should be irrespective of each other and defined as seperate GET instances. 
    Courses.find((err, coursesDocs) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            ForumPost.find((err, postDocs) => {
                if (err) {
                    return res.sendStatus(400);
                }
                else {
                    return res.status(200).send({
                        courses: coursesDocs,
                        posts: postDocs
                    });
                }
            })
        }
    });
});

module.exports = router;
