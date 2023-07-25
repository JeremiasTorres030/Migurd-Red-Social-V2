import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../../../context/users/usersProvider'
import { CreateUser, UserContext } from '../../../types/types'
export const useSignUp = () => {
  const { createUser, setLogin, getLoginUser, setIsLoadingMainPage } =
    useUsers() as UserContext
  const [error, setError] = useState<string>('')

  const navigate = useNavigate()

  const signUpFetch = async (values: CreateUser) => {
    try {
      setError('')
      await createUser(values)
      await getLoginUser(values.email, values.password)
      setIsLoadingMainPage(false)
      setLogin(true)
      navigate('/home/posts')
    } catch (error) {
      let message = ''
      if (error instanceof Error) message = error.message
      setError(message)
    }
  }
  return { signUpFetch, error }
}
