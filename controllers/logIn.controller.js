//userSchema Schema Imported Here
let userSchema = require('../models/users.model');
const jwt = require('jsonwebtoken');
const constants = require('../lib/consts');
 
class LogInuserSchema{
    //Method To Generate Auth Token
      async generateAuthToken(user) {
        const token = jwt.sign({_id: user._id}, constants.JWT_KEY)
        user.token = token
        await user.save()
        return token
    } 
    //Method To Make userSchema LogIn
    async userLogIn(req, res){
        //Login a registered user
        try {
            const { email, password } = req.body
            const user = await userSchema.findByCredentials(email, password, userSchema)
            if (!user) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'})
            }
            const token = await new LogInuserSchema().generateAuthToken(user)
            res.send({  token })
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    
    }

    


}

module.exports = new LogInuserSchema();