const express = require('express');
const { connection } = require('./db');
const { userRoutes } = require("./routes/user.routes");
const { postRoutes } = require('./routes/post.routes');
const cors = require('cors');
require("dotenv").config(); 

const app = express();
app.use(express.json()); 

app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send({"msg": "This is the home page"});
});

app.use('/users', userRoutes);
app.use('/post', postRoutes);

const PORT = process.env.PORT; // Use all uppercase 'PORT'
app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Server is connected to the db");
        console.log(`Server is running at ${PORT}`);
    } catch (err) {
        console.log(err);
    }
});
