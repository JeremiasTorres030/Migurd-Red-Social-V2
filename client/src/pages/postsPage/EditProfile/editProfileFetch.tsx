import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../../../context/users/usersProvider'
import { UserContext, UserEdited } from '../../../types/types'
export const useEditProfileFetch = () => {
  const {
    editUser,
    setProfile,
    setProfilePosts,
    profilePosts,
    newUsernameInPosts,
    dataOfUserLogged,
    setDataOfUserLogged,
  } = useUsers() as UserContext
  const navigate = useNavigate()

  const editProfileFetch = async (values: UserEdited) => {
    try {
      toast.loading('Editando...', { id: 'editToast' })
      const userEdited = await editUser(dataOfUserLogged.username, values)
      if (dataOfUserLogged.username !== values.username) {
        const newPosts = profilePosts.map((posts) => ({
          ...posts,
          author: values.username,
        }))
        const res = await newUsernameInPosts(values.username, newPosts)
        setProfilePosts(res)
      }
      setProfile((prevValue) => {
        const profileEdited = { ...prevValue }
        profileEdited.bigProfileImage = userEdited.bigProfileImage
        profileEdited.username = userEdited.username
        profileEdited.profileImage = userEdited.profileImage
        return profileEdited
      })

      setDataOfUserLogged((prevValue) => {
        const editUserLogged = { ...prevValue }
        editUserLogged.username = userEdited.username
        editUserLogged.profileImage = userEdited.profileImage
        return editUserLogged
      })

      toast.dismiss('editToast')
      toast.success('Editado con éxito.', { id: 'edit' })
      navigate(`/home/${values.username}`)
    } catch (error) {
      toast.error('Error al editar.')
    }
  }

  return { editProfileFetch }
}
