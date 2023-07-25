import { users } from '../models/usersModel.js'
import { CONTRASENA_HASH } from '../env.config.js'
import CryptoJS from 'crypto-js'
import {
  uploadProfilePicture,
  uploadProfileBigPicture,
} from '../libs/cloudinary.js'
import fs from 'fs-extra'
import { createToken } from '../libs/jwt.js'

export const searchUsers = async (req, res) => {
  const { username } = req.params
  try {
    const result = await users.find(
      {
        username: {
          $regex: `${username}.*`,
          $options: 'i',
        },
      },
      {
        username: 1,
        picture: '$profileImage.url',
        _id: 0,
      }
    )
    res.status(200).json({
      ok: true,
      data: result,
    })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const createUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const usernameVerification = await users.findOne({ username }, { _id: 1 })
    const emailVerification = await users.findOne({ email }, { _id: 1 })

    if (usernameVerification || emailVerification) {
      res.status(409).json({
        ok: false,
        msg: 'El nombre de usuario o correo ya estan en uso.',
      })

      return
    }

    const hashPassword = CryptoJS.HmacMD5(password, CONTRASENA_HASH).toString()

    const user = {
      username: username,
      email: email,
      password: hashPassword,
      profileImage: {
        url: 'https://res.cloudinary.com/drifqbdtu/image/upload/v1657229956/Migurd/ProfilePictures/DefaultProfilePicture_xg8sgf.jpg',
        public_id: 'Migurd/ProfilePictures/DefaultProfilePicture_xg8sgf',
      },
      bigProfileImage: {
        url: 'https://res.cloudinary.com/drifqbdtu/image/upload/v1657043337/Migurd/ProfileBigPicture/Portada_oz0duu.jpg',
        public_id: 'Migurd/ProfileBigPicture/Portada_oz0duu',
      },
    }
    await users.create(user)

    const token = createToken(`${email}${hashPassword}`)

    res.status(200).json({
      ok: true,
      data: token,
      msg: 'usuario creado con extio',
    })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor.' })
  }
}

export const deleteUser = async (req, res) => {
  const { username } = req.params
  try {
    await users.findOneAndDelete({ username })
    res.status(200).json({ ok: true, msg: 'usuario eliminado con exito' })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'ha ocurrido un error en le servidor' })
  }
}

export const editUser = async (req, res) => {
  const { username } = req.params
  try {
    if (
      req.body.username === username &&
      req.body.bigProfileImage === null &&
      req.body.profileImage === null
    ) {
      res.status(200).json({ ok: true, msg: 'El usuario no ha cambiado' })
      return
    }
    const editedUser = {}
    if (req.body.bigProfileImage === undefined) {
      const responseBigProfile = await uploadProfileBigPicture(
        req.files.bigProfileImage.tempFilePath
      )
      fs.remove(req.files.bigProfileImage.tempFilePath)
      editedUser['bigProfileImage'] = {
        url: responseBigProfile.secure_url,
        public_id: responseBigProfile.public_id,
      }
    }
    if (req.body.profileImage === undefined) {
      const responseProfile = await uploadProfilePicture(
        req.files.profileImage.tempFilePath
      )
      fs.remove(req.files.profileImage.tempFilePath)
      editedUser['profileImage'] = {
        url: responseProfile.secure_url,
        public_id: responseProfile.public_id,
      }
    }

    if (username !== req.body.username) {
      editedUser['username'] = req.body.username
    }

    const userEdited = await users.findOneAndUpdate({ username }, editedUser, {
      new: true,
      projection: {
        username: 1,
        profileImage: '$profileImage.url',
        bigProfileImage: '$bigProfileImage.url',
      },
    })

    if (userEdited === null) {
      res.status(404).json({ ok: false, msg: 'No se encontro al usuario' })
      return
    }

    res.status(200).json({
      ok: true,
      data: userEdited,
      msg: 'Usuario editado con exito',
    })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un fallo en el servidor' })
  }
}

