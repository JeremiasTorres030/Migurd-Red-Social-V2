import { useLocation, useNavigate } from 'react-router-dom'
import { useUsers } from '../../context/users/usersProvider'
import { UserContext } from '../../types/types'
import { toast } from 'react-hot-toast'

const useNotificationCard = () => {
  const { getOnlyPosts, setProfilePosts, setFullScreenPost, dataOfUserLogged } =
    useUsers() as UserContext

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onClickCard = async (idPost: string) => {
    const response = await getOnlyPosts(dataOfUserLogged._id)
    if (response.find((post) => post._id === idPost) === undefined) {
      toast.dismiss('errorPost')
      toast.error('El post ya no existe', { id: 'errorPost' })
      return
    }
    setProfilePosts(response)
    setFullScreenPost(true)
    if (pathname.includes('posts') === true) {
      navigate(`/home/posts/${dataOfUserLogged._id}/${idPost}`)
    } else {
      navigate(`/home/${dataOfUserLogged._id}/${idPost}`)
    }
  }

  return { onClickCard }
}

export default useNotificationCard
