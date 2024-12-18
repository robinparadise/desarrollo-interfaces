import { useState, createContext } from 'react';
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [estaAutenticado, setEstaAutenticado] = useState(JSON.parse(localStorage.estaAutenticado || 'false'));
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.usuario || 'null')
  );

  const iniciarSesion = (nombreUsuario) => {
    setEstaAutenticado(true);
    setUsuario({ nombre: nombreUsuario });
    update({ nombre: nombreUsuario })
  };

  const cerrarSesion = () => {
    setEstaAutenticado(false);
    setUsuario(null);
    update(null)
  };

  const update = (usuario) => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('estaAutenticado', JSON.stringify(!!usuario));
  }

  const valor = {
    estaAutenticado,
    usuario,
    iniciarSesion,
    cerrarSesion,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}