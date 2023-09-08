const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'avinsha$me';


//used post "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
], async (req, res) => {
    const errors = validationResult(req);

    // any error accuared send bad request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //check user used same/already exist email for login
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "sorry a user with this email already exist" })
        }


        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //create new users

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,

        });
        // .then(user => res.json(user));
        const data = {
            user:{
                id: user.id
            }
        }
        //data convert into authtoken
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        res.json({authtoken});

        //catch errors
    } catch (error) {
        console.log(error.massage);
        res.status(500).send("same error occured");
    }
})

module.exports = router