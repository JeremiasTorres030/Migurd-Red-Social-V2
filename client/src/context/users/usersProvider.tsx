import { useEffect, createContext, useContext, useState } from 'react'
import {
  searchUsersRequest,
  createUserRequest,
  getUnicUserByUsernameRequest,
  getLoginUserRequest,
  editUserRequest,
  deleteUserRequest,
  getUnicUserByIdRequest,
  getLoginTokenUserRequest,
  getProfileByUsernameRequest,
  getProfileFollowersByUsernameRequest,
  getProfileFollowingByUsernameRequest,
} from '../../api/users'
import {
  createNewPostRequest,
  deleteUnicPostByIdRequest,
  getOnlyPostsRequest,
  newUsernameInPostsRequest,
} from '../../api/posts'
import {
  commentPostActionRequest,
  deleteCommentActionRequest,
  deleteNotificationsActionRequest,
  disLikeCommentActionRequest,
  disLikePostActionRequest,
  followUserActionRequest,
  likeCommentActionRequest,
  likePostActionRequest,
  getNotificationsRequest,
  unFollowUserActionRequest,
} from '../../api/social'

import { Outlet, useNavigate } from 'react-router-dom'
import {
  Comment,
  CommentLikeAction,
  CreateComment,
  CreateUser,
  FollowAction,
  LoginUser,
  NewPost,
  NotificationWithUser,
  Post,
  PostLikeAction,
  Profile,
  User,
  UserContext,
  UserEdited,
  UsernamesAndPictures,
} from '../../types/types'

import { io, Socket } from 'socket.io-client'

const contextUsers = createContext<UserContext | null>(null)

// eslint-disable-next-line react-refresh/only-export-components
export const useUsers = (): UserContext | null => {
  const context = useContext(contextUsers) as UserContext
  return context
}

