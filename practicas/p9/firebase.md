# gitignore

ignora el archivo de `firebase-debug.log`
  
  ```txt
  firebase-debug.log
  ```
# firebase hosting
A continuación te presento una guía paso a paso para **desplegar** (o _hostear_) tu aplicación web en **Firebase Hosting** usando el comando `firebase init`. Este tutorial asume que ya tienes una cuenta de **Firebase** y un proyecto creado en la [Consola de Firebase](https://console.firebase.google.com/). Si todavía no lo has hecho, asegúrate de crear un proyecto antes de continuar.

---

## **1. Instala la CLI de Firebase**

Primero, necesitas la **Firebase CLI** (Command Line Interface) para interactuar con los servicios de Firebase desde tu terminal. Si no la tienes instalada, ejecuta:

```bash
npm install -g firebase-tools
```

> **Nota**: Asegúrate de tener **Node.js** y **npm** instalados en tu sistema.

---

## **2. Inicia sesión en Firebase**

Para que la CLI pueda conectarse a tu cuenta de Firebase, inicia sesión con:

```bash
firebase login
```

Te abrirá una ventana en el navegador para que autorices a la CLI a usar tu cuenta de Google vinculada a Firebase.

---

## **3. Dirígete a tu proyecto local**

En tu terminal, ve a la carpeta raíz del proyecto que desees desplegar. Por ejemplo, si tu proyecto se encuentra en `~/mis-proyectos/mi-app`, ejecuta:

```bash
cd ~/mis-proyectos/mi-app
```

---

## **4. Inicializa Firebase en tu proyecto (`firebase init`)**

Ejecuta:

```bash
firebase init
```

Se abrirá un **asistente interactivo** que te guiará en la configuración. Presta atención a las preguntas:



1. **¿Qué características deseas configurar?**  
   Selecciona con la barra espaciadora la opción **Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys**.  
   Presiona **Enter** para continuar.
```cmd
? Which Firebase features do you want to set up for this directory? Press Space to select features, then 
Enter to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert selection, and 
<enter> to proceed)
 ◯ Genkit: Setup a new Genkit project with Firebase
 ◯ Functions: Configure a Cloud Functions directory and its files
 ◯ App Hosting: Configure an apphosting.yaml file for App Hosting
❯◉ Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
 ◯ Storage: Configure a security rules file for Cloud Storage
 ◯ Emulators: Set up local emulators for Firebase products
 ◯ Remote Config: Configure a template file for Remote Config
```

 2. **¿Qué proyecto de Firebase quieres usar?**  
    Selecciona el proyecto que creaste en la Consola de Firebase.  
    Si no aparece, asegúrate de haber iniciado sesión correctamente con `firebase login`.

```cmd
 === Hosting Setup
 ? Detected an existing Astro codebase in the current directory, should we use this? Yes
```
```cmd
 ? In which region would you like to host server-side content, if applicable? 
   us-central1 (Iowa) 
   us-east1 (South Carolina) 
   us-west1 (Oregon) 
   asia-east1 (Taiwan) 
 ❯ europe-west1 (Belgium) 
 ```
 3. **Github action**
 ```cmd
 ? Set up automatic builds and deploys with GitHub? (y/N) y
 ```

 4. **Introduce tu repositorio usuario/repositorio**

 ```cmd
 ? For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository) 
 robinparadise/squalid-chasm

 ✔  Created service account github-action-920493889 with Firebase Hosting admin permissions.
 ✔  Uploaded service account JSON to GitHub as secret FIREBASE_SERVICE_ACCOUNT_EPHEMERA_DAM.
 i  You can manage your secrets at https://github.com/robinparadise/squalid-chasm/settings/secrets.

 ? Set up the workflow to run a build script before every deploy? Yes
 ? What script should be run before every deploy? npm run build
 ? GitHub workflow file for PR previews exists. Overwrite? firebase-hosting-pull-request.yml Y
 ? Set up automatic deployment to your site's live channel when a PR is merged? (Y/n) Y

 ✔  Firebase initialization complete!
 ```

Al finalizar, la CLI creará algunos archivos de configuración como:  
- `.firebaserc`  
- `firebase.json`  
- (Opcionalmente) `.github/workflows/firebase-hosting-pull-request.yml` si elegiste integrar con GitHub Actions.

---

