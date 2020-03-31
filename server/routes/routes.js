const User = require('../schemas/UserSchema.js');
const Newsletter = require('../schemas/NewsletterSchema.js');
const Courses = require('../schemas/CourseSchema.js');
const ForumPost = require('../schemas/ForumPostSchema.js')
const adminController = require('../controllers/AdminContentController.js');
const lmsController = require('../controllers/LMSContentController.js');
const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
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
                req.session.userID = doc._id;
                return res.sendStatus(200);
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
            req.session.userID = user._id;
            console.log(`Saved user -> ${user}`);
            console.log(`Binded session id -> ${req.session.userID}`);
            return res.sendStatus(200);
        }
    });
});

router.route('/admin').get(adminController);

router.route('/admin').post(adminController);

router.route('/admin/courses').get(adminController);

//make this prettier
router.route('/initdata').get((req, res) => {
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

router.route('/admin/courses/courseslist').get((req, res) => {
    Courses.find((err, docs) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            return res.status(200).send(docs);
        }
    });
});

router.route('/admin/courses/add').post((req, res) => {
    let { courseTitle, courseDesc } = req.body;
    console.log(courseTitle, courseDesc);
    Courses.create({ courseTitle: courseTitle, courseDesc: courseDesc }, (err, doc) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            Courses.find((err, docs) => {
                if (err) {
                    return res.sendStatus(400);
                } else {
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/admin/courses/delete').post((req, res) => {
    let { courseTitle } = req.body;
    Courses.findOneAndRemove({ courseTitle: courseTitle }, (err, doc) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            Courses.find((err, docs) => {
                if (err) {
                    return res.sendStatus(400);
                } else {
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/admin/courses/update').post((req, res) => {
    let course = req.body;
    Courses.findByIdAndUpdate(course._id, course, (err, doc) => {
        if (err || !doc) {
            return res.sendStatus(400);
        } else {
            Courses.find((err, docs) => {
                if (err) {
                    return res.sendStatus(400);
                } else {
                    return res.status(200).send(docs);
                }
            });
        }
    });
});
//The following is for routing the forum posts
router.post('/forum', (req, res) => {
    console.log('You are posting');

    User.findById(req.session.userID, (err, user) => {
        if (err || !user) {
            res.status(403).send("Not authorized");
        }
        else {
            let Post = new ForumPost(
                {
                    authUname: user.uname,
                    postTitle: req.body.postTitle,
                    postText: req.body.postText,
                }
            );

            Post.save((err, p) => {
                if (err) {
                    console.log('Error saving post');
                    console.log(err);
                }
                else {
                    ForumPost.find((err, docs) => {
                        if (err) {
                            return res.sendStatus(400);
                        }
                        else {
                            return res.status(200).send(docs);
                        }
                    });
                }
            });
        }
    })
});

router.route('/forum/comment').post((req, res) => {
    ForumPost.findById(req.body.post._id, (err, doc) => {
        if (err) {
            res.status(403).send("Comment not posted");
        }
        else {
            post = new ForumPost({
                authUname: req.session.userID,
                postText: req.body.text
            });
            doc.comments.push(post);
            ForumPost.findByIdAndUpdate(req.body.post._id, doc, (err, doc) => {
                if (err) {
                    res.status(403).send("Comment not posted");
                }
                else {
                    ForumPost.find((err, doc) => {
                        if (err) {
                            res.status(403).send("Comment not posted");
                        }
                        else {
                            res.status(200).send(doc);
                        }
                    })
                }
            });
        }
    });
});

module.exports = router;
