const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { create,
    getUserById, 
    getUser, 
    updateUser, 
    deleteUser, 
    getUserByEmail } = require('../services/user.service');
const path = require("path");
const bcrypt = require("bcrypt");
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const jwt = require("jsonwebtoken");

module.exports = {
    createUsers : (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        create (body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json(
                    {
                        message : "Database connect error !"
                    }
                )
            };
            return res.status(200).json({
                data : results
            });
        });
    },
    getUser : (req, res) => {
        getUser((err, results) => {
            if (err) {
                console.log(err)
                return ;
            };
            return res.json({
                data : results                
            })
        })
    },
    getUserById : (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) =>{
            if (err) {
                return console.log(err);
            };if (results.length <= 0) {
                return res.json(
                    {
                        message : "ID not found"
                    }
                );
            };
            return res.json({
                data : results
            });
        }
        );
    },
    updateUser : (req, res) => {
        const body =  req.body;
        const id = req.params.id; 
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(id, body, (err, results) => {
            if (err) {
                return console.log(err)
            } if (results.length <= 0) {
                return res.json({
                    message : "update failed"
                });
            };
            return res.json({
                message : "update successfully !"
            });
        });
    },
    deleteUser : (req, res) => {
        const id = req.params.id;
        deleteUser(id, (err, results) => {
            if (err){
                return console.log(err)
            }if (!results) return res.json(
                {
                    message : "User not found"
                }    
            );
            return res.json({
                message : "Deleted successfully !"
            });
        });
    },
    login :  (req, res) => { 
        const body = req.body;
        const emailExist = body.email;
        getUserByEmail (emailExist , (err, results) => {
            if(err) console.log(err);
            if (results.length==0) return res.json({
                message : "User not found"
            });
            const user = results.shift()
            const passwordValid = bcrypt.compare(req.body.password, user.password);
            if (user && passwordValid) {
                const token = jwt.sign({user_id : user._id, email: emailExist }, process.env.SECRET,{
                    expiresIn : "1h"
                });
                return res.status(200).json({
                    user,
                    token : token
                });
            } else {
                return res.json({ data: "Invalid email or password"});
            }
        });
    }

};