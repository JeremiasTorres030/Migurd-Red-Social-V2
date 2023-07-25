import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../../../context/users/usersProvider'
import { UserContext } from '../../../types/types'

export const useLogin = () => {
  const { setLogin, getLoginUser, setIsLoadingMainPage } =
    useUsers() as UserContext
  const navigate = useNavigate()

  const loginFetch = async (values: { email: string; password: string }) => {
    try {
      await getLoginUser(values.email, values.password)
      setIsLoadingMainPage(false)
      setLogin(true)
      navigate('/home/posts')
    } catch (error) {
      if (error instanceof Error) {
        toast.remove('ErrorLogin')
        toast.error(error.message, {
          id: 'ErrorLogin',
        })
      }
    }
  }

  return { loginFetch }
}
