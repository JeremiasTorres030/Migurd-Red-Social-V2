import { useState, useEffect } from 'react'
import { useUsers } from '../../../context/users/usersProvider'
import { Post, UserContext } from '../../../types/types'

export const usePostFetch = () => {
  const [dataOfuserFollowed, setDataOfUserFollowed] = useState<Array<Post>>([])
  const { usersFollowing, getOnlyPosts } = useUsers() as UserContext

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line
  }, [usersFollowing])

  const fetchPosts = async () => {
    const mapOfOnlyIds = usersFollowing?.map((users) => {
      return users
    })

    const posts: Array<Array<Post>> = []

    if (mapOfOnlyIds) {
      for (const uId of mapOfOnlyIds) {
        const response = await getOnlyPosts(uId)
        posts.push(response)
      }

      setDataOfUserFollowed(posts.flat())
    }
  }

  return { dataOfuserFollowed }
}
