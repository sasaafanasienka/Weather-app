const {Router} = require('express')
const User = require('../models/User')
const router = Router()
const auth = require('../middleware/auth.middleware')
const config = require('config')

router.get('/getdata', auth, async (req, res) => {
    try {
        const user = await User.find({ _id: req.user.userId }) //???
        res.json(user)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router