import axios from 'axios'
import {
  DefaultServerResponse,
  NewPost,
  Post,
  ServerResponseError,
} from '../types/types'

/* Create/Delete/Update Username/Get  Post */
export const createNewPostRequest = async (
  username: string,
  newPost: NewPost
): Promise<Post> => {
  const form = new FormData()

  for (const key in newPost) {
    form.append(key, newPost[key as keyof NewPost])
  }

  try {
    const response = await axios.post<DefaultServerResponse<Post>>(
      `${import.meta.env.VITE_API_URL}/posts/${username}`,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
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

export const deleteUnicPostByIdRequest = async (
  username: string,
  idOfPost: string
): Promise<void> => {
  try {
    await axios.delete<DefaultServerResponse<void>>(
      `${import.meta.env.VITE_API_URL}/posts/${username}/${idOfPost}`,
      {
        headers: {
          token: localStorage.getItem('migurdLoginSesion'),
        },
      }
    )
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const newUsernameInPostsRequest = async (
  username: string,
  newPosts: Array<Post>
): Promise<Array<Post>> => {
  try {
    const response = await axios.put<DefaultServerResponse<Array<Post>>>(
      `${import.meta.env.VITE_API_URL}/posts/newusername/${username}`,
      { posts: newPosts },
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

export const getOnlyPostsRequest = async (
  uId: string
): Promise<Array<Post>> => {
  try {
    const response = await axios.get<DefaultServerResponse<Array<Post>>>(
      `${import.meta.env.VITE_API_URL}/posts/${uId}`
    )
    return response.data.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}
