import React from 'react';
import DarkMode from './DarkMode'; 

export default function Header_() {
  return (
    <header className="header">
      <div className="title-container">
        <a href="/" >
          <img src="/img/logo2.png" alt="Logo" />
          Steam Bundle Set
          <img src="/img/logo2.png" alt="Logo" className="logo-mobile-hide" />
        </a>
      </div>
      <section id="dark-container">
        <DarkMode />
      </section>
    </header>
  );
}
