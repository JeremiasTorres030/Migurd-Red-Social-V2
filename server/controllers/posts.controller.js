import { users } from '../models/usersModel.js'
import { uploadPostImage, deletePostImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const getOnlyPosts = async (req, res) => {
  const { uId } = req.params

  try {
    const userPosts = await users.findById(uId, {
      _id: 0,
      posts: 1,
      username: 1,
      profileImage: '$profileImage.url',
    })

    if (userPosts === null) {
      res.status(404).json({ ok: false, msg: 'No se encontro al usuario' })
      return
    }

    const postsFilled = userPosts.posts.map((post) => {
      return {
        ...post._doc,
        authorUsername: userPosts.username,
        authorImage: userPosts.profileImage,
      }
    })
    res.status(200).json({ data: postsFilled, ok: true })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un fallo en el servidor' })
  }
}

export const createPost = async (req, res) => {
  const { author, content } = req.body
  const { username } = req.params
  let image

  const userPosts = await users.findOne({ username })
  if (userPosts === null) {
    res.status(404).json({ ok: false, msg: 'No se encontro al usuario' })
    return
  }

  if (req.files?.image) {
    const result = await uploadPostImage(req.files.image.tempFilePath)
    await fs.remove(req.files.image.tempFilePath)
    image = {
      url: result.secure_url,
      public_id: result.public_id,
    }
  }

  const newDate = new Date()

  const day = newDate.getDate()
  const month = newDate.getMonth()
  const year = newDate.getFullYear()
  const hour = newDate.getHours()
  const minutes = newDate.getMinutes()

  const date = `${hour}:${minutes} ${day}/${month}/${year}`

  const newPost = {
    id: userPosts.posts.length,
    author,
    content,
    image,
    date,
  }

  userPosts.posts.push(newPost)

  const ordenado = userPosts.posts.sort((a, b) => {
    return b.id - a.id
  })
  try {
    await users.findOneAndUpdate(
      { username },
      { posts: ordenado },
      {
        new: true,
      }
    )
    res.status(200).json({ ok: true, message: 'Post Creado' })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const deleteUnicPostById = async (req, res) => {
  const { username, idpost } = req.params
  const user = await users.findOne({ username })

  if (user === null) {
    res.status(404).json({ ok: false, msg: 'No se encontro al usuario' })
    return
  }

  const eliminarimagen = user.posts.filter((posts) => {
    return posts._id.toString() === idpost
  })

  if (eliminarimagen[0]?.image?.public_id) {
    await deletePostImage(eliminarimagen[0].image.public_id)
  }

  const eliminado = user.posts.filter((post) => {
    return post._id.toString() !== idpost
  })

  user.posts = eliminado

  try {
    await users.findOneAndUpdate({ username }, user, {
      new: true,
    })
    res.status(200).json({ ok: true, msg: 'Post eliminado con exito.' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
      ok: false,
      msg: 'Ha ocurrido un error en el servidor',
    })
  }
}

export const newUsernameInPosts = async (req, res) => {
  const { username } = req.params

  try {
    const user = await users.findOneAndUpdate({ username }, req.body, {
      new: true,
    })

    if (user === null) {
      res.status(404).json({
        ok: false,
        msg: 'No se encontro al usuario',
      })
      return
    }
    res.status(200).json({ ok: true, data: user.posts })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}
