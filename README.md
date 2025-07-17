# 🛡️ AntiPromos PiviGames v1.3.0

Extensión para Microsoft Edge que elimina automáticamente las secciones promocionales de pivigames.blog.  
Incluye animaciones, sonidos personalizados (muteables) y la posibilidad de revertir al estado original.


<table style="border:none" align="center">
  <tr>
    <td align="center" width="50%">
      <img src="https://i.postimg.cc/FHstwL7z/image.png" alt="Popup en otras páginas" width="300"/><br/>
      <em>🔘 Popup en otras páginas</em>
    </td>
    <td align="center" width="50%">
      <img src="https://i.postimg.cc/J7DzdSSv/image.png" alt="Popup en pivigames.blog" width="300"/><br/>
      <em>🚫 Popup en pivigames.blog</em>
    </td>
  </tr>
</table>


 
## ⚙️ Instalación manual desde GitHub

1. Haz clic en el botón verde **"Code"** en la parte superior derecha del repositorio.
2. Selecciona **"Download ZIP"**.
3. Extrae el contenido del ZIP en una carpeta local.
4. Abre Microsoft Edge y navega a `edge://extensions/`.
5. Activa el **Modo desarrollador** (esquina inferior izquierda).
6. Haz clic en **"Cargar extensión sin empaquetar"**.
7. Selecciona la carpeta donde extrajiste los archivos.

✅ ¡Listo! Verás el icono de la extensión en la barra del navegador, listo para filtrar las promos de pivi a golpe de botón.


 

## 📁 Estructura del proyecto

```text
AntiPromosPiviGames/
├── popup/
│   ├── popup.html
│   └── popup.js
├── content/
│   └── content.js
├── assets/
│   ├── eliminar.mp3
│   ├── restaurar.mp3
│   └── icon.png
├── manifest.json
├── LICENSE
├── README.md
