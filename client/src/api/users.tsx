import axios from 'axios'
import {
  CreateUser,
  DefaultServerResponse,
  LoginUser,
  Profile,
  ServerResponseError,
  ServerResponseWithoutData,
  User,
  UserEdited,
  UsernamesAndPictures,
} from '../types/types'

/* SearchUsers /GetUnic /Delete /Edit User */

export const searchUsersRequest = async (
  username: string
): Promise<Array<UsernamesAndPictures>> => {
  try {
    const response = await axios.get<
      DefaultServerResponse<Array<UsernamesAndPictures>>
    >(`${import.meta.env.VITE_API_URL}/search/${username}`)
    return response.data.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const getUnicUserByUsernameRequest = async (
  username: string
): Promise<User> => {
  try {
    const response = await axios.get<DefaultServerResponse<User>>(
      `${import.meta.env.VITE_API_URL}/users/${username}`
    )

    return response.data.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const getUnicUserByIdRequest = async (
  id: string
): Promise<UsernamesAndPictures> => {
  try {
    const response = await axios.get<
      DefaultServerResponse<UsernamesAndPictures>
    >(`${import.meta.env.VITE_API_URL}/user/${id}`)
    return response.data.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const getProfileByUsernameRequest = async (
  username: string,
  type: 'normal' | 'small'
): Promise<Profile> => {
  try {
    const response = await axios.get<DefaultServerResponse<Profile>>(
      `${import.meta.env.VITE_API_URL}/user/profile/${type}/${username}`,
      {
        headers: { token: localStorage.getItem('migurdLoginSesion') },
      }
    )
    return response.data.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const createUserRequest = async (user: CreateUser): Promise<void> => {
  try {
    const response = await axios.post<DefaultServerResponse<string>>(
      `${import.meta.env.VITE_API_URL}/users`,
      user
    )
    localStorage.setItem('migurdLoginSesion', response.data.data)
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const editUserRequest = async (
  username: string,
  userEdited: UserEdited
): Promise<Profile> => {
  const form = new FormData()
  for (const key in userEdited) {
    form.append(key, userEdited[key as keyof UserEdited])
  }
  try {
    const response = await axios.put<DefaultServerResponse<Profile>>(
      `${import.meta.env.VITE_API_URL}/users/${username}`,
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

export const deleteUserRequest = async (
  username: string
): Promise<ServerResponseWithoutData> => {
  try {
    const response = await axios.delete<ServerResponseWithoutData>(
      `${import.meta.env.VITE_API_URL}/users/${username}`,
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

/* Auth Login */

export const getLoginUserRequest = async (
  email: string,
  password: string
): Promise<LoginUser> => {
  try {
    const response = await axios.get<DefaultServerResponse<LoginUser>>(
      `${import.meta.env.VITE_API_URL}/users/login/${email}/${password}`
    )
    if (response.data.token) {
      localStorage.setItem('migurdLoginSesion', response.data.token)
    }
    return response.data.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const getLoginTokenUserRequest = async (
  token: string
): Promise<LoginUser> => {
  try {
    const response = await axios.get<DefaultServerResponse<LoginUser>>(
      `${import.meta.env.VITE_API_URL}/users/login/${token}`,
      {
        headers: {
          token,
        },
      }
    )
    return response.data.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const getProfileFollowersByUsernameRequest = async (
  username: string
): Promise<Array<UsernamesAndPictures>> => {
  try {
    const response = await axios.get<
      DefaultServerResponse<Array<UsernamesAndPictures>>
    >(`${import.meta.env.VITE_API_URL}/user/profile/followers/${username}`, {
      headers: {
        token: localStorage.getItem('migurdLoginSesion'),
      },
    })
    return response.data.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}

export const getProfileFollowingByUsernameRequest = async (
  username: string
): Promise<Array<UsernamesAndPictures>> => {
  try {
    const response = await axios.get<
      DefaultServerResponse<Array<UsernamesAndPictures>>
    >(`${import.meta.env.VITE_API_URL}/user/profile/following/${username}`, {
      headers: {
        token: localStorage.getItem('migurdLoginSesion'),
      },
    })
    return response.data.data
  } catch (error) {
    const errorCustom = error as ServerResponseError
    throw new Error(errorCustom.response.data.msg)
  }
}
