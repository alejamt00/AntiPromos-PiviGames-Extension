if (!window._postsBackup) window._postsBackup = [];

function borrarInstantaneoAlCargar() {
  chrome.storage.local.get("filtroActivo", (data) => {
    if (!data.filtroActivo) return;

    window._postsBackup = [];

    const elementos = document.querySelectorAll('section.gp-post-item');

    elementos.forEach(post => {
      const clases = Array.from(post.classList).map(c => c.toLowerCase());
      const debeFiltrarse = clases.includes('category-oferta') ||
                            clases.includes('category-promociones') ||
                            clases.includes('category-ofertas-adbuho');

      if (debeFiltrarse) {
        window._postsBackup.push({ html: post.outerHTML, parent: post.parentNode });
        post.remove(); // ⚡ Sin animación, pero sí con copia
      }
    });
  });
}


function aplicarFiltro() {
  const elementos = document.querySelectorAll('section.gp-post-item');
  window._postsBackup = [];

  elementos.forEach(post => {
    const clases = Array.from(post.classList).map(c => c.toLowerCase());
    const debeFiltrarse = clases.includes('category-oferta') ||
                          clases.includes('category-promociones') ||
                          clases.includes('category-ofertas-adbuho');

    if (debeFiltrarse) {
      post.style.transition = 'opacity 2s ease';
      post.style.opacity = '0';
      window._postsBackup.push({ html: post.outerHTML, parent: post.parentNode });
      setTimeout(() => post.remove(), 2000);
    }
  });
}

function restaurarFiltro() {
  if (!window._postsBackup.length) return;

  window._postsBackup.forEach(item => {
    const temp = document.createElement('div');
    temp.innerHTML = item.html;
    const restored = temp.firstElementChild;
    restored.style.opacity = '0';
    restored.style.transition = 'opacity 2s ease';
    item.parent.appendChild(restored);
    setTimeout(() => {
      restored.style.opacity = '1';
    }, 50);
  });

  setTimeout(() => {
    window._postsBackup = [];
  }, 2000);
}

// ✅ Ejecutar borrado instantáneo solo al cargar
borrarInstantaneoAlCargar();

// 🔁 Escuchar cambios desde el botón del popup
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.filtroActivo) {
    const nuevoValor = changes.filtroActivo.newValue;
    if (nuevoValor) aplicarFiltro();
    else restaurarFiltro();
  }
});
