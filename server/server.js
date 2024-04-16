const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();


app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);



const port = process.env.PORT;
const server = app.listen(port, () => console.log(`Server started on port ${port}`));