document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle");
  const statusText = document.getElementById("estado");
  const sonidoEliminar = document.getElementById("sonidoEliminar");
  const sonidoRestaurar = document.getElementById("sonidoRestaurar");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabURL = tabs[0]?.url ?? "";

    if (!tabURL.includes("pivigames.blog")) {
      toggleButton.style.display = "none";
      statusText.textContent = "⛔ Esta extensión solo funciona en pivigames.blog";
      statusText.style.display = "block";
      return;
    }

    chrome.storage.local.get("filtroActivo", (data) => {
      const activo = data.filtroActivo ?? false;
      actualizarBoton(toggleButton, activo);
      statusText.style.display = "none";
    });

    toggleButton.addEventListener("click", () => {
      chrome.storage.local.get("filtroActivo", (data) => {
        const nuevoEstado = !data.filtroActivo;
        chrome.storage.local.set({ filtroActivo: nuevoEstado });
        ejecutarFiltro(nuevoEstado);
        actualizarBoton(toggleButton, nuevoEstado);
        if (nuevoEstado) sonidoEliminar?.play();
        else sonidoRestaurar?.play();
      });
    });
  });
});

function actualizarBoton(boton, activo) {
  if (activo) {
    boton.textContent = "Desactivar filtro";
    boton.classList.remove("inactive");
    boton.classList.add("active");
  } else {
    boton.textContent = "Activar filtro";
    boton.classList.remove("active");
    boton.classList.add("inactive");
  }
}

function ejecutarFiltro(activar) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]?.id) return;
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (activar) => {
        if (!window._postsBackup) window._postsBackup = [];

        if (activar) {
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
        } else {
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
          window._postsBackup = [];
        }
      },
      args: [activar]
    });
  });
}
