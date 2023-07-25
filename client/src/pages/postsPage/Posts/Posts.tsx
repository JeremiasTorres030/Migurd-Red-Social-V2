import CreatePost from '../../../components/CreatePost/CreatePost'
import PostsCard from '../../../components/PostCard/PostsCard'
import { useUsers } from '../../../context/users/usersProvider'
import { Outlet } from 'react-router-dom'
import { usePostFetch } from './postsFetch'
import NewUsersPanel from '../../../components/NewUsersPanel/NewUsersPanel'
import { UserContext } from '../../../types/types'

const Posts = () => {
  const { dataOfuserFollowed } = usePostFetch()

  const { FullScreenPost, usersFollowing } = useUsers() as UserContext

  const mapOfPostsList = dataOfuserFollowed.map((posts) => {
    return (
      <PostsCard
        full={false}
        authorImage={posts.authorImage}
        key={posts._id}
        authorId={posts.author}
        post={posts.content}
        imageUrl={posts.image?.url}
        id={posts._id}
        authorUsername={posts.authorUsername}
        date={posts.date}
        numberOfComments={posts.comments.length}
        likes={posts.likes}
      />
    )
  })

  if (FullScreenPost) return <Outlet />

  return (
    <div className='Inicio'>
      <CreatePost />
      {usersFollowing?.length < 3 ? <NewUsersPanel /> : null}
      {mapOfPostsList}
    </div>
  )
}

export default Posts
