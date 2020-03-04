const User = require('../schemas/UserSchema.js');
const lmsController = require('../controllers/lmsContentController.js');
const express = require('express');
const router = express.Router();

router.route('/').get((req,res) =>{
    return res.redirect("/home");
});

router.route('/home').get((req,res) =>{
    console.log(req.session.userID);
    if(req.session.userID){
        res.send(`
        <h1>Home</h1>
        <h1>Is logged in: True</h1>
        <h1>UID/SESSIONID -> ${req.session.userID}</h1>
        <a href='/register'>Register</a>
        <a href='/login'>Login</a>
        `);
    }else{
        res.send(`
        <h1>Home</h1>
        <h1>Is logged in: False</h1>
        <a href='/register'>Register</a>
        <a href='/login'>Login</a>
        `);
    }
});

router.route('/login').get((req,res) =>{
    res.send(`
    <h1>Login</h1>
    <form method='post' action='/login'>
        <input name='username' placeholder='Username' required />
        <input type='email' name='email' placeholder='Email' required />
        <input type='password' name='password' placeholder='Password' required />
        <input type='submit' />
    </form>
    <a href='/register'>Register</a>
    `);
});

//router.route('/modules/:module').get(lmsController, serveModule);

router.route('/modules').get((req,res) =>{
    res.send(`<h1>Modules List</h1>`)
});

router.route('/register').get((req,res) =>{
    res.send(`
    <h1>Register</h1>
    <form method='post' action='/register'>
        <input name='username' placeholder='Username' required />
        <input type='email' name='email' placeholder='Email' required />
        <input type='password' name='password' placeholder='Password' required />
        <input type='submit' />
    </form>
    <a href='/login'>Login</a>
    `);
});

router.route('/login').post((req,res) =>{
    const {username, email, password} = req.body;
    User.findOne({uname:username}, (err,doc) =>{
        if(err){
            return res.status(400).send('Error.');
        }else if(doc){
            if(doc.validPassword(password)){
                req.session.userID = doc._id;
                return res.redirect('/home');
            }
        }
    });
    User.findOne({email:email}, (err,doc) =>{
        if(err){
            return res.status(400).send('Error.');
        }else if(doc){
            if(doc.validPassword(password)){
                req.session.userID = doc._id;
                return res.redirect('/home');
            }
        }
    });
    return res.redirect('/login');
});

router.route('/register').post((req,res) =>{
    const {username, email, password} = req.body;

    User.findOne({uname:username}, (err,doc) =>{
        if(err){
            return res.status(400).send('Error.');
        }else if(doc){
            return res.redirect('/register');
        }
    });
    User.findOne({email:email}, (err,doc) =>{
        if(err){
            return res.status(400).send('Error.');
        }else if(doc){
            return res.redirect('/register');
        }
    });
    let newUser = new User({
            uname: username,
            email: email
        }
    );
    newUser.setPassword(password);
    newUser.save((err, user) => {
        if(err){
            console.log(`Error saving user -> ${err}`);
            return res.redirect('/home');
        }else{
            req.session.userID = user._id;
            console.log(`Saved user -> ${user}`);
            console.log(`Binded session id -> ${req.session.userID}`);
            return res.redirect('/home');
        }
    });
});

module.exports = router;