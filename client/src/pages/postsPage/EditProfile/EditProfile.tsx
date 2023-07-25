import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUsers } from '../../../context/users/usersProvider'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useEditProfileFetch } from './editProfileFetch'
import * as Yup from 'yup'
import { EditProfileProps, UserContext, UserEdited } from '../../../types/types'

const EditProfile = ({ setEditProfile }: EditProfileProps) => {
  const [profileImagePreview, setProfileImagePreview] = useState<string>()
  const [profileBigImagePreview, setProfileBigImagePreview] = useState<string>()
  const { profile } = useUsers() as UserContext
  const { editProfileFetch } = useEditProfileFetch()

  const initialValues: UserEdited = {
    username: profile.username,
    profileImage: '',
    bigProfileImage: '',
  }

  return (
    <div className='ProfileUserEdit'>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          username: Yup.string().required('Ingrese un username valido'),
        })}
        onSubmit={(values) => {
          if (JSON.stringify(initialValues) === JSON.stringify(values)) return
          editProfileFetch(values)
        }}
      >
        {({ handleSubmit, setFieldValue, isSubmitting }) => (
          <Form>
            <div className='BigProfilePictureEdit'>
              {profileBigImagePreview ? (
                <img
                  className='BigProfilePicture'
                  alt='BigProfilePicture'
                  src={profileBigImagePreview}
                />
              ) : (
                <img
                  className='BigProfilePicture'
                  alt='BigProfilePicture'
                  src={profile.bigProfileImage}
                />
              )}

              <input
                accept='.jpg, .jpeg, .png'
                type='file'
                name='bigProfileImage'
                onChange={(e) => {
                  const file = e.currentTarget.files
                    ? e.currentTarget.files[0]
                    : null
                  setFieldValue('bigProfileImage', file)
                  if (file) {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onloadend = () => {
                      setProfileBigImagePreview(reader.result as string)
                    }
                  }
                }}
              />
            </div>
            <div className='ProfilePictureEdit'>
              {profileImagePreview ? (
                <img
                  className='ProfilePicture'
                  alt='ProfilePicture'
                  src={profileImagePreview}
                />
              ) : (
                <img
                  className='ProfilePicture'
                  alt='ProfilePicture'
                  src={profile.profileImage}
                />
              )}

              <input
                accept='.jpg, .jpeg, .png'
                type='file'
                name='profileImage'
                onChange={(e) => {
                  const file = e.currentTarget.files
                    ? e.currentTarget.files[0]
                    : null
                  setFieldValue('profileImage', file)
                  if (file) {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onloadend = () => {
                      setProfileImagePreview(reader.result as string)
                    }
                  }
                }}
              />
            </div>
            <div className='EditAndUsernameEdit'>
              <label>
                <ErrorMessage
                  component='p'
                  name='username'
                />
                <Field
                  component='input'
                  id='username'
                  type='text'
                  name='username'
                />
              </label>

              <Link
                to={`/home/${profile.username}`}
                onClick={() => {
                  handleSubmit()
                  if (setEditProfile) {
                    setEditProfile(false)
                  }
                }}
              >
                {isSubmitting ? 'Editando...' : 'Finalizado'}
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditProfile
