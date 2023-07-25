import cloudinary from 'cloudinary'
import { API_KEY, API_SECRET, CLOUD_NAME } from '../env.config.js'
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
})

export const uploadPostImage = async (filePath) => {
  return await cloudinary.v2.uploader.upload(filePath, {
    folder: 'Migurd/PostPicture',
  })
}

export const uploadProfilePicture = async (filePath) => {
  return await cloudinary.v2.uploader.upload(filePath, {
    folder: 'Migurd/ProfilePictures',
  })
}

export const uploadProfileBigPicture = async (filePath) => {
  return await cloudinary.v2.uploader.upload(filePath, {
    folder: 'Migurd/ProfileBigPicture',
  })
}

export const deletePostImage = async (filePath) => {
  return await cloudinary.v2.uploader.destroy(filePath)
}
