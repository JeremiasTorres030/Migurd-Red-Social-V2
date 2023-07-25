import { Link } from 'react-router-dom'
import { useUsers } from '../../context/users/usersProvider'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { usePostCard } from './PostCardActions'
import { PostCardProps, UserContext } from '../../types/types'

const PostsCard = ({
  full,
  authorId,
  post,
  imageUrl,
  id,
  authorUsername,
  date,
  authorImage,
  numberOfComments,
  likes,
}: PostCardProps) => {
  const { setFullScreenPost, dataOfUserLogged } = useUsers() as UserContext

  const {
    deletePostAction,
    onClickCard,
    onClickDisLikeAction,
    onClickLikeAction,
    numberOfLikes,
    alreadyLikeOrNot,
  } = usePostCard({ likes })

  return (
    <div
      className='PostsCard'
      id={id}
      onClick={() => {
        onClickCard(authorId, id)
      }}
    >
      <div className='UserAndOptions'>
        <div className='imageAndUsername'>
          <img
            src={authorImage}
            alt='ProfilePostPicture'
          />
          <Link
            to={`/home/${authorUsername}`}
            onClick={(e) => {
              e.stopPropagation()
              setFullScreenPost(false)
            }}
          >
            {authorUsername}
          </Link>
        </div>
        <div className='PostsOptions'>
          {authorId === dataOfUserLogged._id && full === false && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                deletePostAction(authorUsername, id)
              }}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>

      <h3>{post}</h3>
      {imageUrl && (
        <img
          src={imageUrl}
          alt='postImage'
          className='postImage'
        />
      )}
      <div className='commentsAndLikes'>
        <div className='like'>
          <p>{numberOfLikes}</p>
          {alreadyLikeOrNot ? (
            <button
              className='unLikeAction'
              onClick={async (e) => {
                e.stopPropagation()
                await onClickDisLikeAction(authorId, id)
              }}
            >
              <AiFillHeart />
            </button>
          ) : (
            <button
              className='likeAction'
              onClick={async (e) => {
                e.stopPropagation()
                await onClickLikeAction(authorId, id)
              }}
            >
              <AiOutlineHeart />
            </button>
          )}
        </div>
        <div className='comments'>
          <p>{numberOfComments}</p>
          <BiComment />
        </div>
      </div>

      <p>{date}</p>
    </div>
  )
}

export default PostsCard
