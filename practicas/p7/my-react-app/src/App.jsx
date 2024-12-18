import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RutaProtegida } from './RutaProtegida';
import Home from './Home';
import TestPage from './TestPage'
import Login from './Login';
import Dashboard from './Dashboard';
import About from './About';
import Article from './Article';
import Navbar from './Navbar';
import { AuthProvider } from './AuthProvider';
import { TemaProvider } from './TemaProvider'
import { LangProvider } from './LangProvider';

function App() {
  const [tema, setTema] = React.useState('light');

  return (
    <TemaProvider>
      <AuthProvider>
        <LangProvider>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/news/:id" element={<Article />} />

              <Route path="/test" element={<TestPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />

              {/* Rutas Protegidas */}
              <Route element={<RutaProtegida />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

              {/* Ruta por defecto (404) */}
              <Route path="*" element={<div>Página no encontrada</div>} />
            </Routes>
          </BrowserRouter>
        </LangProvider>
      </AuthProvider>
    </TemaProvider>
  );
}

export default App;
