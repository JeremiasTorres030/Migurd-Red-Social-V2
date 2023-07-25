import { useEffect, useState } from 'react'
import { useUsers } from '../../context/users/usersProvider'
import { FollowAction, Profile, UserContext } from '../../types/types'
import { getProfileByUsernameRequest } from '../../api/users'
export const useNewPanelUsers = () => {
  const [usersSuggested, setUsersSuggested] = useState<Array<Profile>>([])
  const [loadingPanel, setLoadingPanel] = useState<boolean>(true)
  useEffect(() => {
    usersTest()
    // eslint-disable-next-line
  }, [])

  const {
    dataOfUserLogged,
    followUserAction,
    setUsersFollowing,
    unFollowUserAction,
  } = useUsers() as UserContext
  const usersSuggestedArray = ['JeremiasTorres', 'Knight', 'User']

  const followActionOnClick = async (users: Profile) => {
    const follow: FollowAction = {
      userFollowed: users._id,
      whoFollow: dataOfUserLogged._id,
    }

    await followUserAction(follow)
    setUsersFollowing((prevValue) => [...prevValue, follow.userFollowed])
  }

  const unFollowActionOnClick = async (users: Profile) => {
    const follow = {
      userFollowed: users._id,
      whoFollow: dataOfUserLogged._id,
    }

    await unFollowUserAction(follow)
    setUsersFollowing((prevValue) =>
      prevValue.filter((user) => user !== follow.userFollowed)
    )
  }

  const usersTest = async () => {
    const data = []

    for (const name of usersSuggestedArray) {
      const res = await getProfileByUsernameRequest(name, 'small')
      data.push(res)
    }
    setUsersSuggested(data)
    setLoadingPanel(false)
  }

  return {
    unFollowActionOnClick,
    followActionOnClick,
    usersSuggested,
    loadingPanel,
  }
}
