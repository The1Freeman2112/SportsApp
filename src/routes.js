const express = require('express')
const multer = require('multer')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const DashboardController = require('./controllers/DashboardController')

const uploadConfig = require('./config/upload')
const upload = multer(uploadConfig);

const routes = express.Router();

routes.get('/status',(req,res)=>{
    res.send({status: 200});
})

//TODO: LoginController 
//TODO: SubscribeController
//TODO: ApprovalController
//TODO: RejectionController


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