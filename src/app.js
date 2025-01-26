import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";


 const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
));

//ACCEPT DATA FROM USER IN JSON FORM    
app.use(express.json({limit:'30mb', extended:true}));

//ACCEPT URL ECNODDED DATA
app.use(express.urlencoded({limit:'30mb', extended:true}));

//FILE OR FOLDER STORAGE
app.use(express.static('public'));

//USE COOKIES
app.use(cookieParser());


export { app };