const UsersProvider = () => {
  const [isLogged, setLogin] = useState<boolean>(false)
  const [FullScreenPost, setFullScreenPost] = useState<boolean>(false)
  const [followingScreen, setFollowingScreen] = useState<boolean>(false)
  const [followersScreen, setFollowersScreen] = useState<boolean>(false)
  const [isLoadingMainPage, setIsLoadingMainPage] = useState<boolean>(true)
  const [usersFollowing, setUsersFollowing] = useState<Array<string>>([])
  const [dataOfUserLogged, setDataOfUserLogged] = useState<LoginUser>({
    _id: '',
    following: [],
    notificationsn: 0,
    profileImage: '',
    username: '',
  })
  const [profile, setProfile] = useState<Profile>({
    _id: '',
    bigProfileImage: '',
    followersn: 0,
    followingn: 0,
    posts: [],
    profileImage: '',
    username: '',
  })
  const [profilePosts, setProfilePosts] = useState<Array<Post>>([])
  const [socket, setSocket] = useState<Socket>()

  const navigate = useNavigate()

  useEffect(() => {
    const socke = io(import.meta.env.VITE_SOCKET_URL)
    socke?.on('notification', () => {
      setDataOfUserLogged((prevValue) => {
        prevValue.notificationsn += 1
        return { ...prevValue }
      })
    })
    setSocket(socke)
    asyncLocalSesion(socke)

    return () => {
      socke.disconnect()
    }

    // eslint-disable-next-line
  }, [])

  const asyncLocalSesion = async (connect: Socket) => {
    const checkSesion = localStorage.getItem('migurdLoginSesion')
    if (checkSesion) {
      const response = await getLoginTokenUserRequest(checkSesion)

      connect.emit('login', response._id)
      if (response) {
        setDataOfUserLogged(response)
        setUsersFollowing(response.following)
        setIsLoadingMainPage(false)
        setLogin(true)
        navigate('/home/posts')
      }
    }
  }

  const searchingUsers = async (
    username: string
  ): Promise<Array<UsernamesAndPictures>> => {
    const data = await searchUsersRequest(username)
    return data
  }

  const createUser = async (user: CreateUser): Promise<void> => {
    await createUserRequest(user)
  }

  const editUser = async (
    username: string,
    userEdited: UserEdited
  ): Promise<Profile> => {
    const data = await editUserRequest(username, userEdited)
    return data
  }

  const deleteUser = async (username: string): Promise<void> => {
    await deleteUserRequest(username)
  }

  const getUnicUserByUsername = async (username: string): Promise<User> => {
    const data = await getUnicUserByUsernameRequest(username)
    return data
  }

  const getUnicUserById = async (id: string): Promise<UsernamesAndPictures> => {
    const data = await getUnicUserByIdRequest(id)
    return data
  }

  const getProfileByUsername = async (
    username: string,
    type: 'normal' | 'small'
  ): Promise<Profile> => {
    const data = await getProfileByUsernameRequest(username, type)
    return data
  }

  const getLoginUser = async (
    email: string,
    password: string
  ): Promise<void> => {
    const data = await getLoginUserRequest(email, password)
    setUsersFollowing(data.following)
    setDataOfUserLogged(data)

    socket?.emit('login', data._id)
  }

  const getOnlyPosts = async (uId: string): Promise<Array<Post>> => {
    const data = await getOnlyPostsRequest(uId)
    return data
  }

  const createNewPost = async (
    username: string,
    newPost: NewPost
  ): Promise<Post> => {
    const data = await createNewPostRequest(username, newPost)
    return data
  }

  const deletePost = async (
    username: string,
    idOfPost: string
  ): Promise<void> => {
    await deleteUnicPostByIdRequest(username, idOfPost)
  }

  const newUsernameInPosts = async (
    username: string,
    newPosts: Array<Post>
  ): Promise<Array<Post>> => {
    const data = await newUsernameInPostsRequest(username, newPosts)
    return data
  }

  const followUserAction = async (follow: FollowAction): Promise<void> => {
    await followUserActionRequest(follow)
    socket?.emit('notification', follow.userFollowed)
  }

  const unFollowUserAction = async (
    userUnFollowed: FollowAction
  ): Promise<void> => {
    await unFollowUserActionRequest(userUnFollowed)
  }

  const likePostAction = async (postLiked: PostLikeAction): Promise<void> => {
    await likePostActionRequest(postLiked)
    socket?.emit('notification', postLiked.author)
  }

  const disLikePostAction = async (
    postDisLiked: PostLikeAction
  ): Promise<void> => {
    await disLikePostActionRequest(postDisLiked)
  }

  const commentPostAction = async (
    comment: CreateComment
  ): Promise<Array<Comment>> => {
    const data = await commentPostActionRequest(comment)
    socket?.emit('notification', comment.author)

    return data
  }

  const deleteCommentAction = async (
    author: string,
    idPost: string,
    commentId: string
  ): Promise<void> => {
    await deleteCommentActionRequest(author, idPost, commentId)
  }

  const likeCommentAction = async (
    commentLiked: CommentLikeAction
  ): Promise<void> => {
    await likeCommentActionRequest(commentLiked)
  }

  const disLikeCommentAction = async (
    commentDisLiked: CommentLikeAction
  ): Promise<void> => {
    await disLikeCommentActionRequest(commentDisLiked)
  }

  const deleteNotificationsAction = async (idOfUser: string): Promise<void> => {
    await deleteNotificationsActionRequest(idOfUser)
  }

  const getNotificationsAction = async (
    username: string
  ): Promise<Array<NotificationWithUser>> => {
    const data = await getNotificationsRequest(username)
    return data
  }

  const getProfileFollowersByUsernameAction = async (
    username: string
  ): Promise<Array<UsernamesAndPictures>> => {
    const data = await getProfileFollowersByUsernameRequest(username)
    return data
  }

  const getProfileFollowingByUsernameAction = async (
    username: string
  ): Promise<Array<UsernamesAndPictures>> => {
    const data = await getProfileFollowingByUsernameRequest(username)
    return data
  }

  return (
    <contextUsers.Provider
      value={{
        createUser,
        getUnicUserByUsername,
        editUser,
        deleteUser,
        getUnicUserById,
        getProfileByUsername,
        getNotificationsAction,

        getLoginUser,
        isLogged,
        setLogin,
        dataOfUserLogged,
        setDataOfUserLogged,

        getOnlyPosts,
        createNewPost,
        deletePost,
        FullScreenPost,
        setFullScreenPost,

        profile,
        setProfile,
        profilePosts,
        setProfilePosts,
        newUsernameInPosts,

        followUserAction,
        unFollowUserAction,
        likePostAction,
        disLikePostAction,
        commentPostAction,
        deleteCommentAction,
        likeCommentAction,
        disLikeCommentAction,

        followingScreen,
        setFollowingScreen,
        followersScreen,
        setFollowersScreen,
        usersFollowing,
        setUsersFollowing,

        isLoadingMainPage,
        setIsLoadingMainPage,
        deleteNotificationsAction,

        searchingUsers,
        getProfileFollowersByUsernameAction,
        getProfileFollowingByUsernameAction,

        socket,
      }}
    >
      <Outlet />
    </contextUsers.Provider>
  )
}

export default UsersProvider
