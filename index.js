const express =  require('express')
const config = require('config')
const mongoose = require('mongoose')

require('dotenv').config()
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json({ extended: true }))
app.use('/api/auth',  require('./routes/auth.routes'))

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }) 
        app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()