export const getUnicUserByUsername = async (req, res) => {
  const { username } = req.params
  try {
    const unicUser = await users.findOne({ username })

    if (unicUser === null) {
      res.status(404).json({ ok: false, msg: 'No se encontro al usuario' })
      return
    }
    res.status(200).json({ ok: true, data: unicUser })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const getUnicUserById = async (req, res) => {
  const { id } = req.params
  try {
    const unicUser = await users.findById(id, {
      picture: '$profileImage.url',
      username: 1,
    })
    if (unicUser === null) {
      res.status(404).json({ ok: false, msg: 'No se encontro al usuario' })
      return
    }
    res.status(200).json({ ok: true, data: unicUser })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const getLoginUser = async (req, res) => {
  const { email, password } = req.params
  const hashPassword = CryptoJS.HmacMD5(password, CONTRASENA_HASH).toString()

  try {
    const loggedUser = await users.findOne(
      {
        email,
        password: hashPassword,
      },
      {
        username: 1,
        profileImage: '$profileImage.url',
        notificationsn: { $size: '$notifications' },
        following: 1,
      }
    )

    if (loggedUser === null) {
      res.status(404).json({ msg: 'Los datos son incorrectos.' })
      return
    }

    const token = createToken(`${email}|${hashPassword}`)

    res.status(200).json({ token, data: loggedUser, ok: true })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor.' })
  }
}

export const getLoginTokenUser = async (req, res) => {
  const { email, password } = req.headers.user

  try {
    const loggedUser = await users.findOne(
      {
        email,
        password,
      },
      {
        username: 1,
        profileImage: '$profileImage.url',
        notificationsn: { $size: '$notifications' },
        following: 1,
      }
    )
    if (loggedUser === null) {
      res.status(404).json({ msg: 'Los datos son incorrectos.' })
      return
    }

    res.status(200).json({ data: loggedUser, ok: true })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor.' })
  }
}
export const getProfileByUsername = async (req, res) => {
  const { username, type } = req.params

  try {
    let filterObject = {}

    if (type === 'normal') {
      filterObject = {
        profileImage: '$profileImage.url',
        bigProfileImage: '$bigProfileImage.url',
        username: 1,
        posts: 1,
        followingn: { $size: '$following' },
        followersn: { $size: '$followers' },
      }
    } else {
      filterObject = {
        profileImage: '$profileImage.url',
        username: 1,
      }
    }

    const unicUser = await users.findOne({ username }, filterObject)
    if (unicUser === null) {
      res.status(404).json({ ok: false, msg: 'No se encontro al usuario' })
      return
    }
    res.status(200).json({ ok: true, data: unicUser })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const getProfileFollowersByUsername = async (req, res) => {
  const { username } = req.params
  try {
    const user = await users.findOne({ username }, { followers: 1, _id: 0 })
    if (user === null) {
      res.status(404).json({ ok: false, msg: 'No se encontro al usuario' })
      return
    }

    let followersFullFilled = await Promise.all(
      user.followers.map(async (userFollow) => {
        const userData = await users.findById(userFollow, {
          _id: 0,
          username: 1,
          picture: '$profileImage.url',
        })
        if (userData === null) return
        return userData
      })
    )

    followersFullFilled = followersFullFilled.filter((u) => u !== undefined)

    res.status(200).json({ ok: true, data: followersFullFilled })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}

export const getProfileFollowingByUsername = async (req, res) => {
  const { username } = req.params
  try {
    const user = await users.findOne({ username }, { following: 1, _id: 0 })
    if (user === null) {
      res.status(404).json({ ok: false, msg: 'No se encontro al usuario' })
      return
    }

    let followingFullFilled = await Promise.all(
      user.following.map(async (userFollow) => {
        const userData = await users.findById(userFollow, {
          _id: 0,
          username: 1,
          picture: '$profileImage.url',
        })
        if (userData === null) return
        return userData
      })
    )

    followingFullFilled = followingFullFilled.filter((u) => u !== undefined)

    res.status(200).json({ ok: true, data: followingFullFilled })
  } catch (error) {
    console.error(error.message)
    res
      .status(500)
      .json({ ok: false, msg: 'Ha ocurrido un error en el servidor' })
  }
}
