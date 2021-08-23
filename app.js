const express =  require('express')
const config = require('config')
const mongoose = require('mongoose')

require('dotenv').config()
const cors = require('cors')

const app = express()

const PORT = config.get('port') || 5000 
app.use(cors())
app.use(express.json({ extended: true }))
app.use('/api/auth',  require('./routes/auth.routes'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }) 
        app.listen(PORT, () => { console.log(`app has been started on port ${PORT}...`)})
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()