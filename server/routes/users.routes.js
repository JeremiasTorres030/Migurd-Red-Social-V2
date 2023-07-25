import { Router } from 'express'
import {
  deleteUser,
  editUser,
  getUnicUserByUsername,
  createUser,
  getLoginUser,
  getUnicUserById,
  searchUsers,
  getLoginTokenUser,
  getProfileByUsername,
  getProfileFollowersByUsername,
  getProfileFollowingByUsername,
} from '../controllers/users.controller.js'
import { verifyToken } from '../libs/jwt.js'

const router = Router()

router.get('/search/:username', searchUsers)

router.post('/users', createUser)

router.put('/users/:username', verifyToken, editUser)

router.delete('/users/:username', verifyToken, deleteUser)

router.get('/users/:username', getUnicUserByUsername)

router.get('/user/:id', getUnicUserById)

router.get('/users/login/:email/:password', getLoginUser)

router.get('/users/login/:token', verifyToken, getLoginTokenUser)

router.get(
  '/user/profile/followers/:username',
  verifyToken,
  getProfileFollowersByUsername
)

router.get(
  '/user/profile/following/:username',
  verifyToken,
  getProfileFollowingByUsername
)

router.get('/user/profile/:type/:username', verifyToken, getProfileByUsername)

export default router
