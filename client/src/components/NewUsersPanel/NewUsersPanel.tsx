import { useNavigate } from 'react-router-dom'
import { useUsers } from '../../context/users/usersProvider'
import { useNewPanelUsers } from './NewUsersPanelFetch'
import { UserContext } from '../../types/types'
const NewUsersPanel = () => {
  const { usersFollowing } = useUsers() as UserContext
  const {
    followActionOnClick,
    unFollowActionOnClick,
    usersSuggested,
    loadingPanel,
  } = useNewPanelUsers()
  const navigate = useNavigate()

  const mapOfUserFollowing = usersFollowing.map((users) => users)

  const mapOfSuggestedUsers = usersSuggested?.map((users) => {
    return (
      <div
        key={users.username}
        className='suggestedUsersCard'
        onClick={() => {
          navigate(`/home/${users.username}`)
        }}
      >
        <img
          src={users.profileImage}
          alt='profileImage'
        />
        <p>{users.username}</p>
        {mapOfUserFollowing.includes(users._id) === true ? (
          <button
            className='unFollowButton'
            onClick={(e) => {
              e.stopPropagation()
              unFollowActionOnClick(users)
            }}
          >
            Dejar de Seguir
          </button>
        ) : (
          <button
            className='followButton'
            onClick={(e) => {
              e.stopPropagation()
              followActionOnClick(users)
            }}
          >
            Seguir
          </button>
        )}
      </div>
    )
  })

  if (loadingPanel) {
    return (
      <div className='NewUsersPanel'>
        <h3>Usuarios a los que puedes seguir</h3>
        <div className='suggestedusers'>
          <div className='Loading'>
            <div className='loader'></div>
          </div>
        </div>
      </div>
    )
  }

  if (!loadingPanel) {
    return (
      <div className='NewUsersPanel'>
        <h3>Usuarios a los que puedes seguir</h3>
        <div className='suggestedusers'>{mapOfSuggestedUsers}</div>
      </div>
    )
  }
}

export default NewUsersPanel
