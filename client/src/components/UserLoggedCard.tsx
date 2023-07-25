import { useNavigate, Link } from 'react-router-dom'
import { useUsers } from '../context/users/usersProvider'
import { IoMdExit } from 'react-icons/io'
import { UserContext } from '../types/types'

const UserLoggedCard = () => {
  const { setLogin, dataOfUserLogged, socket } = useUsers() as UserContext
  const navigate = useNavigate()

  return (
    <div className='userCard'>
      <img
        src={dataOfUserLogged.profileImage}
        alt='ProfileImg'
      />
      <div className='usernameAndLogOut'>
        <p> {dataOfUserLogged.username}</p>

        <button
          onClick={() => {
            navigate('/login')
            setLogin(false)
            localStorage.removeItem('migurdLoginSesion')
            socket?.emit('logout', dataOfUserLogged._id)
          }}
        >
          <div className='buttonLink'>
            <IoMdExit />
            <p>Cerrar Sesión</p>
          </div>
        </button>
      </div>
      <div className='usernameAndConfig'>
        <Link to='config'>...</Link>
      </div>
    </div>
  )
}

export default UserLoggedCard
