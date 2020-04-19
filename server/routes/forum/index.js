const ForumPost = require('../../schemas/ForumPostSchema.js')
const User = require('../../schemas/UserSchema.js');
const express = require('express');
const router = express.Router();

router.use(function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(403).send("Not authorized.");
    }
});

//The following is for routing the forum posts
router.post('/', (req, res) => {
    console.log('You are posting');

    User.findById(req.session.userID, (err, user) => {
        if (err || !user) {
            res.status(403).send("Not authorized");
        }
        else if (user.blacklisted) {
            res.status(403).send("You are blocked from posting");
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

router.route('/comment').post((req, res) => {
    ForumPost.findById(req.body.post._id, (err, doc) => {
        if (err) {
            res.status(403).send("Comment not posted");
        }
        else if (doc.blacklist.includes(req.session.userID)) {
            res.status(403).send("You are blocked from commenting on this post");
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