import express from 'express'
import cors from 'cors'
import routes from './routes/students.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
const port = process.env.PORT || 3000
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true})


// middleware
app.use(cors())
app.use("/", routes)

app.get('/student', (req, res) => {
    console.log(req.query.id)
    res.status(200).send("ok" + req.query.id)
})
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})