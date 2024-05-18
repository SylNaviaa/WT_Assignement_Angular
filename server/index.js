import express from "express";
import mongoose from 'mongoose';
import cors from 'cors'
import userRoutes from "./routes/users.js";
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answer.js'
import dotenv from 'dotenv';
const app = express();

app.use(express.json({ limit: "30mb", extended: true }))

app.use(express.urlencoded({ limit: "30mb", extended: true }))

dotenv.config()

app.use(cors())

app.get('/', (req, res) => {
    res.send("This is sample")
})

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/answer', answerRoutes)

const PORT = process.env.PORT || 5000

const CONNECTIONS = "mongodb+srv://admin:admin@blogapp.eetrfsw.mongodb.net/?retryWrites=true&w=majority&appName=BlogApp";

mongoose.connect(CONNECTIONS, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log(`sever running on ${PORT}`);
    })).catch((err) => console.log(err.message));
