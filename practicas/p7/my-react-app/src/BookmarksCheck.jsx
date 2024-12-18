import { useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthProvider'

export function BookmarksCheck() {
  const [bookmarks, setBookmarks] = useState([1,2,3])

  // Si no está autenticado, redirigir a /login
  return bookmarks.length ? <Outlet /> : <Navigate to="/login" />;
}