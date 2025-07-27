import React, { useState, useEffect } from 'react';
import DarkMode from './DarkMode'; 
import SearchContainer from './SearchContainer';
import { useLocation } from 'react-router-dom';

export default function Header_({ onSearchResults, onClearSearch }) {
  const [hideDropdown, setHideDropdown] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 50) {
        setHideDropdown(true);
      } else {
        setHideDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="header-complete">
      <header className="header">
        <div className="title-container">
          <a href="/">
            <img src="/img/logo2.png" alt="Logo" />
            Steam Bundle Set
            <img src="/img/logo2.png" alt="Logo" className="logo-mobile-hide" />
          </a>
        </div>

        {/* Campo de busca só na home */}
        {isHome && (
          <section id="search-container">
            <SearchContainer
              onSearchResults={onSearchResults}
              onClearSearch={onClearSearch}
            />
          </section>
        )}

        <section id="dark-container">
          <DarkMode />
        </section>
      </header>

      <nav className={`dropdown-menu ${hideDropdown ? 'hidden' : ''}`}>
        <div className="dropdown-content">
          <a href="/" className="menu-item">Home</a>
          <a href="/Promocao" className="menu-item">Promoções</a>
          <a href="/free" className="menu-item">Grátis</a>
          <a href="#contato" className="menu-item">Contato</a>
        </div>
      </nav>
    </div>
  );
}