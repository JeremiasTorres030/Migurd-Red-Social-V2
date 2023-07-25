import { useNavigate } from 'react-router-dom'
import { useUsers } from '../../../context/users/usersProvider'
import { UserContext } from '../../../types/types'

export const useOnClickProfileFetch = () => {
  const navigate = useNavigate()
  const {
    setProfile,
    setFollowersScreen,
    setFollowingScreen,
    getProfileByUsername,
  } = useUsers() as UserContext

  const onClickProfile = async (username: string) => {
    const res = await getProfileByUsername(username, 'normal')
    setProfile(res)
    setFollowersScreen(false)
    setFollowingScreen(false)
    navigate(`/home/${username}`)
  }
  return { onClickProfile }
}
