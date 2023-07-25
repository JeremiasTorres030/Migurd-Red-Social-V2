import { useUsers } from '../context/users/usersProvider'
import { NavLink } from 'react-router-dom'
import { IoCreateOutline, IoSearchOutline } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineHome } from 'react-icons/ai'
import { UserContext } from '../types/types'
const NavBarPhone = () => {
  const {
    setFullScreenPost,
    setFollowersScreen,
    setFollowingScreen,
    dataOfUserLogged,
  } = useUsers() as UserContext

  const onClickAllFalse = () => {
    setFullScreenPost(false)
    setFollowingScreen(false)
    setFollowersScreen(false)
  }

  return (
    <div className='NavBarPhone'>
      <div className='buttonsHome'>
        <NavLink
          to='/home/posts'
          onClick={() => {
            onClickAllFalse()
          }}
        >
          <AiOutlineHome />
        </NavLink>
        <NavLink
          to={`/home/${dataOfUserLogged.username}`}
          onClick={() => {
            onClickAllFalse()
          }}
        >
          <CgProfile />
        </NavLink>
        <NavLink
          to={'/home/create'}
          onClick={() => {
            onClickAllFalse()
          }}
        >
          <IoCreateOutline />
        </NavLink>
        <NavLink
          to={'/home/searching'}
          onClick={() => {
            onClickAllFalse()
          }}
        >
          <IoSearchOutline />
        </NavLink>
      </div>
    </div>
  )
}

export default NavBarPhone
