import { useEffect, useState } from 'react'
import { useUsers } from '../../../context/users/usersProvider'
import { NotificationWithUser, UserContext } from '../../../types/types'
export const useNotificationFetch = () => {
  const {
    dataOfUserLogged,
    getNotificationsAction,
    deleteNotificationsAction,
    socket,
    setDataOfUserLogged,
  } = useUsers() as UserContext
  const [notifications, setNotifications] = useState<
    Array<NotificationWithUser>
  >([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setDataOfUserLogged((prevValue) => {
      prevValue.notificationsn = 0

      return { ...prevValue }
    })

    gettigUsers()

    socket?.on('notificationC', () => {
      gettigUsers()
    })

    return () => {
      socket?.off('notificationC')
    }

    // eslint-disable-next-line
  }, [])

  const gettigUsers = async () => {
    const notificationsData = await getNotificationsAction(
      dataOfUserLogged.username
    )
    setNotifications(notificationsData)
    setIsLoading(false)
  }

  const deleteNotifications = async () => {
    await deleteNotificationsAction(dataOfUserLogged._id)
    setDataOfUserLogged((prevValue) => {
      prevValue.notificationsn = 0

      return { ...prevValue }
    })
    setNotifications([])
  }

  return { notifications, isLoading, deleteNotifications }
}
