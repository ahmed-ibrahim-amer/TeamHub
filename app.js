const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const morgan = require('morgan');
const logger =  require("./src/config/middlewares/Logging");
//import {v2 as cloudinary} from'cloudinary';
dotenv.config();



//imports routes
const AuthenticationRoute = require('./src/config/routes/AuthRoute');
const OranizationRoute = require('./src/config/routes/OrganaizationRoute');
const TeamsRoute = require('./src/config/routes/TeamsRoute');
const ProjectRoute = require('./src/config/routes/ProjectRoute');
const BoardRoute = require('./src/config/routes/BoardRoute');
const TaskRoute = require('./src/config/routes/TaskRoute');
const NotificationRoute = require('./src/config/routes/NotificationRoute');
const TeamMember = require('./src/config/routes/TeamMemberRoute');
const InvitationsRoute = require('./src/config/routes/IvitationsRoute');
const Attachment = require('./src/config/routes/AttachRoute');



//apply middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public')); 
//routes
app.use('/api/v1/authentication',AuthenticationRoute);//api/v1/authentication
app.use('/api/v1/Attachment' , Attachment);//api/v1/attachment
//app.use()for images
app.use('/api/v1/board', BoardRoute);//api/v1/board
// app.use()//api/v1/comment
app.use('/api/v1/Inventions',InvitationsRoute);//api/v1/Inventions
app.use('/api/v1/Organization',OranizationRoute);
app.use('/api/v1/projects',ProjectRoute);//api/v1/projects
app.use('/api/v1/tasks',TaskRoute);
app.use('/api/v1/team',TeamsRoute);//api/v1/team
app.use('/api/v1/notification',NotificationRoute)//api/v1/notification
//app.use()//api/v1/Activity
app.use('/api/v1/TeamMember',TeamMember);


//logger from winston
app.use((req,res,next)=>{
        res.on('finish',()=>{
                logger.info(`${req.method}  ${req.originalUrl}`,{
                statusCode: res.statusCode,
                ip:req.ip,
                userAgent: req.get('User-Agent')
                });
        });
});



//Global error handler
app.use((err,req,res,next)=>{
        // console.error(err); 
        logger.error(err.stack);       
        res.status(err.statusCode||500).json({                   
                status: err.status ||'error',
                message:err.message ||'Internal server error'
        });
});

//get function
app.get('/',(req,res)=>{
        res.send('hello worlds');
});


//listen for server
// app.listen(PORT ,(req,res)=>{
//         console.log(`the server running on port: http://localhost:3000`);
// });






module.exports = app;

