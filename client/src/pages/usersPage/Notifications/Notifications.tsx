import { useNotificationFetch } from './NotificationsFetch'
import NotificationCard from '../../../components/NotificationCard/NotificationCard'
const Notifications = () => {
  const { notifications, isLoading, deleteNotifications } =
    useNotificationFetch()
  const mapOfnoti = notifications.map((noti) => {
    return (
      <NotificationCard
        key={noti.id}
        message={noti.message}
        user={noti.username}
        userImage={noti.profileImage}
        idPost={noti?.idPost}
        imgPost={noti?.imgPost}
        typeNoti={noti.typeNoti}
      />
    )
  })

  if (isLoading) {
    return (
      <div className='Loading'>
        <div className='loader'></div>
      </div>
    )
  }

  if (notifications.length === 0 && !isLoading) {
    return (
      <div>
        <h1>No tienes notificaciones...</h1>
      </div>
    )
  }

  return (
    <div className='Notifications'>
      <div className='buttonAndTitle'>
        <h2>Notificaciones:</h2>
        <button
          onClick={async () => {
            await deleteNotifications()
          }}
        >
          Eliminar Notificaciones
        </button>
      </div>

      {mapOfnoti}
    </div>
  )
}

export default Notifications
