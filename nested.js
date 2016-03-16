'use strict';

// Module dependencies.
var express = require('express');

var app = express();

var userRouter = express.Router();
// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
var itemRouter = express.Router({mergeParams: true});

// you can nest routers by attaching them as middleware:
userRouter.use('/:userId/items', itemRouter);

userRouter.route('/')
    .get(function (req, res) {
        res.status(200)
            .send('hello users');
    });

userRouter.route('/:userId')
    .get(function (req, res) {
        res.status(200)
            .send('hello user ' + req.params.userId);
    });

itemRouter.route('/')
    .get(function (req, res) {
        res.status(200)
            .send('hello items from user ' + req.params.userId);
    });

itemRouter.route('/:itemId')
    .get(function (req, res) {
        res.status(200)
            .send('hello item ' + req.params.itemId + ' from user ' + req.params.userId);
    });

app.use('/user', userRouter);

app.listen(3000);