import { toast } from 'react-hot-toast'
import { useUsers } from '../../context/users/usersProvider'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  Like,
  PostLikeAction,
  UsePostCardProps,
  UserContext,
} from '../../types/types'

export const usePostCard = ({ likes }: UsePostCardProps) => {
  const [likesState, setLikesState] = useState<Array<Like>>(likes)
  const [alreadyLikeOrNot, setAlreadyLikeOrNot] = useState<boolean>(false)

  const {
    likePostAction,
    getOnlyPosts,
    disLikePostAction,
    setProfilePosts,
    dataOfUserLogged,
    setFullScreenPost,
    deletePost,
  } = useUsers() as UserContext

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    setAlreadyLikeOrNot(likeOrNot())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likesState])

  const onClickLikeAction = async (author: string, idPost: string) => {
    const postLiked: PostLikeAction = {
      author,
      idPost,
      user: dataOfUserLogged._id,
    }
    try {
      await likePostAction(postLiked)
      if (pathname.includes('posts') === true) {
        const response = await getOnlyPosts(author)
        setProfilePosts(response)
      }
      setLikesState((prevValue) => {
        prevValue.push({ idUser: dataOfUserLogged._id })
        return [...prevValue]
      })
    } catch (error) {
      toast.error('Algo ha salido mal :(.')
    }
  }

  const onClickDisLikeAction = async (author: string, idPost: string) => {
    const postDisLiked: PostLikeAction = {
      author,
      idPost,
      user: dataOfUserLogged._id,
    }
    try {
      await disLikePostAction(postDisLiked)
      if (pathname.includes('posts') === true) {
        const response = await getOnlyPosts(author)
        setProfilePosts(response)
      }
      setLikesState((prevValue) =>
        prevValue.filter((like) => like.idUser !== dataOfUserLogged._id)
      )
    } catch (error) {
      toast.error('Algo ha salido mal :(.')
    }
  }

  const likeOrNot = (): boolean => {
    const isUserIn = likesState.some(
      (like) => like.idUser === dataOfUserLogged._id
    )
    return isUserIn
  }

  const onClickCard = async (author: string, id: string) => {
    const response = await getOnlyPosts(author)
    setProfilePosts(response)
    setFullScreenPost(true)
    if (pathname.includes('posts') === true) {
      navigate(`/home/posts/${author}/${id}`)
    } else {
      navigate(`/home/${author}/${id}`)
    }
  }

  const deletePostAction = async (author: string, id: string) => {
    try {
      await deletePost(author, id)
      toast.remove('deletePost')
      toast.success('Post eliminado con éxito.', { id: 'deletePost' })
      const response = await getOnlyPosts(dataOfUserLogged._id)
      setProfilePosts(response)
    } catch (error) {
      toast.error('Error al eliminar el post.')
    }
  }
  return {
    deletePostAction,
    onClickCard,
    onClickDisLikeAction,
    onClickLikeAction,
    numberOfLikes: likesState.length,
    alreadyLikeOrNot,
  }
}
