import { HeaderProps } from '../types/types'

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className='header'>
      <div className='logoYTitulo'>
        <p className='logo'>JT</p>
        <h1>Migurd</h1>
      </div>
      <div className='subtitulo'>
        <h2>{title}</h2>
      </div>
    </header>
  )
}

export const Footer = () => {
  return (
    <footer className='footer'>
      <p>Jeremias Torres &copy; {new Date().getFullYear()}</p>
    </footer>
  )
}
