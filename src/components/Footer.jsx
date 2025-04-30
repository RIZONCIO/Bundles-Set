import React from 'react';
import '../styles/Footer.css';

function SocialBlock({ title, links }) {
  return (
    <div className="social-block">
      <h3>{title}</h3>
      <div className="icons">
        {links.map((link, index) => (
          <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
            <i className={link.icon}></i>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  const devOneLinks = [
    { href: "https://github.com/matheus-fsc", icon: "fa-brands fa-github" },
    { href: "https://steamcommunity.com/id/Link_The_Hero/", icon: "fa-brands fa-steam" },
    { href: "https://www.linkedin.com/in/matheus-coelho-07b7711a1/", icon: "fa-brands fa-linkedin" },
  ];

  const devTwoLinks = [
    { href: "https://github.com/RIZONCIO", icon: "fa-brands fa-github" },
    { href: "https://www.instagram.com/ckt_rv/", icon: "fa-brands fa-instagram" },
    { href: "https://steamcommunity.com/profiles/76561198171340573/", icon: "fa-brands fa-steam" },
    { href: "https://www.linkedin.com/in/ryan-carvalho-783277292/", icon: "fa-brands fa-linkedin" },
    { href: "https://www.youtube.com/@rizoncioplays6085", icon: "fa-brands fa-youtube" },
    { href: "https://www.behance.net/rizoncioplays", icon: "fa-brands fa-square-behance" },
  ];

  return (
    <footer>
      <section className="footer-container">
        <div className="footer-content">
          <SocialBlock title="Matheus Coelho" links={devOneLinks} />
          <div className="separator"></div>
          <SocialBlock title="RIZONCIO" links={devTwoLinks} />
        </div>
        <div className="site-links">
          <a href="/page/Sobre.html">Sobre</a>
          <a href="/page/TermoUso.html">Termos de Uso</a>
          <a href="#">Política de Privacidade</a>
          <a href="/page/Doacao.html">Doação</a>
        </div>
        <div className="company">
          © 2025 Nome da Empresa. Todos os direitos reservados.
        </div>
      </section>
    </footer>
  );
}