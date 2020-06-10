const router = require('express').Router();

//Method To Render Index Page
router.get('/', (req, res)=> res.render('citiesUsingReact/index'));


//_______________________________  Routes For Log In Page _______________________________________
const logInController = require('../controllers/logIn.controller');
//Method To Render LogIn Page
router.get('/login', (req, res)=> res.render('login/index',{email: '', password: '', error: false, errorMessage: ''}));

//Method To Log In User
router.post('/logIn', logInController.userLogIn);


//____________________________ Routes For Registration Page ___________________________________
//Register USer Controller Imported Here
let registerUserController = require('../controllers/register.controller');

//Method To Render Register User Page
router.get('/register', (req, res)=>res.render('register/index', {email: '', password: '', error: false, errorMessage: ''}));

//Method To Create New User
router.post('/register', registerUserController.createUser);


//____________________________ MEthod To Render Cities List Page______________________________//
//Method To Render City List Page Using React
router.get('/getCitiesUsingReact', (req, res)=> res.render('citiesUsingReact/index'))

//Method To Render City List Page Using AngularJS
router.get('/getCitiesUsingAngular', (req, res)=> res.render('citiesUsingAngular/index'))

//Method To Get Cities List 
router.get('/fetchCitiesList', (req, res)=>{
    const fs = require('fs')
    const fileContents = fs.readFileSync('./assets/cities.json', 'utf8')

    try {
        const data = JSON.parse(fileContents)
        res.send(data);
    }catch{
        res.status(500);
    }
})

module.exports = router;