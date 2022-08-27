const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')

const User = require ('../models/User')

// @route	POST api/users
// @desc	Register a user
// @access	Public

router.post('/', 
	check('name', 'Iltimos isim kiriting ').not().isEmpty(),
	check('email', 'Iltimos yaroqli pochta kiriting').isEmail(),
	check('password', 'Iltimos eng kamida 6ta harakterli parol kiriting yoki undan ko`p ').isLength({min: 6})
, async (req, res) => {
	const erorrs = validationResult(req)
		if(!erorrs.isEmpty()){
			return res.status(400).json({erorrs: erorrs.array()})
		}

		const {name, email, password} = req.body

		try {
			let user = await User.findOne({ email })
			
			if(user) {
				return res.status(400).json({ msg: 'Bu ishlatuvchi mavjud' })
			}

			user = new User ({
				name,
				email,
				password
			})

			const salt = await bcrypt.genSalt(10)

			user.password = await bcrypt.hash(password, salt)

			await user.save()

			const payload = {
				user: {
					id: user.id
				}
			}
			
			jwt.sign(payload, config.get("jwtSecret"),{expiresIn: 360000},
			(err, token) => {
				if(err) throw err
				res.json({ token })
			})

		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Hatolik')
		}
	}
)

module.exports = router