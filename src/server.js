import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/connectDB";
//
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
// import cors from 'cors';
require('dotenv').config();

let app = express();
// app.use(cors(({origin: true})))

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

viewEngine(app);
initWebRouters(app);

connectDB();

let port = process.env.PORT || 8099;
app.listen(port, () => {
    console.log("Backend nodejs is runing on the port : " + port)
})