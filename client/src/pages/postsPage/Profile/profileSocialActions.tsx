import { useUsers } from '../../../context/users/usersProvider'
import { FollowAction, UserContext } from '../../../types/types'

export const useProfileSocialActions = () => {
  const {
    profile,
    followUserAction,
    dataOfUserLogged,
    unFollowUserAction,
    setUsersFollowing,
    usersFollowing,
    setProfile,
  } = useUsers() as UserContext

  const follow: FollowAction = {
    userFollowed: profile._id,
    whoFollow: dataOfUserLogged._id,
  }

  const FollowAction = async (follow: FollowAction) => {
    await followUserAction(follow)
    setUsersFollowing((prevValue) => [...prevValue, follow.userFollowed])
    setProfile((prevValue) => {
      ++prevValue.followersn
      return prevValue
    })
  }

  const unFollowAction = async (follow: FollowAction) => {
    await unFollowUserAction(follow)
    setUsersFollowing((prevValue) =>
      prevValue.filter((user) => user !== follow.userFollowed)
    )
    setProfile((prevValue) => {
      --prevValue.followersn
      return prevValue
    })
  }

  const followAlreadyOrNot = () => {
    if (usersFollowing.includes(profile._id) === true) {
      return (
        <button
          onClick={() => {
            unFollowAction(follow)
          }}
        >
          Dejar de Seguir
        </button>
      )
    } else {
      return (
        <button
          onClick={() => {
            FollowAction(follow)
          }}
        >
          Seguir
        </button>
      )
    }
  }
  return { followAlreadyOrNot }
}
