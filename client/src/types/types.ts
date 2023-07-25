import { Socket } from 'socket.io-client'

export interface DefaultServerResponse<T> {
  ok: boolean
  data: T
  msg?: string
  token?: string
}

export interface ServerResponseError {
  response: {
    data: {
      ok: boolean
      msg: string
    }
  }
}

export interface ServerResponseWithoutData {
  ok: boolean
  msg: string
}

export interface Follow {
  followId: string
  followImage: string
  followUsername: string
}

export interface PostLikeAction {
  author: string
  idPost: string
  user: string
}

export interface FollowAction {
  userFollowed: string
  whoFollow: string
}

export interface Like {
  idUser: string
}

export interface CommentLikeAction {
  author: string
  idPost: string
  commentId: string
  idUser: string
}

export interface Comment {
  _id?: string
  commentId: number
  commentAuthorId: string
  commentContent: string
  commentLikes: Array<Like>
}

export interface CommentWithUsernameAndImage extends Comment {
  username: string
  picture: string
}

export interface CreateComment {
  commentCreated: Comment
  author: string
  idPost: string
}

export interface Post {
  _id: string
  id: number
  author: string
  authorImage: string
  authorUsername: string
  content: string
  image: {
    url: string
    public_id: string
  }
  date: string
  likes: Array<Like>
  comments: Array<Comment>
}

export interface NewPost {
  author: string
  content: string
  image: Blob | string
}

export interface Notification {
  idUser: string
  message: string
  extraData: string
  imgPost: string
  typeNoti: 'follow' | 'like' | 'comment'
  idPost: string
}

export interface NotificationWithUser {
  message: string
  imgPost?: string
  typeNoti: 'follow' | 'like' | 'comment'
  idPost?: string
  username: string
  profileImage: string
  id: number
}

export interface User {
  _id: string
  username: string
  email: string
  password: string
  profileImage: {
    url: string
    public_id: string
  }
  bigProfileImage: {
    url: string
    public_id: string
  }
  notifications: Array<Notification>
  notificationsOff: Array<Notification>
  posts: Array<Post>
  following: Array<Follow>
  followers: Array<Follow>
}

export interface CreateUser {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface UsernamesAndPictures {
  username: string
  picture: string
}

export interface UserEdited {
  username: string
  profileImage: Blob | string
  bigProfileImage: Blob | string
}

export interface CommentCardProps {
  authorOfPost: string
  idPost: string
  commentId: string | undefined
  author: string
  authorImage: string
  comment: string
  commentLikes: Array<Like>
}

export interface Profile {
  _id: string
  profileImage: string
  bigProfileImage: string
  username: string
  posts: Array<Post>
  followingn: number
  followersn: number
}

export interface LoginUser {
  _id: string
  profileImage: string
  username: string
  notificationsn: number
  following: Array<string>
}

export interface PostCardProps {
  full: boolean
  authorId: string
  post: string
  imageUrl: string
  id: string
  authorUsername: string
  date: string
  authorImage: string
  numberOfComments: number
  likes: Array<Like>
}

export interface NotificationCardProps {
  message: string
  user: string
  userImage: string
  idPost?: string
  imgPost?: string
  typeNoti: 'follow' | 'like' | 'comment'
}

export interface HeaderProps {
  title: string
}

export interface EditProfileProps {
  setEditProfile?: React.Dispatch<React.SetStateAction<boolean>>
}

export interface UsePostCardProps {
  likes: Array<Like>
}

export interface UserContext {
  createUser: (user: CreateUser) => Promise<void>
  getUnicUserByUsername: (username: string) => Promise<User>
  editUser: (username: string, userEdited: UserEdited) => Promise<Profile>
  deleteUser: (username: string) => Promise<void>
  getUnicUserById: (id: string) => Promise<UsernamesAndPictures>
  getProfileByUsername: (
    username: string,
    type: 'normal' | 'small'
  ) => Promise<Profile>
  getProfileFollowersByUsernameAction: (
    username: string
  ) => Promise<Array<UsernamesAndPictures>>
  getProfileFollowingByUsernameAction: (
    username: string
  ) => Promise<Array<UsernamesAndPictures>>
  getNotificationsAction: (
    username: string
  ) => Promise<Array<NotificationWithUser>>

  getLoginUser: (email: string, password: string) => Promise<void>
  isLogged: boolean
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  dataOfUserLogged: LoginUser
  setDataOfUserLogged: React.Dispatch<React.SetStateAction<LoginUser>>

  getOnlyPosts: (uId: string) => Promise<Array<Post>>
  createNewPost: (username: string, newPost: NewPost) => Promise<Post>
  deletePost: (username: string, idOfPost: string) => Promise<void>
  FullScreenPost: boolean
  setFullScreenPost: React.Dispatch<React.SetStateAction<boolean>>

  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
  profilePosts: Array<Post>
  setProfilePosts: React.Dispatch<React.SetStateAction<Array<Post>>>
  newUsernameInPosts: (
    username: string,
    newPosts: Array<Post>
  ) => Promise<Array<Post>>

  followUserAction: (userFollowed: FollowAction) => Promise<void>
  unFollowUserAction: (userUnFollowed: FollowAction) => Promise<void>
  likePostAction: (postLiked: PostLikeAction) => Promise<void>
  disLikePostAction: (postDisLiked: PostLikeAction) => Promise<void>
  commentPostAction: (comment: CreateComment) => Promise<Array<Comment>>
  deleteCommentAction: (
    author: string,
    idPost: string,
    commentId: string
  ) => Promise<void>
  likeCommentAction: (commentLiked: CommentLikeAction) => Promise<void>
  disLikeCommentAction: (commentDisLiked: CommentLikeAction) => Promise<void>

  followingScreen: boolean
  setFollowingScreen: React.Dispatch<React.SetStateAction<boolean>>
  followersScreen: boolean
  setFollowersScreen: React.Dispatch<React.SetStateAction<boolean>>
  usersFollowing: Array<string>
  setUsersFollowing: React.Dispatch<React.SetStateAction<Array<string>>>

  isLoadingMainPage: boolean
  setIsLoadingMainPage: React.Dispatch<React.SetStateAction<boolean>>
  deleteNotificationsAction: (idOfUser: string) => Promise<void>

  searchingUsers: (username: string) => Promise<Array<UsernamesAndPictures>>

  socket: Socket | undefined
}
