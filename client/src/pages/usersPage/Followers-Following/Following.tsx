import { useUsers } from '../../../context/users/usersProvider'
import { Link } from 'react-router-dom'
import { useOnClickProfileFetch } from './OnClickProfileFetch'
import { UserContext, UsernamesAndPictures } from '../../../types/types'
import { useEffect, useState } from 'react'

const Following = () => {
  const [following, setFollowing] = useState<Array<UsernamesAndPictures>>([])
  const [loading, setLoading] = useState<boolean>(true)

  const { profile, setFollowingScreen, getProfileFollowingByUsernameAction } =
    useUsers() as UserContext

  const { onClickProfile } = useOnClickProfileFetch()

  useEffect(() => {
    asyncGetUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const asyncGetUsers = async () => {
    const data = await getProfileFollowingByUsernameAction(profile.username)
    setFollowing(data)
    setLoading(false)
  }

  const mapOfUsers = following.map((users) => {
    return (
      <div
        key={users.username}
        className='followingList'
      >
        <img
          src={users.picture}
          alt='UserImage'
        />
        <p
          onClick={async () => {
            await onClickProfile(users.username)
          }}
        >
          {users.username}
        </p>
      </div>
    )
  })

  return (
    <div className='followingPage'>
      <Link
        to='../'
        onClick={() => {
          setFollowingScreen(false)
        }}
      >
        X
      </Link>
      <h1>Siguiendo</h1>

      {loading ? (
        <div className='Loading'>
          <div className='loader'></div>
        </div>
      ) : (
        <>
          {following.length === 0 ? (
            <p>Parace que no hay nada para ver...</p>
          ) : (
            mapOfUsers
          )}
        </>
      )}
    </div>
  )
}

export default Following
