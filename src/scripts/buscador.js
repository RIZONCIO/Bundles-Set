const searchContainer = document.querySelector(".search-container");

const title = document.createElement("h1");
title.textContent = "Catálogo";
title.className = "catalog-title";

const searchBox = document.createElement("div");
searchBox.className = "search-box";

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Buscar Bundle...";
searchInput.className = "search-input";

const searchIcon = document.createElement("span");
searchIcon.className = "search-icon";
searchIcon.innerHTML = searchIcon.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
`;

searchBox.appendChild(searchInput);
searchBox.appendChild(searchIcon);

searchContainer.appendChild(title);
searchContainer.appendChild(searchBox);
