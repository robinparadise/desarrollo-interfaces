# 07 - Github Actions

```yaml
name: My Build

on:
  workflow_dispatch:
  push:
    paths:
      - 'src/**'
    branches:
      - main

permissions:
  contents: read
  actions: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2
        with:
          clean: false

      - name: Use Node.js 20
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Set up NPM authentication
        run: |
          echo "//registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}" > ~/.npmrc
          cat ~/.npmrc

      - name: Install Dependencies
        run: yarn install --pure-lockfile --ignore-scripts

      - name: Build Web App
        run: yarn build

      - name: Set up Firebase Service Account
        run: echo '${{ secrets.FIREBASE_SERVICE_ACCOUNT_MYPROJECT }}' > app/web/firebase-service-account.json

      - name: Deploy to Firebase Hosting
        env:
          SITE: 'https://myproject.web.app'
        run: |
          cd app/web
          export GOOGLE_APPLICATION_CREDENTIALS=$PWD/firebase-service-account.json
          npx firebase use --add myproject
          npx firebase target:apply hosting myproject myproject
          npx firebase experiments:enable webframeworks
          yarn deploy:ci
```

---

## Explicación del workflow

1. **Evento disparador (`on`):**  
   El flujo se inicia manualmente con `workflow_dispatch` o al realizar un `push` a la rama `main` en las rutas especificadas:
   - `app/web/**`: Carpeta que contiene la aplicación web.
   - `shared/components/**`: Carpeta de componentes compartidos.

2. **Permisos:**  
   Se configuran los permisos necesarios para que la acción pueda leer el contenido del repositorio y escribir acciones.

3. **Jobs:**  
   El trabajo se ejecuta en un runner de `ubuntu-latest` y se compone de los siguientes pasos:

   - **Checkout del repositorio:**  
     Se utiliza la acción `actions/checkout@v2` para obtener el código fuente.

   - **Setup de Node.js:**  
     Se usa `actions/setup-node@v3` para establecer la versión 20 de Node.js.

   - **Autenticación para NPM:**  
     Se configura el token de autenticación (`NPM_TOKEN`) almacenado en los secrets del repositorio para poder instalar paquetes privados, si es el caso.

   - **Instalación de dependencias:**  
     Se ejecuta `yarn install` con las opciones `--pure-lockfile` e `--ignore-scripts` para asegurar una instalación limpia.

   - **Construcción de componentes compartidos y aplicación web:**  
     Se navega a los directorios correspondientes y se ejecuta el comando de build (`yarn build`).

   - **Configuración de la cuenta de servicio de Firebase:**  
     Se guarda el contenido del secret `FIREBASE_SERVICE_ACCOUNT_MYPROJECT` en un archivo JSON que se utilizará para la autenticación con Firebase.

   - **Despliegue en Firebase Hosting:**  
     Se setea la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS` para Firebase CLI, se selecciona el proyecto a desplegar usando `npx firebase use --add`, se aplica el target de hosting y se activa la experimentación para web frameworks. Finalmente se ejecuta el script de despliegue configurado en el package.json (`yarn deploy:ci`).

---

## Consideraciones adicionales

- **Secrets:**  
  Asegúrate de configurar en el repositorio los siguientes secrets:
  - `NPM_TOKEN`: Token para autenticación con el registro NPM.
  - `FIREBASE_SERVICE_ACCOUNT_MYPROJECT`: Credenciales JSON de la cuenta de servicio de Firebase.
  - `PUBLIC_STORAGE_BUCKET_URI`: URI del bucket de almacenamiento público, si es que tu proyecto lo requiere.

- **Scripts de despliegue:**  
  Revisa en el archivo `package.json` que el script `deploy:ci` contenga la lógica adecuada para ejecutar el despliegue con Firebase CLI, por ejemplo:
  ```json
  "scripts": {
    "deploy:ci": "firebase deploy --only hosting"
  }
  ```

- **Rutas y directorios:**  
  Ajusta las rutas y nombres de carpetas (`app/web`, `shared/components`, etc.) de acuerdo a la estructura de tu proyecto.

