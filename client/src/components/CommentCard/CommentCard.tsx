import { useUsers } from '../../context/users/usersProvider'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useCommentCardActions } from './CommnetCardActions'
import { CommentCardProps, UserContext } from '../../types/types'

const CommentCard = ({
  authorOfPost,
  idPost,
  commentId,
  author,
  authorImage,
  comment,
  commentLikes,
}: CommentCardProps) => {
  const { dataOfUserLogged } = useUsers() as UserContext

  const {
    onClickDeleteCommentAction,
    onClickDisLikeCommentAction,
    onClickLikeCommentAction,
    onClickUsername,
    alreadyLikedOrNot,
    numberOfCommentLikes,
  } = useCommentCardActions({ commentLikes })

  return (
    <div className='commentCard'>
      <div className='UserAndOptionsComment'>
        <div className='imageAndUsername'>
          <img
            src={authorImage}
            alt='userImage'
          />
          <p
            className='author'
            onClick={() => {
              onClickUsername(author)
            }}
          >
            {author}
          </p>
        </div>
        <div className='commentOptions'>
          {author === dataOfUserLogged.username && (
            <button
              onClick={() => {
                if (commentId) {
                  onClickDeleteCommentAction(authorOfPost, idPost, commentId)
                }
              }}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>

      <h3>{comment}</h3>
      <div className='likeComment'>
        <p>{numberOfCommentLikes}</p>
        {alreadyLikedOrNot ? (
          <button
            className='unLikeCommentAction'
            onClick={() => {
              if (commentId) {
                onClickDisLikeCommentAction(authorOfPost, idPost, commentId)
              }
            }}
          >
            <AiFillHeart />
          </button>
        ) : (
          <button
            className='likeCommentAction'
            onClick={() => {
              if (commentId) {
                onClickLikeCommentAction(authorOfPost, idPost, commentId)
              }
            }}
          >
            <AiOutlineHeart />
          </button>
        )}
      </div>
    </div>
  )
}

export default CommentCard
