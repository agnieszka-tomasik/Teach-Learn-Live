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
        if(err) {
            if(err.message.includes('to be unique')) {
                return res.status(400).send('Already signed up');
            }
            else if(err.message.includes('required')) {
                return res.status(400).send('Could not recognize email');
            }
        }
        else if (!doc) {
            return res.status(400).send("Couldn't sign up");
        } else {
            return res.sendStatus(200);
        }
    });
})

function validatePassword(password) {
    const lowers = /(?=.*[a-z]).*/
    const uppers = /(?=.*[A-Z]).*/
    const symbols = /(?=.*[!@#$%^&'()*+",-./:;<=>?[\\\]_`{|}~]).*/
    const length = /(?=^.{8,}$)/
    let outputs = [];

    if (password.search(lowers) === -1)
        outputs.push(-1);
    if (password.search(uppers) === -1)
        outputs.push(-2);
    if (password.search(symbols) === -1)
        outputs.push(-3);
    if (password.search(length) === -1)
        outputs.push(-4);

    return outputs;
}

router.route('/register').post((req, res) => {
    const { username, email, password } = req.body;

    let newUser = new User({
        uname: username,
        email: email
    }
    );
    // let newUser = new User({
    //     uname: "admin",
    //     email: "admin@gmail.com"
    // }
    // );

    /* Validating that the password is at least 8 characters long 
        * and contains at least one lowercase, uppercase, and special 
        * symbol character
        */
    let retnums = validatePassword(password);
    let errormsg = "";
    retnums.forEach((retnum) => {
        switch (retnum) {
            case -1:
                errormsg += "Password must contain at least one lowercase letter \n";
                break;
            case -2:
                errormsg += "Password must contain at least one uppercase letter \n";
                break;
            case -3:
                errormsg += "Password must contain at least one special symbol \n";
                break;
            case -4:
                errormsg += "Password must be at least 8 characters long \n";
                break;
        }
    });

    if (retnums.length > 0) {
        console.log(errormsg);
        return res.status(201).send(errormsg);
    } 

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
                    Blog.find((err, blogDocs) => {
                        if(err){
                            return res.sendStatus(400);
                        }else{
                            return res.status(200).send({
                                courses: coursesDocs,
                                posts: postDocs,
                                blog: blogDocs
                            });
                        }
                    });
                }
            })
        }
    });
});

module.exports = router;
