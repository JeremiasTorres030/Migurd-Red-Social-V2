import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUsers } from '../../../context/users/usersProvider'
import { UserContext, UsernamesAndPictures } from '../../../types/types'
export const useSearchingFetchAndActions = () => {
  const [searching, setSearching] = useState<string>('')
  const [timer, setTimer] = useState<number>()
  const [listOfUsers, setListOfUsers] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [usersFoundedBar, setUsersFoundedBar] = useState<
    Array<UsernamesAndPictures>
  >([])
  const {
    setProfile,
    setFollowingScreen,
    setFollowersScreen,
    setFullScreenPost,
    searchingUsers,
    getProfileByUsername,
  } = useUsers() as UserContext
  const navigate = useNavigate()

  const onClickSearching = async (username: string) => {
    setUsersFoundedBar([])
    const res = await getProfileByUsername(username, 'normal')
    setProfile(res)
    setFollowingScreen(false)
    setFollowersScreen(false)
    setFullScreenPost(false)
    navigate(`/home/${username}`)
    setSearching('')
    setListOfUsers(false)
  }

  const onChangeSearching = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer)
    setUsersFoundedBar([])
    const value = e.target.value.toLowerCase()
    const timerId = setTimeout(async () => {
      if (value === '') {
        setMessage('')
      }
      const users = await searchingUsers(value)
      if (users.length === 0) {
        setMessage('No se han encontrado usuarios.')
        return
      } else {
        setMessage('')
      }
      setUsersFoundedBar(users)
    }, 1000)
    setSearching(value)
    setTimer(timerId)
  }

  return {
    onClickSearching,
    onChangeSearching,
    searching,
    listOfUsers,
    usersFoundedBar,
    setSearching,
    setListOfUsers,
    message,
  }
}
