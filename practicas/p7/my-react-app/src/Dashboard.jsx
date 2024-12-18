import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

export default function Dashboard() {
  const { usuario, cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  const manejarCerrarSesion = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <div style={{margin: 20}}>
      <h1>Panel (Dashboard)</h1>
      <p>¡Bienvenido, {usuario?.nombre}!</p>
      <button onClick={manejarCerrarSesion}>Cerrar sesión</button>
    </div>
  );
}
