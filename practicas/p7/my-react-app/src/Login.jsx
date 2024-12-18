import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

export default function Login() {
  const { iniciarSesion, estaAutenticado } = useContext(AuthContext);
  const navigate = useNavigate();

  const manejarLogin = () => {
    iniciarSesion('JuanPerez'); // usuario simulado
    navigate('/dashboard'); // navegar a una página protegida después de iniciar sesión
  };

  if (estaAutenticado) {
    return (
      <div>
        <p>Ya estás autenticado.</p>
        <button onClick={() => navigate('/dashboard')}>Ir al Panel</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Haz clic en el botón para simular el inicio de sesión.</p>
      <button onClick={manejarLogin}>Iniciar sesión como Pepito</button>
    </div>
  );
}