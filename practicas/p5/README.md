### Porfolio con GitHub Pages (raiz de tu repo)

#### Objetivo:
Aprender a configurar una página web en GitHub Pages alojada en la raíz de tu cuenta de GitHub, es decir, con la URL `https://TU_USUARIO.github.io`.

#### Pasos:

1. **Crear un repositorio en GitHub:**
   - Ingresa a tu cuenta de GitHub.
   - Crea un nuevo repositorio con el nombre **`TU_USUARIO.github.io`**, donde `TU_USUARIO` es tu nombre de usuario en GitHub. Este nombre es importante, ya que GitHub Pages utiliza este formato para la URL de la página.
   - Marca la opción **"Initialize this repository with a README"**.

2. **Clonar el repositorio en tu máquina local:**
   - Abre tu terminal o línea de comandos.
   - Usa el siguiente comando para clonar el repositorio:
     ```bash
     git clone https://github.com/TU_USUARIO/TU_USUARIO.github.io.git
     ```
   - Entra en la carpeta del repositorio:
     ```bash
     cd TU_USUARIO.github.io
     ```

3. **Crear el archivo `index.html`:**
   - Crea un archivo `index.html` en la raíz del repositorio con el siguiente contenido básico:
     ```html
     <!DOCTYPE html>
     <html lang="es">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Mi Página Web</title>
     </head>
     <body>
       <h1>¡Bienvenido a mi página web!</h1>
       <p>Esta es una página de prueba alojada en GitHub Pages.</p>
     </body>
     </html>
     ```

4. **Subir los cambios a GitHub:**
   - Agrega el archivo `index.html` al repositorio:
     ```bash
     git add index.html
     ```
   - Haz un commit con un mensaje adecuado:
     ```bash
     git commit -m "Agrega archivo index.html"
     ```
   - Sube los cambios a GitHub:
     ```bash
     git push origin main
     ```

5. **Configurar GitHub Pages:**
   - Ve a la página de tu repositorio en GitHub.
   - Haz clic en **Settings** (Configuración).
   - En el menú lateral izquierdo, busca la sección **Pages**.
   - En **Source**, selecciona `main` como la rama y **/ (root)** como la carpeta.
   - Haz clic en **Save**.

6. **Verifica tu página web:**
   - Después de unos minutos, tu página estará disponible en la URL: `https://TU_USUARIO.github.io/`.
   - Accede a esta URL para ver tu página web en línea.

---

### Ejercicio:
- Personaliza el contenido de tu página `index.html` añadiendo imágenes, enlaces o más secciones y enlaces a tus proyecto de la asignatura de DAM (prácticas).
- Añade un archivo `README.md` en tu repositorio con detalles sobre tu página web.
- Usa tailwindcss para darle estilo a tu página web.
- Añade un enlace a tu página web en tu perfil de GitHub.
- Comparte la URL el correo: `robinchogiles@gmail.com`.

---
