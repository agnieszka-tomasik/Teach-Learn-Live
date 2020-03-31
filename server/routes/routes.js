const User = require('../schemas/UserSchema.js');
const Newsletter = require('../schemas/NewsletterSchema.js');
const Blog = require('../schemas/BlogPostSchema.js');
const Courses = require('../schemas/CourseSchema.js');
const ForumPost = require('../schemas/ForumPostSchema.js')
const adminController = require('../controllers/AdminContentController.js');
const lmsController = require('../controllers/LMSContentController.js');
const express = require('express');
const router = express.Router();

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

router.route('/admin/courses/add').post( (req, res) => {
    let {courseTitle, courseDesc} = req.body;
    Courses.create({courseTitle:courseTitle, courseDesc:courseDesc}, (err, doc) => {
        if(err){
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

router.route('/admin/users/userslist').get((req,res) => {
    User.find((err, docs) => {
        if(err){
            return res.sendStatus(400);
        }else{
            return res.status(200).send(docs);
        }
    });
});

router.route('/admin/users/add').post( (req, res) => {
    const { uname, email, password, isAdmin} = req.body;

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
            if (err.name === 'ValidationError')
            {
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
                if(err){
                    return res.sendStatus(400);
                }else{
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/admin/users/delete').post( (req, res) => {
    let {uname} = req.body;
    User.findOneAndRemove({uname:uname}, (err, doc) =>{
        if(err){
            return res.sendStatus(400);
        }else{
            User.find((err, docs) => {
                if(err){
                    return res.sendStatus(400);
                }else{
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/admin/users/update').post( (req, res) => {
    let user = req.body;
    User.findById(user._id, (err, doc) =>{
        if(err){
            return res.sendStatus(400);
        }else{
            if(user.password != null || user.password != ""){
                doc.setPassword(user.password);
            }
            User.findByIdAndUpdate(user._id, user, (err,data) =>{
                if(err){
                    return res.sendStatus(400);
                }else{
                    User.find((err, docs) => {
                        if(err){
                            return res.sendStatus(400);
                        }else{
                            return res.status(200).send(docs);
                        }
                    });
                }
            })
        }
    });
});

router.route('/admin/blog/posts').get((req,res) => {
    Blog.find((err, docs) => {
        if(err){
            return res.sendStatus(400);
        }else{
            return res.status(200).send(docs);
        }
    });
});

router.route('/admin/blog/add').post( (req, res) => {
    let {postTitle, postText} = req.body;
    Blog.create({
        authUname: req.session.uname || "Anonymous",
        postTitle:postTitle, 
        postText:postText
    }, (err, doc) => {
        if(err){
            return res.sendStatus(400);
        }else{
            Blog.find((err, docs) => {
                if(err){
                    return res.sendStatus(400);
                }else{
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/admin/blog/delete').post( (req, res) => {
    let {id} = req.body;
    Blog.findByIdAndRemove(id, (err, doc) =>{
        if(err){
            return res.sendStatus(400);
        }else{
            Blog.find((err, docs) => {
                if(err){
                    return res.sendStatus(400);
                }else{
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/admin/blog/update').post( (req, res) => {
    let post = req.body;
    Blog.findByIdAndUpdate(post._id, post, (err, doc) =>{
        if(err){
            return res.sendStatus(400);
        }else{
            Blog.find((err, docs) => {
                if(err){
                    return res.sendStatus(400);
                }else{
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/admin/newsletter/emails').get((req,res) => {
    Newsletter.find((err, docs) => {
        if(err){
            return res.sendStatus(400);
        }else{
            return res.status(200).send(docs);
        }
    });
});

router.route('/admin/newsletter/add').post( (req, res) => {
    let {email} = req.body;
    Newsletter.create({
        email:email
    }, (err, doc) => {
        if(err){
            return res.sendStatus(400);
        }else{
            Newsletter.find((err, docs) => {
                if(err){
                    return res.sendStatus(400);
                }else{
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/admin/newsletter/delete').post( (req, res) => {
    let {id} = req.body;
    Newsletter.findByIdAndRemove(id, (err, doc) =>{
        if(err){
            return res.sendStatus(400);
        }else{
            Newsletter.find((err, docs) => {
                if(err){
                    return res.sendStatus(400);
                }else{
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

module.exports = router;
