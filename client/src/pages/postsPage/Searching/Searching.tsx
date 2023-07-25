import { useSearchingFetchAndActions } from './useSearchingFetchAndActions'

const Searching = () => {
  const {
    onClickSearching,
    onChangeSearching,
    searching,
    listOfUsers,
    usersFoundedBar,
    setSearching,
    setListOfUsers,
    message,
  } = useSearchingFetchAndActions()

  const usersMap = usersFoundedBar.map((usernames) => {
    return (
      <div
        key={usernames.username}
        className='userFounded'
        onClick={() => {
          onClickSearching(usernames.username)
        }}
      >
        <img
          src={usernames.picture}
          alt='ProfileImg'
        />
        <p>{usernames.username}</p>
      </div>
    )
  })

  return (
    <div className='SearchBar'>
      <div className='listOfUsers'>
        <input
          onFocus={() => {
            setListOfUsers(true)
          }}
          placeholder='Buscar Usuario...'
          value={searching}
          onKeyDown={(e) => {
            if (e.code === 'Escape') setSearching('')
          }}
          onChange={onChangeSearching}
        />
        {message ? <p>{message}</p> : null}
        {listOfUsers ? <div className='userMap'>{usersMap}</div> : null}
        {listOfUsers && (
          <button
            className='closeList'
            onClick={() => {
              setListOfUsers(false)
            }}
          >
            Cerrar
          </button>
        )}
      </div>
    </div>
  )
}

export default Searching
