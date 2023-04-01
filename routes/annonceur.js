const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  getall,
  del,
} = require('../controller/annonceur')
const { protect } = require('../middleware/authmiddelewares')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getMe)
router.get('/getall',getall);
router.delete('/delete/:id',del);
module.exports = router