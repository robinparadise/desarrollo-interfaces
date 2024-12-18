import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { TemaContext } from './TemaProvider';

export default function Navbar() {
  const { tema, setTema } = useContext(TemaContext);

  const changeTema = () => {
    setTema(tema === 'light' ? 'dark' : 'light')
  }

  return (
    <nav>
      <NavLink 
        to="/" 
        style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
      >
        Inicio
      </NavLink>
      <NavLink 
        to="/about" 
        className={({ isActive }) => isActive ? 'link-activo' : ''}
      >
        Acerca
      </NavLink>
      <NavLink 
        to="/news/1" 
        className={({ isActive }) => isActive ? 'link-activo' : ''}
      >
        Article 1
      </NavLink>
      <NavLink 
        to="/news/2" 
        className={({ isActive }) => isActive ? 'link-activo' : ''}
      >
        Article 2
      </NavLink>
      <LanguageSelector/>

      <button onClick={changeTema}>
        {tema === 'light' ? '🌞 light' : '🌚 dark'}
      </button>

    </nav>
  );
}
