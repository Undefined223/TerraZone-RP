const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();
const path = require('path');
const { storage, upload } = require("./utils/storage");
const userRoutes = require('./routes/user.routes')




app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

const { registerUser  } = require("./controllers/user.controller");
app.post('/api/user/', upload.single('pic'), registerUser);


app.use("/api/user", userRoutes);

app.use('/uploads/', express.static(path.join(__dirname, 'uploads/')));




const port = process.env.PORT;
const server = app.listen(port, () => console.log(`Server started on port ${port}`));