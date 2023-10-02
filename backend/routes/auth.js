const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');




const JWT_SECRET = 'avinsha$me';


//routs 1: used post "/api/auth/createuser" not login required
router.post('/createuser', [

    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    // any error accuared send bad request
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    //check user used same/already exist email for login
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "sorry a user with this email already exist" })
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
            user: {
                id: user.id
            }
        }
        //data convert into authtoken
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);

        success=true;
        res.json({success, authtoken });

        //catch errors
    } catch (error) {
        console.log(error.massage);
        res.status(500).send("Internal server error");
    }
});



// //routs 2: used post "/api/auth/login"login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').exists(),
], async (req, res) => {

    let success = false;
    // any error accuared send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        success = false;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "please try to login with correct credentions" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error: "please try to login with correct credentions" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        //data convert into authtoken
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        success = true;
        res.json({success, authtoken });

    } catch (error) {
        console.log(error.massage);
        res.status(500).send("Internal server error");
    }

});
//raout : 3 used post "/api/auth/getuser in"login required

router.post('/getdata',fetchuser, async (req, res) => {

    // any error accuared send bad request
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
               
        res.send(user);
    } catch (error) {
        console.log(error.massage);
        res.status(500).send("Internal server error");
    }

});
module.exports = router