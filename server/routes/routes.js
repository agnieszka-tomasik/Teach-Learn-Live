const User = require('../schemas/UserSchema.js');
const Newsletter = require('../schemas/NewsletterSchema.js');
const Courses = require('../schemas/CourseSchema.js');
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
    req.session.destroy(err => {
        if(err) {
            return res.sendStatus(500);
        } else {
            return res.sendStatus(200);
        }
    });
})

router.post('/signup-newsletter', (req, res) => {
    const {email} = req.body;
    Newsletter.create({email}, (err, doc) => {
        if(err) {
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

router.route('/admin/courses/courseslist').get((req,res) => {
    Courses.find((err, docs) => {
        if(err){
            return res.sendStatus(400);
        }else{
            return res.status(200).send(docs);
        }
    });
});

router.route('/admin/courses/add').post( (req, res) => {
    let {courseTitle, courseDesc} = req.body;
    console.log(courseTitle, courseDesc);
    Courses.create({courseTitle:courseTitle, courseDesc:courseDesc}, (err, doc) => {
        if(err){
            return res.sendStatus(400);
        }else{
            Courses.find((err, docs) => {
                if(err){
                    return res.sendStatus(400);
                }else{
                    return res.status(200).send(docs);
                }
            });
        }
    });
});

router.route('/admin/courses/delete').post( (req, res) => {
    let {courseTitle} = req.body;
    Courses.findOneAndRemove({courseTitle:courseTitle}, (err, doc) =>{
        if(err){
            return res.sendStatus(400);
        }else{
            Courses.find((err, docs) => {
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