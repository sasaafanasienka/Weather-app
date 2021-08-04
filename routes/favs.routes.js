const {Router} = require('express')
const Fav = require('../models/Fav')
const router = Router()
const auth = require('../middleware/auth.middleware')
const config = require('config')

router.post('/addfav', auth, async (req, res) => {

    try {
        const { id } = req.body
    
        const fav = new Fav({
          cityId: id, owner: req.user.userId
        })

        await fav.save()
    
        res.status(201).json({ fav })
    } catch (e) {
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.delete('/removefav', auth, async (req, res) => {

    try {
        const { id } = req.body
        const favs = await Fav.findOneAndRemove({ cityId: id, owner: req.user.userId })
  
        res.status(201).json(favs)
        // res.send('GET request to the homepage')
    } catch (e) {
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const favs = await Fav.find({ owner: req.user.userId }) //???
        res.json(favs)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
    }
    
})

module.exports = router