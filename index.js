const app = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const user = require('./routes/user')

const server = app()
const port = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

server.get('/', (req, res) => {
    res.send('Hello World!')
})

server.use('/api/user', user)

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})