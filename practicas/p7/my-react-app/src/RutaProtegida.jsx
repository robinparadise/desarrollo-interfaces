import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthProvider'

export function RutaProtegida() {
  const { estaAutenticado } = useContext(AuthContext);

  // Si no está autenticado, redirigir a /login
  return estaAutenticado ? <Outlet /> : <Navigate to="/login" />;
}