//User Schema Imported Here
const User  = require('../models/users.model');
const jwt = require('jsonwebtoken');
const constants = require('../lib/consts');

class RegisterUser{
    //Method To Generate Auth Token
    async generateAuthToken(user) {
        const token = jwt.sign({_id: user._id}, constants.JWT_KEY)
        user.token = token
        await user.save()
        return token
    } 

    // Create a new user
    async  createUser(req, res){
        // Create a new user
        try {
            if(req.body.email == '' && req.body.password == '')
               return res.render('register/index', {email: req.body.email, password: req.body.password, error: true, errorMessage: 'Please Enter Email And Password'});
            else if(req.body.email == '')
                return res.render('register/index', {email: req.body.email, password: req.body.password, error: true, errorMessage: 'Please Enter Email'});
            else if(req.body.password == '')
                return res.render('register/index', {email: req.body.email, password: req.body.password, error: true, errorMessage: 'Please Enter Password'});
           
           let user = new User(req.body)
            user = await user.save()
            const token = await new RegisterUser().generateAuthToken(user)
            return res.send("User Created Successfully, Please Log In \n Token is : "+token)
        } catch (error) {
            console.log(error)
            if (error.name == 'ValidationError') {
                return res.render('register/index', {email: req.body.email, password: req.body.password, error: true, errorMessage: 'User With This Email Already Exist'});
            }
            return res.status(400).send(error)
        }
    }
}

module.exports = new RegisterUser();