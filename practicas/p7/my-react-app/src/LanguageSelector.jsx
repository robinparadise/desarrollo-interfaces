import React, { useContext, useState } from 'react';
import './LanguageSelector.css';
import { LangContext } from './LangProvider';

const LanguageSelector = () => {
  const { language, changeLanguage } = useContext(LangContext);
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'ch', label: '中文' },
    { code: 'fr', label: 'Français' },
    { code: 'pt', label: 'Português' },
    { code: 'it', label: 'Italiano' }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="language-selector">
      <button className="language-button" onClick={toggleDropdown}>
        {languages.find(lang => lang.code === language)?.label}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {languages.map((lang) => (
            <li
              key={lang.code}
              className="dropdown-item"
              onClick={() => handleLanguageChange(lang.code)}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
