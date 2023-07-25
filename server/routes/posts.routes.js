import { Router } from 'express'
import {
  getOnlyPosts,
  createPost,
  deleteUnicPostById,
  newUsernameInPosts,
} from '../controllers/posts.controller.js'
import { verifyToken } from '../libs/jwt.js'

const router = Router()

router.get('/posts/:uId', getOnlyPosts)

router.post('/posts/:username', verifyToken, createPost)

router.delete('/posts/:username/:idpost', verifyToken, deleteUnicPostById)

router.put('/posts/newusername/:username', verifyToken, newUsernameInPosts)

export default router
