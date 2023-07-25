import { useUsers } from '../../../context/users/usersProvider'
import { Link } from 'react-router-dom'
import { useOnClickProfileFetch } from './OnClickProfileFetch'
import { UserContext, UsernamesAndPictures } from '../../../types/types'
import { useEffect, useState } from 'react'

const Followers = () => {
  const [followers, setFollowers] = useState<Array<UsernamesAndPictures>>([])
  const [loading, setLoading] = useState<boolean>(true)

  const { profile, setFollowersScreen, getProfileFollowersByUsernameAction } =
    useUsers() as UserContext

  const { onClickProfile } = useOnClickProfileFetch()

  useEffect(() => {
    asyncGetUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const asyncGetUsers = async () => {
    const data = await getProfileFollowersByUsernameAction(profile.username)
    setFollowers(data)
    setLoading(false)
  }

  const mapOfUsers = followers.map((users) => {
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
          onClick={() => {
            onClickProfile(users.username)
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
          setFollowersScreen(false)
        }}
      >
        X
      </Link>
      <h1>Seguidores</h1>

      {loading ? (
        <div className='Loading'>
          <div className='loader'></div>
        </div>
      ) : (
        <>
          {followers.length === 0 ? (
            <p>Parace que no hay nada para ver...</p>
          ) : (
            mapOfUsers
          )}
        </>
      )}
    </div>
  )
}

export default Followers
