import { useUsers } from '../../context/users/usersProvider'
import { Link } from 'react-router-dom'
import { FaUserPlus } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { NotificationCardProps, UserContext } from '../../types/types'
import useNotificationCard from './NotificationCardActions'

const NotificationCard = ({
  message,
  user,
  userImage,
  idPost,
  imgPost,
  typeNoti,
}: NotificationCardProps) => {
  const { setFullScreenPost } = useUsers() as UserContext

  const { onClickCard } = useNotificationCard()

  return (
    <div
      className={idPost ? 'notificationCardClicked' : 'notificationCard'}
      onClick={() => {
        if (idPost) {
          onClickCard(idPost)
        }
      }}
    >
      <div className='profileImageAndTypeOfNotification'>
        <img
          src={userImage}
          alt='userImage'
          className='ProfileImage'
        />
        {typeNoti === 'follow' && <FaUserPlus className='follow' />}
        {typeNoti === 'like' && <AiFillHeart className='like' />}
        {typeNoti === 'comment' && <BiComment className='comment' />}
      </div>

      <div className='userAndMessageNotification'>
        <Link
          to={`/home/${user}`}
          onClick={(e) => {
            e.stopPropagation()
            setFullScreenPost(false)
          }}
        >
          <strong>{user}</strong>
        </Link>
        <p>{message}</p>
      </div>

      {imgPost && (
        <img
          src={imgPost}
          alt='PostNotificationImage'
          className='PostImage'
        />
      )}
    </div>
  )
}

export default NotificationCard
