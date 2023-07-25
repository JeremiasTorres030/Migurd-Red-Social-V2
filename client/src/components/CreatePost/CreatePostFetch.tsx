import { useUsers } from '../../context/users/usersProvider'
import { toast } from 'react-hot-toast'
import { NewPost, UserContext } from '../../types/types'
export const useCreatePost = () => {
  const {
    setProfilePosts,
    createNewPost,
    getOnlyPosts,
    dataOfUserLogged,
    profilePosts,
  } = useUsers() as UserContext

  const createPostFetch = async (values: NewPost) => {
    if (profilePosts.length >= 5) {
      toast.remove('limitPosts')
      toast.error('Límite de posts alcanzado.', { id: 'limitPosts' })
    } else {
      try {
        await createNewPost(dataOfUserLogged.username, values)
        const res = await getOnlyPosts(dataOfUserLogged._id)
        const ordenado = res.sort((a, b) => {
          return b.id - a.id
        })
        setProfilePosts(ordenado)
        toast.remove('createToast')
        toast.success('Post Creado con éxito.', { id: 'createToast' })
      } catch (error) {
        toast.error('Error al crear el post')
      }
    }
  }
  return { createPostFetch }
}
