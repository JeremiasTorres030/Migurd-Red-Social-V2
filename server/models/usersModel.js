import mongoose from 'mongoose'

const like = mongoose.Schema({
  idUser: { type: String, require: true },
})

const comment = mongoose.Schema({
  commentId: { type: Number, require: true },
  commentAuthorId: { type: String, require: true },
  commentContent: { type: String, trim: true },
  commentLikes: [like],
})

const noty = mongoose.Schema({
  idUser: { type: String, require: true },
  message: { type: String, require: true },
  extraData: { type: String, require: true },
  imgPost: { type: String },
  typeNoti: { type: String, require: true },
  idPost: { type: String, require: true },
})

const postSchema = mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },

  author: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
    trim: true,
  },
  image: {
    url: String,
    public_id: String,
  },

  date: {
    type: String,
  },

  likes: [like],

  comments: [comment],
})

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },

  profileImage: {
    url: String,
    public_id: String,
  },

  bigProfileImage: {
    url: String,
    public_id: String,
  },

  notifications: [noty],

  notificationsOff: [noty],

  posts: [postSchema],

  following: [
    {
      type: String,
    },
  ],

  followers: [
    {
      type: String,
    },
  ],
})

export const users = mongoose.model('user', userSchema)
