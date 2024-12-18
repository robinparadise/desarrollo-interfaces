import { useState, createContext } from 'react';
export const TemaContext = createContext('light'); // 'light' valor por defecto

export function TemaProvider({ children }) {
  const [tema, setTema] = useState('light');

  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      {children}
    </TemaContext.Provider>
  );
}
