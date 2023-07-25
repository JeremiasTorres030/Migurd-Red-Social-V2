import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from '../pages/usersPage/Index'
import Signup from '../pages/usersPage/SignUp/SignUp'
import Login from '../pages/usersPage/Login/Login'
import Home from '../pages/postsPage/Home'
import Notifications from '../pages/usersPage/Notifications/Notifications'
import Config from '../pages/usersPage/Config'
import Searching from '../pages/postsPage/Searching/Searching'
import Posts from '../pages/postsPage/Posts/Posts'
import FullPost from '../components/FullPost/FullPost'
import Profile from '../pages/postsPage/Profile/Profile'
import EditProfile from '../pages/postsPage/EditProfile/EditProfile'
import Following from '../pages/usersPage/Followers-Following/Following'
import Followers from '../pages/usersPage/Followers-Following/Followers'
import CreatePost from '../components/CreatePost/CreatePost'
import UsersProvider from '../context/users/usersProvider'

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <UsersProvider />,
      children: [
        {
          path: '/',
          element: <Index />,
        },
        { path: '/signup', element: <Signup /> },
        { path: '/login', element: <Login /> },
        {
          path: '/home',
          element: <Home />,
          children: [
            {
              path: 'notifications',
              element: <Notifications />,
            },
            {
              path: 'config',
              element: <Config />,
            },
            { path: 'searching', element: <Searching /> },
            {
              path: 'posts',
              element: <Posts />,
              children: [
                {
                  path: ':username/:postId',
                  element: <FullPost />,
                },
              ],
            },
            {
              path: ':username',
              element: <Profile />,
              children: [
                { path: 'edit', element: <EditProfile /> },
                {
                  path: ':postId',
                  element: <FullPost />,
                },
                {
                  path: 'following',
                  element: <Following />,
                },
                {
                  path: 'followers',
                  element: <Followers />,
                },
              ],
            },
            { path: 'create', element: <CreatePost /> },
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
