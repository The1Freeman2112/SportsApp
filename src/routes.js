const express = require('express')
const multer = require('multer')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const RegistrationController = require('./controllers/RegistrationController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')

const uploadConfig = require('./config/upload')
const upload = multer(uploadConfig);

const routes = express.Router();

routes.get('/status',(req,res)=>{
    res.send({status: 200});
})


//Registration
routes.post('/registration/:eventId', RegistrationController.create)
routes.get('/registration/:registration_id',RegistrationController.getRegistration)
routes.post('/registration/:registration_id/approvals',ApprovalController.approval)
routes.post('/registration/:registration_id/rejections',RejectionController.rejection)

//Login
routes.post('/login', LoginController.store)

//Event
routes.post('/event', upload.single("thumbnail"), EventController.createEvent)
routes.delete('/event/:eventId',EventController.delete)

//Dashboard
routes.get('/dashboard/:sport', DashboardController.getAllEvents)
routes.get('/dashboard', DashboardController.getAllEvents)
routes.get('/dashboard/:eventId', DashboardController.getEventById)

//User
routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)


module.exports = routes