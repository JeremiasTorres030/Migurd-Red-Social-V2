import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useUsers } from '../../context/users/usersProvider'
import { useParams } from 'react-router-dom'
import CommentCard from '../CommentCard/CommentCard'
import { useCreateComments } from './CreateCommnetsFetch'
import { UserContext } from '../../types/types'

const CreateComment = () => {
  const { profilePosts } = useUsers() as UserContext

  const { username, postId } = useParams()

  const [resultado] = profilePosts.filter((posts) => posts._id === postId)

  const { finalComments, createCommentOnSubmit } = useCreateComments(resultado)

  const commentsMap = finalComments.map((comments) => {
    return (
      <CommentCard
        key={comments._id}
        author={comments.username}
        comment={comments.commentContent}
        authorImage={comments.picture}
        commentLikes={comments.commentLikes}
        idPost={resultado._id}
        commentId={comments._id}
        authorOfPost={resultado.author}
      />
    )
  })

  return (
    <div className='commentPost'>
      <Formik
        initialValues={{ commentContent: '' }}
        validationSchema={Yup.object().shape({
          commentContent: Yup.string().required('Intorduzca texto'),
        })}
        onSubmit={async (values, { resetForm }) => {
          if (username && postId) {
            await createCommentOnSubmit(values, username, postId)
          }
          resetForm()
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <ErrorMessage
              component='p'
              name='commentContent'
            />
            <Field
              name='commentContent'
              placeholder='Comentar...'
              autoComplete='off'
            />
            <button
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando' : 'Enviar'}
            </button>
          </Form>
        )}
      </Formik>
      {commentsMap}
    </div>
  )
}

export default CreateComment
