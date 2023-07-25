import { Link } from 'react-router-dom'
import { Footer } from '../../layout/Layout'

const Index = () => {
  return (
    <div className='inicio'>
      <div>
        <header className='header'>
          <p className='logo'>JT</p>
          <h1>Migurd</h1>
        </header>
        <main className='mainInicio'>
          <Link to='/login'>Iniciar sesión</Link>
          <Link to='/signup'>Registrarse</Link>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Index
