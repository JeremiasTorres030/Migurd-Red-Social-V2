import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useUsers } from '../../context/users/usersProvider'
import PostsCard from '../PostCard/PostsCard'
import CreateComment from '../CreateComment/CreateComment'
import { UserContext } from '../../types/types'

const FullPost = () => {
  const { postId } = useParams()
  const { setFullScreenPost, profilePosts } = useUsers() as UserContext

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const exitFullScreenPost = () => {
    if (pathname.includes('posts')) {
      setFullScreenPost(false)
      navigate('/home/posts')
      return
    }
    setFullScreenPost(false)
    navigate('../')
  }

  const [resultado] = profilePosts.filter((posts) => {
    return posts._id === postId
  })

  return (
    <div className='fullScreenPost'>
      <button
        className='goBack'
        onClick={() => {
          exitFullScreenPost()
        }}
      >
        X
      </button>
      <PostsCard
        full={true}
        authorUsername={resultado.authorUsername}
        authorImage={resultado.authorImage}
        id={resultado._id}
        authorId={resultado.author}
        post={resultado.content}
        imageUrl={resultado.image?.url}
        date={resultado.date}
        likes={resultado.likes}
        numberOfComments={resultado.comments.length}
        key={resultado._id}
      />
      <CreateComment />
    </div>
  )
}

export default FullPost
