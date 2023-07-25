import { useUsers } from '../../context/users/usersProvider'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { CommentLikeAction, Like, UserContext } from '../../types/types'
import { useEffect, useState } from 'react'

export const useCommentCardActions = ({
  commentLikes,
}: {
  commentLikes: Array<Like>
}) => {
  const [alreadyLikedOrNot, setAlreadyLikeOrNot] = useState<boolean>(false)
  const [commentLikesState, setCommentLikesState] =
    useState<Array<Like>>(commentLikes)

  const {
    likeCommentAction,
    disLikeCommentAction,
    setFullScreenPost,
    setProfile,
    deleteCommentAction,
    dataOfUserLogged,
    setProfilePosts,
    getProfileByUsername,
  } = useUsers() as UserContext

  const navigate = useNavigate()

  useEffect(() => {
    if (
      commentLikesState.find((like) => like.idUser === dataOfUserLogged._id)
    ) {
      setAlreadyLikeOrNot(true)
    } else {
      setAlreadyLikeOrNot(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentLikesState])

  const onClickLikeCommentAction = async (
    author: string,
    idPost: string,
    commentId: string
  ) => {
    const commentLiked: CommentLikeAction = {
      author,
      idPost,
      commentId,
      idUser: dataOfUserLogged._id,
    }
    try {
      await likeCommentAction(commentLiked)
      setCommentLikesState((prevValue) => {
        prevValue.push({
          idUser: dataOfUserLogged._id,
        })
        return [...prevValue]
      })
    } catch (error) {
      toast.error('Algo ha salido mal :(.')
    }
  }

  const onClickDisLikeCommentAction = async (
    author: string,
    idPost: string,
    commentId: string
  ) => {
    const commentDisLiked: CommentLikeAction = {
      author,
      idPost,
      commentId,
      idUser: dataOfUserLogged._id,
    }
    try {
      await disLikeCommentAction(commentDisLiked)
      setCommentLikesState((prevValue) => {
        const commentLikes = prevValue.filter(
          (like) => like.idUser !== dataOfUserLogged._id
        )
        return [...commentLikes]
      })
    } catch (error) {
      toast.error('Algo ha salido mal :(.')
    }
  }

  const onClickDeleteCommentAction = async (
    author: string,
    idPost: string,
    commentId: string
  ) => {
    try {
      await deleteCommentAction(author, idPost, commentId)
      toast.dismiss('delete')
      toast.success('Comentario eliminado con éxito.', { id: 'delete' })
      setProfilePosts((prevValue) => {
        prevValue[0].comments = prevValue[0].comments.filter(
          (comment) => comment._id !== commentId
        )
        return [...prevValue]
      })
    } catch (error) {
      toast.error('Algo ha salido mal :(.')
    }
  }

  const onClickUsername = async (author: string) => {
    setFullScreenPost(false)
    const response = await getProfileByUsername(author, 'normal')
    setProfile(response)
    navigate(`/home/${author}`)
  }
  return {
    onClickDeleteCommentAction,
    onClickDisLikeCommentAction,
    onClickLikeCommentAction,
    onClickUsername,
    alreadyLikedOrNot,
    numberOfCommentLikes: commentLikesState.length,
  }
}
