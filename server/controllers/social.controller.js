import { users } from '../models/usersModel.js'

export const followUser = async (req, res) => {
  const { userFollowed, whoFollow } = req.body

  try {
    const uFollowed = await users.findById(userFollowed, {
      followers: 1,
      notifications: 1,
      _id: 0,
    })

    if (uFollowed === null) {
      res.status(404).json({
        ok: false,
        msg: 'No se encontro al usuario',
      })
      return
    }

    const wFollow = await users.findById(whoFollow, { following: 1, _id: 0 })

    if (wFollow === null) {
      res.status(404).json({
        ok: false,
        msg: 'No se encontro al usuario',
      })
      return
    }

    wFollow.following.push(userFollowed)
    uFollowed.followers.push(whoFollow)

    const noty = {
      idUser: whoFollow,
      message: `te siguió`,
      typeNoti: 'follow',
    }

    uFollowed.notifications.push(noty)

    await users.findByIdAndUpdate(
      whoFollow,
      { following: wFollow.following },
      { new: true }
    )
    await users.findByIdAndUpdate(
      userFollowed,
      {
        followers: uFollowed.followers,
        notifications: uFollowed.notifications,
      },
      { new: true }
    )
    res.status(200).json({ ok: true, msg: 'Usuario seguido con exito' })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const unFollowUser = async (req, res) => {
  const { userFollowed, whoFollow } = req.body

  try {
    const wFollow = await users.findById(whoFollow, { following: 1, _id: 0 })

    if (wFollow === null) {
      res.status(404).json({
        ok: false,
        msg: 'No se encontro al usuario',
      })
      return
    }

    const uFollowed = await users.findById(userFollowed, {
      followers: 1,
      _id: 0,
    })

    if (uFollowed === null) {
      res.status(404).json({
        ok: false,
        msg: 'No se encontro al usuario',
      })
      return
    }

    const unFollowFollowing = wFollow.following.filter((users) => {
      return users !== userFollowed
    })

    const unFollowFollowers = uFollowed.followers.filter((users) => {
      return users !== whoFollow
    })

    await users.findByIdAndUpdate(
      whoFollow,
      { following: unFollowFollowing },
      { new: true }
    )

    await users.findByIdAndUpdate(
      userFollowed,
      { followers: unFollowFollowers },
      { new: true }
    )
    res
      .status(200)
      .json({ ok: true, msg: 'Usuario dejado de seguir con exito' })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const likePost = async (req, res) => {
  const { author, idPost, user } = req.body

  try {
    const authorOfPost = await users.findById(author, {
      _id: 0,
      notifications: 1,
      posts: 1,
    })
    if (authorOfPost === null) {
      res.status(404).json({
        ok: false,
        msg: 'No se encontro al usuario',
      })
      return
    }
    const [likedPost] = authorOfPost.posts.filter((post) => {
      return post._id.toString() === idPost
    })
    likedPost.likes.push({ idUser: user })

    if (author !== user.username) {
      const noty = {
        idUser: user,
        message: `le ha dado like a tu post :${likedPost.content}`,
        imgPost: likedPost.image?.url,
        idPost,
        typeNoti: 'like',
      }
      authorOfPost.notifications.push(noty)
    }
    await users.findByIdAndUpdate(
      author,
      { posts: authorOfPost.posts, notifications: authorOfPost.notifications },
      { new: true }
    )
    res.status(200).json({ ok: true, msg: 'Post likeado con exito' })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const disLikePost = async (req, res) => {
  const { author, idPost, user } = req.body
  try {
    const authorOfPost = await users.findById(author, { posts: 1, _id: 0 })
    if (authorOfPost === null) {
      res.status(404).json({
        ok: false,
        msg: 'No se encontro al usuario',
      })
      return
    }

    const indexDisLikedPost = authorOfPost.posts.findIndex((post) => {
      return post._id.toString() === idPost
    })

    const dislikedPost = authorOfPost.posts[indexDisLikedPost]

    dislikedPost.likes = dislikedPost.likes.filter(
      (like) => like.idUser !== user
    )

    authorOfPost.posts[indexDisLikedPost] = dislikedPost

    await users.findByIdAndUpdate(
      author,
      { posts: authorOfPost.posts },
      { new: true }
    )
    res.status(200).json({ ok: true, msg: 'Post dislikeado con exito' })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const commentPost = async (req, res) => {
  const { author, idPost, commentCreated } = req.body

  try {
    const authorOfPost = await users.findById(author, {
      posts: 1,
      notifications: 1,
      _id: 0,
    })

    if (authorOfPost === null) {
      res.status(404).json({
        ok: false,
        msg: 'No se encontro al usuario',
      })
      return
    }

    const indexOfCommentedPost = authorOfPost.posts.findIndex(
      (post) => post._id.toString() === idPost
    )

    authorOfPost.posts[indexOfCommentedPost].comments.push(commentCreated)

    if (author !== commentCreated.commentAuthorId) {
      const noty = {
        idUser: commentCreated.commentAuthorId,
        message: ` ha comentado "${commentCreated.commentContent}" en :${authorOfPost.posts[indexOfCommentedPost].content}`,
        imgPost: authorOfPost.posts[indexOfCommentedPost].image?.url,
        idPost,
        typeNoti: 'comment',
      }
      authorOfPost.notifications.push(noty)
    }

    await users.findByIdAndUpdate(author, {
      posts: authorOfPost.posts,
      notifications: authorOfPost.notifications,
    })

    res.status(200).json({
      ok: true,
      data: authorOfPost.posts[indexOfCommentedPost].comments,
      msg: 'Post comentado con exito',
    })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const deleteComment = async (req, res) => {
  const { author, idpost, commentid } = req.params
  try {
    const authorOfPost = await users.findById(author, { posts: 1, _id: 0 })

    if (authorOfPost === null) {
      res.status(404).json({
        ok: false,
        msg: 'No se encontro al usuario',
      })
      return
    }

    const indexPostOfDeletedComment = authorOfPost.posts.findIndex(
      (post) => post._id.toString() === idpost
    )

    const postOfDeletedComment = authorOfPost.posts[indexPostOfDeletedComment]

    postOfDeletedComment.comments = postOfDeletedComment.comments.filter(
      (comment) => comment._id.toString() !== commentid
    )

    authorOfPost.posts[indexPostOfDeletedComment] = postOfDeletedComment

    await users.findByIdAndUpdate(author, { posts: authorOfPost.posts })
    res.status(200).json({
      ok: true,
      msg: 'Post eliminado con exito',
    })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const likeComment = async (req, res) => {
  const { author, idPost, commentId, idUser } = req.body

  try {
    const authorOfPost = await users.findById(author, { posts: 1, _id: 0 })

    if (authorOfPost === null) {
      res.status(404).json({
        ok: false,
        msg: 'No se encontro al usuario',
      })
      return
    }

    const indexOfPost = authorOfPost.posts.findIndex(
      (post) => post._id.toString() === idPost
    )

    const indexOfComment = authorOfPost.posts[indexOfPost].comments.findIndex(
      (comment) => comment._id.toString() === commentId
    )

    const objectLikeUser = {
      idUser,
    }

    authorOfPost.posts[indexOfPost].comments[indexOfComment].commentLikes.push(
      objectLikeUser
    )

    await users.findByIdAndUpdate(author, { posts: authorOfPost.posts })
    res.status(200).json({
      ok: true,
      msg: 'Comentario likeado con exito',
    })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const unLikeComment = async (req, res) => {
  const { author, idPost, commentId, idUser } = req.body

  try {
    const authorOfPost = await users.findById(author, { posts: 1, _id: 0 })

    if (authorOfPost === null) {
      res.status(404).json({
        ok: false,
        msg: 'No se encontro al usuario',
      })
      return
    }

    const indexOfPost = authorOfPost.posts.findIndex(
      (post) => post._id.toString() === idPost
    )

    const indexOfComment = authorOfPost.posts[indexOfPost].comments.findIndex(
      (comment) => comment._id.toString() === commentId
    )

    const commentDisliked =
      authorOfPost.posts[indexOfPost].comments[indexOfComment]

    commentDisliked.commentLikes = commentDisliked.commentLikes.filter(
      (like) => like.idUser !== idUser
    )

    authorOfPost.posts[indexOfPost].comments[indexOfComment] = commentDisliked

    await users.findByIdAndUpdate(author, { posts: authorOfPost.posts })

    res.status(200).json({
      ok: true,
      msg: 'Comentario dislikeado con exito',
    })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const deleteNotifications = async (req, res) => {
  const { idOfUserLogged } = req.params

  try {
    const user = await users.findByIdAndUpdate(
      idOfUserLogged,
      { notificationsOff: [] },
      { new: true }
    )

    if (user === null) {
      res.status(404).json({ ok: false, msg: 'No se encontro al usuario' })
      return
    }

    res.status(200).json({
      ok: true,
      msg: 'Notificaciones eliminadas con exito',
    })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const getNotifications = async (req, res) => {
  const { username } = req.params
  try {
    const user = await users.findOne(
      {
        username,
      },
      {
        notifications: 1,
        notificationsOff: 1,
      }
    )

    if (user === null) {
      res.status(404).json({
        ok: false,
        msg: 'No se encontro al usuario',
      })

      return
    }

    if (user.notifications.length !== 0) {
      user.notificationsOff = [...user.notificationsOff, ...user.notifications]
    }

    let notificationsOffFilled = await Promise.all(
      user.notificationsOff.map(async (notification) => {
        const fillUser = await users.findById(notification.idUser, {
          username: 1,
          profileImage: '$profileImage.url',
          _id: 0,
        })
        if (fillUser === null) return
        return {
          ...notification._doc,
          ...fillUser._doc,
        }
      })
    )

    notificationsOffFilled = notificationsOffFilled.filter(
      (notification) => notification !== undefined
    )

    if (user.notifications.length !== 0) {
      await users.findOneAndUpdate(
        { username },
        {
          notificationsOff: user.notificationsOff,
          notifications: [],
        },
        { new: true }
      )
    }

    res.status(200).json({
      ok: true,
      data: notificationsOffFilled,
      msg: 'Notificaciones actualizadas',
    })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}
