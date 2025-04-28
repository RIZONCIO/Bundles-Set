document.addEventListener("DOMContentLoaded", function () {
  const footerContainer = document.querySelector(".footer-container");

  const footerContent = document.createElement("div");
  footerContent.classList.add("footer-content");

  const devOne = createSocialBlock("Matheus Coelho", [
    { href: "https://github.com/matheus-fsc", icon: "fa-brands fa-github" },
    {
      href: "https://steamcommunity.com/id/Link_The_Hero/",
      icon: "fa-brands fa-steam",
    },
    {
      href: "https://www.linkedin.com/in/matheus-coelho-07b7711a1/",
      icon: "fa-brands fa-linkedin",
    },
  ]);

  const separator = document.createElement("div");
  separator.classList.add("separator");

  const devTwo = createSocialBlock("RIZONCIO", [
    { href: "https://github.com/RIZONCIO", icon: "fa-brands fa-github" },
    {
      href: "https://www.instagram.com/ckt_rv/",
      icon: "fa-brands fa-instagram",
    },
    {
      href: "https://steamcommunity.com/profiles/76561198171340573/",
      icon: "fa-brands fa-steam",
    },
    {
      href: "https://www.linkedin.com/in/ryan-carvalho-783277292/",
      icon: "fa-brands fa-linkedin",
    },
    {
      href: "https://www.youtube.com/@rizoncioplays6085",
      icon: "fa-brands fa-youtube",
    },
    {
      href: "https://www.behance.net/rizoncioplays",
      icon: "fa-brands fa-square-behance",
    },
  ]);

  const siteLinks = document.createElement("div");
  siteLinks.classList.add("site-links");
  siteLinks.innerHTML = `
        <a href="/page/Sobre.html">Sobre</a>
        <a href="/page/TermoUso.html">Termos de Uso</a>
        <a href="#">Política de Privacidade</a>
        <a href="/page/Doacao.html">Doação</a>
    `;

  const company = document.createElement("div");
  company.classList.add("company");
  company.innerHTML = "© 2025 Nome da Empresa. Todos os direitos reservados.";

  footerContent.appendChild(devOne);
  footerContent.appendChild(separator);
  footerContent.appendChild(devTwo);
  footerContainer.appendChild(footerContent);
  footerContainer.appendChild(siteLinks);
  footerContainer.appendChild(company);
});

function createSocialBlock(title, links) {
  const block = document.createElement("div");
  block.classList.add("social-block");

  const heading = document.createElement("h3");
  heading.textContent = title;
  block.appendChild(heading);

  const iconsContainer = document.createElement("div");
  iconsContainer.classList.add("icons");

  links.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.target = "_blank";
    anchor.innerHTML = `<i class="${link.icon}"></i>`;
    iconsContainer.appendChild(anchor);
  });

  block.appendChild(iconsContainer);
  return block;
}
