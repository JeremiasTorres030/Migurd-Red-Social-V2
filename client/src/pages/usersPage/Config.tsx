import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../../context/users/usersProvider'
import { UserContext } from '../../types/types'

const Config = () => {
  const { deleteUser, dataOfUserLogged } = useUsers() as UserContext
  const navigate = useNavigate()
  const [deleteAcc, setDeleteAcc] = useState<boolean>(false)
  return (
    <div className='Config'>
      <h1>Configuración de Cuenta.</h1>
      <div className='DeleteConfig'>
        <button
          className='DeleteAcc'
          onClick={() => {
            setDeleteAcc(true)
          }}
        >
          Eliminar cuenta
        </button>
        {deleteAcc && (
          <div>
            <button
              className='Confirm'
              onClick={async () => {
                await deleteUser(dataOfUserLogged.username)
                navigate('/login')
              }}
            >
              Confirmar
            </button>
            <button
              className='DeleteAcc'
              onClick={() => {
                setDeleteAcc(false)
              }}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Config
