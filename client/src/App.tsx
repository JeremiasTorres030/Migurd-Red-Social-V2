import { Toaster } from 'react-hot-toast'
import Router from './router/Router'

function App() {
  return (
    <div className='App'>
      <Toaster
        toastOptions={{ style: { background: 'black', color: 'white' } }}
      />
      <Router />
    </div>
  )
}

export default App
