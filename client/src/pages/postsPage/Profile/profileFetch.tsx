import { useEffect } from 'react'
import { useUsers } from '../../../context/users/usersProvider'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../../types/types'

export const useProfileFetch = () => {
  const { getProfileByUsername, setProfilePosts, setProfile } =
    useUsers() as UserContext
  const { username } = useParams()

  useEffect(() => {
    if (username) {
      asyncGetProfile(username)
    }
    // eslint-disable-next-line
  }, [username])

  const asyncGetProfile = async (username: string) => {
    const response = await getProfileByUsername(username, 'normal')
    setProfile(response)
    setProfilePosts(response.posts)
  }

  return
}
