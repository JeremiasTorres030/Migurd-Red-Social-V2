import UserLoggedCard from '../../components/UserLoggedCard'
import { Link, Outlet, NavLink } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineHome } from 'react-icons/ai'
import { IoCreateOutline, IoSearchOutline } from 'react-icons/io5'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { useUsers } from '../../context/users/usersProvider'
import Searching from './Searching/Searching'
import NavBarPhone from '../../components/NavBarPhone'
import CloseSesionNavBar from '../../components/CloseSesionNavBar'
import { UserContext } from '../../types/types'
const Home = () => {
  const {
    isLogged,
    setFullScreenPost,
    setFollowingScreen,
    dataOfUserLogged,
    setFollowersScreen,
    isLoadingMainPage,
  } = useUsers() as UserContext

  const onClickAllFalse = () => {
    setFullScreenPost(false)
    setFollowingScreen(false)
    setFollowersScreen(false)
  }

  if (isLoadingMainPage) {
    return (
      <div className='Loading'>
        <div className='loader'></div>
      </div>
    )
  }

  if (!isLogged && !isLoadingMainPage) {
    return (
      <div className='NoLogged'>
        <h1>Por favor inicie sesión para continuar.</h1>
        <Link to='/login'>Volver</Link>
      </div>
    )
  }

  return (
    <div className='home'>
      <div className='CloseSesionNavBar'>
        <CloseSesionNavBar />
      </div>
      <div className='leftFake'></div>
      <div className='leftHome'>
        <header className='header'>
          <div className='logoYTitulo'>
            <Link
              className='logo'
              to='/home/posts'
              onClick={() => {
                onClickAllFalse()
              }}
            >
              JT
            </Link>
            <h1>Migurd</h1>
          </div>
        </header>
        <div className='buttonsHome'>
          <NavLink
            to='/home/posts'
            onClick={() => {
              onClickAllFalse()
            }}
          >
            <div className='buttonLink'>
              <AiOutlineHome />
              <p>Inicio</p>
            </div>
          </NavLink>
          <NavLink
            to={`/home/${dataOfUserLogged.username}`}
            onClick={() => {
              onClickAllFalse()
            }}
          >
            <div className='buttonLink'>
              <CgProfile />
              <p>Perfil</p>
            </div>
          </NavLink>
          <NavLink
            to={`/home/notifications`}
            onClick={async () => {
              onClickAllFalse()
            }}
          >
            <div className='buttonLink notificationButton'>
              <div className='notificationIconAndCount'>
                <IoMdNotificationsOutline />
                <p>{dataOfUserLogged.notificationsn}</p>
              </div>
              <p>Notificaciones</p>
            </div>
          </NavLink>
          <NavLink
            to={'/home/create'}
            onClick={() => {
              onClickAllFalse()
            }}
          >
            <div className='buttonLink'>
              <IoCreateOutline />
              <p>Post</p>
            </div>
          </NavLink>
          <NavLink
            className='SearchingButton'
            to={'/home/searching'}
            onClick={() => {
              onClickAllFalse()
            }}
          >
            <IoSearchOutline />
          </NavLink>
        </div>
        <UserLoggedCard />
      </div>
      <div className='midHome'>
        <Outlet />
      </div>
      <div className='rightHome'>
        <Searching />
      </div>
      <div className='NavBarPhoneSize'>
        <NavBarPhone />
      </div>
    </div>
  )
}

export default Home
