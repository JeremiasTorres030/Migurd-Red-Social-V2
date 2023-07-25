import { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useUsers } from '../../context/users/usersProvider'
import { useCreatePost } from './CreatePostFetch'
import { NewPost, UserContext } from '../../types/types'

const CreatePost = () => {
  const { dataOfUserLogged } = useUsers() as UserContext

  const [previewImage, setPreviewImage] = useState<null | string>(null)

  const { createPostFetch } = useCreatePost()

  const initialValues: NewPost = {
    author: dataOfUserLogged._id,
    content: '',
    image: '',
  }

  return (
    <div className='createPost'>
      <h1>Crear Post</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object(
          previewImage
            ? { content: Yup.string().max(280, 'Limite de texto alcanzado') }
            : {
                content: Yup.string()
                  .required('Intoduzca texto o una Imagen')
                  .max(280, 'Limite de texto alcanzado'),
              }
        )}
        onSubmit={async (values, { resetForm }) => {
          await createPostFetch(values)
          setPreviewImage(null)
          resetForm()
        }}
      >
        {({ isSubmitting, handleSubmit, setFieldValue }) => (
          <Form
            onSubmit={handleSubmit}
            className='createPostForm'
          >
            <ErrorMessage
              component='p'
              name='content'
            />

            <Field
              rows='3'
              component='textarea'
              name='content'
              placeholder='Nuevo Post...'
            />
            {previewImage && (
              <div className='PreView'>
                <img
                  alt='PreViewImage'
                  src={previewImage}
                />
                <button
                  onClick={() => {
                    setPreviewImage(null)
                    setFieldValue('image', null)
                  }}
                >
                  X
                </button>
              </div>
            )}

            <div className='submitAndFiles'>
              <button
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creando..' : 'Publicar'}
              </button>
              <input
                type='file'
                name='image'
                accept='image/*'
                onClick={(e) => {
                  e.currentTarget.value = ''
                }}
                onChange={(e) => {
                  const file = e.currentTarget.files
                    ? e.currentTarget.files[0]
                    : null

                  if (e.currentTarget.files?.length === 0) {
                    setPreviewImage(null)
                  }

                  setFieldValue('image', file)
                  if (file) {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)

                    reader.onloadend = function () {
                      setPreviewImage(reader.result as string)
                    }
                  }
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreatePost
