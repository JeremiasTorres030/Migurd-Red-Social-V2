import axios from 'axios'
import {
  Comment,
  CommentLikeAction,
  CreateComment,
  DefaultServerResponse,
  FollowAction,
  NotificationWithUser,
  PostLikeAction,
  ServerResponseError,
  ServerResponseWithoutData,
} from '../types/types'

/* Post like/unlike action */
export const likePostActionRequest = async (
  postLiked: PostLikeAction
): Promise<ServerResponseWithoutData> => {
  try {
    const response = await axios.put<ServerResponseWithoutData>(
      `${import.meta.env.VITE_API_URL}/social/like/`,
      postLiked,
      {
        headers: {
          token: localStorage.getItem('migurdLoginSesion'),
        },
      }
    )
    return response.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const disLikePostActionRequest = async (
  postDisLiked: PostLikeAction
): Promise<ServerResponseWithoutData> => {
  try {
    const response = await axios.put<ServerResponseWithoutData>(
      `${import.meta.env.VITE_API_URL}/social/dislike/`,
      postDisLiked,
      {
        headers: {
          token: localStorage.getItem('migurdLoginSesion'),
        },
      }
    )
    return response.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

/*Create Comment/Delete Comment  */

export const commentPostActionRequest = async (
  comment: CreateComment
): Promise<Array<Comment>> => {
  try {
    const response = await axios.post<DefaultServerResponse<Array<Comment>>>(
      `${import.meta.env.VITE_API_URL}/social/comment`,
      comment,
      {
        headers: {
          token: localStorage.getItem('migurdLoginSesion'),
        },
      }
    )

    return response.data.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const deleteCommentActionRequest = async (
  author: string,
  idPost: string,
  commentId: string
): Promise<ServerResponseWithoutData> => {
  try {
    const response = await axios.delete<ServerResponseWithoutData>(
      `${
        import.meta.env.VITE_API_URL
      }/social/comment/${author}/${idPost}/${commentId}`,
      {
        headers: {
          token: localStorage.getItem('migurdLoginSesion'),
        },
      }
    )
    return response.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

/*like/unlike Comment Action */

export const likeCommentActionRequest = async (
  commentLiked: CommentLikeAction
): Promise<ServerResponseWithoutData> => {
  try {
    const response = await axios.put<ServerResponseWithoutData>(
      `${import.meta.env.VITE_API_URL}/social/commentlike/like`,
      commentLiked,
      {
        headers: {
          token: localStorage.getItem('migurdLoginSesion'),
        },
      }
    )
    return response.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const disLikeCommentActionRequest = async (
  commentDisLiked: CommentLikeAction
): Promise<ServerResponseWithoutData> => {
  try {
    const response = await axios.put<ServerResponseWithoutData>(
      `${import.meta.env.VITE_API_URL}/social/commentlike/unlike`,
      commentDisLiked,
      {
        headers: {
          token: localStorage.getItem('migurdLoginSesion'),
        },
      }
    )
    return response.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const deleteNotificationsActionRequest = async (
  idOfUser: string
): Promise<ServerResponseWithoutData> => {
  try {
    const response = await axios.delete<ServerResponseWithoutData>(
      `${import.meta.env.VITE_API_URL}/social/notifications/${idOfUser}`,
      {
        headers: {
          token: localStorage.getItem('migurdLoginSesion'),
        },
      }
    )
    return response.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const getNotificationsRequest = async (
  username: string
): Promise<Array<NotificationWithUser>> => {
  try {
    const response = await axios.put<
      DefaultServerResponse<Array<NotificationWithUser>>
    >(
      `${import.meta.env.VITE_API_URL}/social/notifications/${username}`,
      null,
      {
        headers: {
          token: localStorage.getItem('migurdLoginSesion'),
        },
      }
    )
    return response.data.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

/* Follow/Unfollow action */

export const followUserActionRequest = async (
  follow: FollowAction
): Promise<ServerResponseWithoutData> => {
  try {
    const response = await axios.put<ServerResponseWithoutData>(
      `${import.meta.env.VITE_API_URL}/social/follow`,
      follow,
      {
        headers: {
          token: localStorage.getItem('migurdLoginSesion'),
        },
      }
    )
    return response.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const unFollowUserActionRequest = async (
  userUnFollowed: FollowAction
): Promise<ServerResponseWithoutData> => {
  try {
    const response = await axios.put<ServerResponseWithoutData>(
      `${import.meta.env.VITE_API_URL}/social/unfollow`,
      userUnFollowed,
      {
        headers: {
          token: localStorage.getItem('migurdLoginSesion'),
        },
      }
    )
    return response.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}
