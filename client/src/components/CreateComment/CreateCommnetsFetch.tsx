import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useUsers } from '../../context/users/usersProvider'
import {
  CommentWithUsernameAndImage,
  CreateComment,
  Post,
  UserContext,
} from '../../types/types'
export const useCreateComments = (resultado: Post) => {
  const [finalComments, setFinalComments] = useState<
    Array<CommentWithUsernameAndImage>
  >([])

  const {
    getUnicUserById,
    setProfilePosts,
    dataOfUserLogged,
    commentPostAction,
  } = useUsers() as UserContext

  useEffect(() => {
    fetchCommentsProfiles()
    // eslint-disable-next-line
  }, [resultado.comments])

  const fetchCommentsProfiles = async () => {
    const profilesAuthors = []
    const ArrayOfComments = []

    const mapOfIdAuthors = resultado.comments.map((comment) => {
      return comment.commentAuthorId
    })

    for (const commentAuthorId of mapOfIdAuthors) {
      const { username, picture } = await getUnicUserById(commentAuthorId)
      const userObject = { username, picture }

      profilesAuthors.push(userObject)
    }

    for (let i = 0; i < resultado.comments.length; i++) {
      const finalObjetct = {
        ...resultado.comments[i],
        ...profilesAuthors[i],
      }
      ArrayOfComments.push(finalObjetct)
    }

    const finalArrayOfComments = ArrayOfComments.sort((a, b) => {
      return b.commentId - a.commentId
    })

    setFinalComments(finalArrayOfComments)
  }

  const createCommentOnSubmit = async (
    values: { commentContent: string },
    author: string,
    idPost: string
  ) => {
    const comment: CreateComment = {
      author,
      idPost,
      commentCreated: {
        commentId: resultado.comments.length,
        commentAuthorId: dataOfUserLogged._id,
        commentContent: values.commentContent,
        commentLikes: [],
      },
    }
    try {
      const comments = await commentPostAction(comment)
      setProfilePosts((prevValue) => {
        prevValue[0].comments = comments
        return [...prevValue]
      })
    } catch (error) {
      toast.error('algo ha salido mal :(')
    }
  }

  return { finalComments, createCommentOnSubmit }
}
