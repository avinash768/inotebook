const jwt = require('jsonwebtoken');

const JWT_SECRET = 'avinsha$me';


const fetchuser = (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please authenticate using a vaid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "please authenticate using a vaid token" })
    }
}


module.exports = fetchuser;