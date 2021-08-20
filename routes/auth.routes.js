const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    check('login', 'Минимальная длина логина 2 символа').isLength({ min: 2 }),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при регистрации'
      })
    }

    const {login, password} = req.body

    const candidate = await User.findOne({ login })

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ login, password: hashedPassword, favs: [] })

    await user.save()

    res.status(201).json({ token, userId: user.id, userName: user.login, favs: user.favs, message: 'Пользователь создан' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('login', 'Введите корректный email').exists(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при входе в систему'
      })
    }

    const { login, password } = req.body

    const user = await User.findOne({ login })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      // { expiresIn: '1h' }
    )

    res.json({ token, userId: user.id, userName: user.login, favs: user.favs, message: "You're logged in" })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.put('/addfav', async (req, res) => {
  try {
      const { login, id } = req.body
      const user = await User.findOne({ login })
      user.favs.push(id)
      await user.save()
      res.json({ favs: user.favs, message: 'Location added to favourites' })
  } catch (e) {
      res.status(500).json({ message: e })
  }
})

router.put('/removefav', async (req, res) => {
  try {
      const { login, id } = req.body
      const user = await User.findOne({ login })
      const newFavs = user.favs.filter((el) => { return el !== id })
      user.favs = newFavs
      await user.save()
      res.json({ favs: user.favs, message: 'Location removed from favourites' })
  } catch (e) {
      res.status(500).json({ message: e })
  }
})

module.exports = router