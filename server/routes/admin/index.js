const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/AdminContentController.js');
const User = require('../../schemas/UserSchema.js');
const Newsletter = require('../../schemas/NewsletterSchema.js');
const Blog = require('../../schemas/BlogPostSchema.js');
const Courses = require('../../schemas/CourseSchema.js');
const ForumPost = require('../../schemas/ForumPostSchema.js')

router.use(adminController);

//TODO -- this has similar call  as /initdata
// refactor
router.route('/courses/courseslist').get((req, res) => {
    Courses.find((err, docs) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            return res.status(200).send(docs);
        }
    });
});

router.route('/courses/add').post((req, res) => {
    let { title, description } = req.body;
    Courses.create({ title: title, description: description }, (err, doc) => {
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

router.route('/courses/delete').post((req, res) => {
    let { title } = req.body;
    Courses.findOneAndRemove({ title: title }, (err, doc) => {
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

router.route('/courses/update').post((req, res) => {
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

router.route('/users/userslist').get((req, res) => {
    User.find((err, docs) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            return res.status(200).send(docs);
        }
    });
});

router.route('/users/add').post((req, res) => {
    const { uname, email, password, isAdmin } = req.body;

    let newUser = new User({
        uname: uname,
        email: email,
        isAdmin: isAdmin
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
            User.find((err, docs) => {
                if (err) {
                    return res.sendStatus(400);
                } else {
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/users/delete').post((req, res) => {
    let { uname } = req.body;
    User.findOneAndRemove({ uname: uname }, (err, doc) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            User.find((err, docs) => {
                if (err) {
                    return res.sendStatus(400);
                } else {
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/users/update').post((req, res) => {
    let user = req.body;
    User.findById(user._id, (err, doc) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            if (user.password) {
                doc.setPassword(user.password);
            }
            User.findByIdAndUpdate(user._id, user, (err, data) => {
                if (err) {
                    return res.sendStatus(400);
                } else {
                    User.find((err, docs) => {
                        if (err) {
                            return res.sendStatus(400);
                        } else {
                            return res.status(200).send(docs);
                        }
                    });
                }
            })
        }
    });
});

router.route('/blog/posts').get((req, res) => {
    Blog.find((err, docs) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            return res.status(200).send(docs);
        }
    });
});

router.route('/blog/add').post((req, res) => {
    let { postTitle, postText } = req.body;
    Blog.create({
        authUname: req.session.uname || "Anonymous",
        postTitle: postTitle,
        postText: postText
    }, (err, doc) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            Blog.find((err, docs) => {
                if (err) {
                    return res.sendStatus(400);
                } else {
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/blog/delete').post((req, res) => {
    let { id } = req.body;
    Blog.findByIdAndRemove(id, (err, doc) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            Blog.find((err, docs) => {
                if (err) {
                    return res.sendStatus(400);
                } else {
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/blog/update').post((req, res) => {
    let post = req.body;
    Blog.findByIdAndUpdate(post._id, post, (err, doc) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            Blog.find((err, docs) => {
                if (err) {
                    return res.sendStatus(400);
                } else {
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/newsletter/emails').get((req, res) => {
    Newsletter.find((err, docs) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            return res.status(200).send(docs);
        }
    });
});

router.route('/newsletter/add').post((req, res) => {
    let { email } = req.body;
    Newsletter.create({
        email: email
    }, (err, doc) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            Newsletter.find((err, docs) => {
                if (err) {
                    return res.sendStatus(400);
                } else {
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/newsletter/delete').post((req, res) => {
    let { id } = req.body;
    Newsletter.findByIdAndRemove(id, (err, doc) => {
        if (err) {
            return res.sendStatus(400);
        } else {
            Newsletter.find((err, docs) => {
                if (err) {
                    return res.sendStatus(400);
                } else {
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

module.exports = router;