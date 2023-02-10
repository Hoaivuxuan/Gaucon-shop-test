import express from "express";

// let router = express.Router();
const router = express();
let initWebRouters = (app) => {
    router.get('/', (req, res) => {
        return res.send("HOAi!")
    });
    return app.use("/", router);
}

module.exports = initWebRouters;