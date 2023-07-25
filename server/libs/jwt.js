import jwt from 'jsonwebtoken'
import { CONTRASENA_HASH } from '../env.config.js'

export const createToken = (userData) => {
  try {
    const token = jwt.sign({ userData }, CONTRASENA_HASH)
    return token
  } catch (error) {
    throw new Error(error.message)
  }
}

export const verifyToken = (req, res, next) => {
  const { token } = req.headers

  if (token === null || undefined) return res.sendStatus(401)

  try {
    const { userData } = jwt.verify(token, CONTRASENA_HASH)
    if (userData) {
      const [email, password] = userData.split('|')
      const user = { email, password }
      req.headers['user'] = user
    }
    next()
  } catch (error) {
    console.error(error.message)
    res.status(403).json({
      ok: false,
      msg: 'Error en verificar el token',
    })
  }
}
