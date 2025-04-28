function displayBundles(data) {
  const bundlesDiv = document.getElementById("bundles");

  data.bundles.forEach((bundle) => {
    const bundleDiv = document.createElement("div");
    bundleDiv.classList.add("card");
    bundleDiv.innerHTML = `
      <img src="${bundle.header_image}" alt="${bundle.Nome}">
      <div class="card-content">
        <h3>${bundle.name}</h3>
        <p>${bundle.description}</p>
        <div class="preco-btn-container">
          <p class="preco">${bundle.formatted_final_price}</p>
          <a href="${bundle.Link}" target="_blank" rel="noopener noreferrer">Ver na Steam</a>
        </div>
      </div>
    `;
    bundlesDiv.appendChild(bundleDiv);
  });

  // Exibe o total de bundles, se necessário
  const totalBundles = data.totalBundles;
  console.log(`Total de bundles disponíveis: ${totalBundles}`);
}

export { displayBundles };
