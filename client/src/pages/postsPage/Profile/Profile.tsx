import { Link, Outlet } from 'react-router-dom'
import { useUsers } from '../../../context/users/usersProvider'
import PostsCard from '../../../components/PostCard/PostsCard'
import CreatePost from '../../../components/CreatePost/CreatePost'
import EditProfile from '../EditProfile/EditProfile'
import { useProfileFetch } from './profileFetch'
import { useProfileSocialActions } from './profileSocialActions'
import { UserContext } from '../../../types/types'
import { useState } from 'react'

const Profile = () => {
  const {
    FullScreenPost,
    profile,
    profilePosts,
    dataOfUserLogged,
    followingScreen,
    setFollowingScreen,
    followersScreen,
    setFollowersScreen,
  } = useUsers() as UserContext

  const [editProfile, setEditProfile] = useState<boolean>(false)

  useProfileFetch()

  const { followAlreadyOrNot } = useProfileSocialActions()

  const mapPosts = profilePosts?.map((post) => {
    return (
      <PostsCard
        full={false}
        authorId={profile._id}
        authorImage={profile?.profileImage}
        key={post._id}
        id={post._id}
        authorUsername={profile.username}
        post={post.content}
        imageUrl={post.image?.url}
        date={post.date}
        likes={post.likes}
        numberOfComments={post.comments.length}
      />
    )
  })

  if (FullScreenPost || followingScreen || followersScreen)
    return (
      <div className='Profile'>
        <Outlet />
      </div>
    )

  return (
    <div className='Profile'>
      {editProfile ? (
        <EditProfile setEditProfile={setEditProfile} />
      ) : (
        <div className='ProfileUser'>
          <img
            className='BigProfilePicture'
            alt='BigProfilePicture'
            src={profile?.bigProfileImage}
          />
          <img
            className='ProfilePicture'
            alt='ProfilePicture'
            src={profile?.profileImage}
          />
          <div className='EditAndUsername'>
            <h1>{profile.username}</h1>

            {dataOfUserLogged.username === profile.username && (
              <Link
                to='edit'
                onClick={() => {
                  setEditProfile(true)
                }}
              >
                Editar Perfil
              </Link>
            )}

            {profile._id !== dataOfUserLogged._id && followAlreadyOrNot()}
          </div>
          <div className='social'>
            <Link
              to={'following'}
              onClick={() => {
                setFollowingScreen(true)
              }}
            >
              Siguiendo {profile.followingn}
            </Link>

            <Link
              to={'followers'}
              onClick={() => {
                setFollowersScreen(true)
              }}
            >
              Seguidores {profile.followersn}
            </Link>
          </div>
        </div>
      )}

      <div className='ProfilePosts'>
        {dataOfUserLogged.username === profile.username && <CreatePost />}
        {mapPosts}
      </div>
    </div>
  )
}

export default Profile
