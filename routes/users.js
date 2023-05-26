const express = require('express');
const router = express.Router();

const userscontroller = require('../controllers/users_controller');

router.get('/profile', userscontroller.profile);

router.get('/sign-up', userscontroller.signUp);
router.get('/sign-in', userscontroller.signIn);

router.post('/create', userscontroller.create);
router.post('/create-session', userscontroller.createSession);


module.exports = router;