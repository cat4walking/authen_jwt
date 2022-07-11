const jwt = require("jsonwebtoken");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });


const middlewareVetify = {
    verifyToken : (req, res, next) => {
        const token = req.body.token || req.query.token || req.headers["token"];
        if(!token) return res.status(403).send("A token is required for authentication");
        try {
            jwt.verify(token, process.env.SECRET, (err, user) => {
                if(err) return res.status(403).json("Token is not valid");
                req.token = user;
            });
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        return next();
    },
    // verify role admin
    verifyTokenAdmin : (req, res, next) => {
        middlewareVetify.verifyToken(req, res, () =>  {
            if (req.user.id == req.param.id || req.user.admin) {
                next()
            } else {
                return res.status(403).json("You're not allowed to do this !");
            }
        });
    },
};





module.exports = middlewareVetify;