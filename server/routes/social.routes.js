import { Router } from 'express'
import {
  followUser,
  unFollowUser,
  likePost,
  disLikePost,
  commentPost,
  deleteComment,
  likeComment,
  unLikeComment,
  deleteNotifications,
  getNotifications,
} from '../controllers/social.controller.js'
import { verifyToken } from '../libs/jwt.js'

const router = Router()

router.put('/social/follow', verifyToken, followUser)

router.put('/social/unfollow', verifyToken, unFollowUser)

router.put('/social/like/', verifyToken, likePost)

router.put('/social/dislike/', verifyToken, disLikePost)

router.post('/social/comment', verifyToken, commentPost)

router.delete(
  '/social/comment/:author/:idpost/:commentid',
  verifyToken,
  deleteComment
)

router.put('/social/commentlike/like', verifyToken, likeComment)

router.put('/social/commentlike/unlike', verifyToken, unLikeComment)

router.delete(
  `/social/notifications/:idOfUserLogged`,
  verifyToken,
  deleteNotifications
)

router.put(`/social/notifications/:username`, verifyToken, getNotifications)

export default router
