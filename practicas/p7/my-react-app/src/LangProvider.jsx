import { useState, createContext } from 'react';

export const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LangContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
}
