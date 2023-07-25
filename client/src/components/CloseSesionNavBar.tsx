import { IoMdExit, IoMdNotificationsOutline } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../context/users/usersProvider'
import { UserContext } from '../types/types'

const CloseSesionNavBar = () => {
  const {
    dataOfUserLogged,
    setLogin,
    setFullScreenPost,
    setFollowingScreen,
    setFollowersScreen,
    getNotificationsAction,
  } = useUsers() as UserContext
  const navigate = useNavigate()

  const onClickAllFalse = () => {
    setFullScreenPost(false)
    setFollowingScreen(false)
    setFollowersScreen(false)
  }

  return (
    <div className='CloseSesionNavBar'>
      <div className='CloseSesionButtons'>
        <img
          src={dataOfUserLogged?.profileImage}
          onClick={() => {
            onClickAllFalse()
            navigate('config')
          }}
          alt='UserLoggedImage'
        />
        <div className='CloseSesionNavBarNotifications'>
          <IoMdNotificationsOutline
            onClick={async () => {
              onClickAllFalse()
              await getNotificationsAction(dataOfUserLogged.username)
              navigate('notifications')
            }}
          />
          <p>{dataOfUserLogged.notificationsn}</p>
        </div>
        <IoMdExit
          onClick={() => {
            onClickAllFalse()
            navigate('/login')
            setLogin(false)
            localStorage.removeItem('migurdLoginSesion')
          }}
        />
      </div>
    </div>
  )
}

export default CloseSesionNavBar
