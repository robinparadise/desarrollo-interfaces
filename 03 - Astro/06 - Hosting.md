# Tutorial: Desplegar a Firebase Hosting

## Prerrequisitos

Antes de empezar, asegúrate de contar con lo siguiente:

- **Node.js y npm**: Instala la versión LTS desde [nodejs.org](https://nodejs.org/).
- **Firebase CLI**: Puedes instalarlo globalmente ejecutando:

  ```bash
  npm install -g firebase-tools
  ```

- **Cuenta de Firebase**: Si aún no tienes una, regístrate en [Firebase Console](https://console.firebase.google.com/).
- **Proyecto en Firebase**: Crea un nuevo proyecto en la consola de Firebase o utiliza uno existente.

---

## Pasos del Tutorial

### 1. Autenticarse en Firebase

Desde la terminal, ejecuta el siguiente comando para iniciar sesión en tu cuenta de Firebase:

```bash
firebase login
```

Sigue las instrucciones en el navegador para completar el proceso de autenticación.

### 2. Inicializar el proyecto Firebase

Dentro de la carpeta raíz de tu proyecto (donde se encuentra tu aplicación web que deseas desplegar), inicializa Firebase con el siguiente comando:

```bash
firebase init
```

Durante el proceso de inicialización, se te presentarán varias opciones:

1. **Selecciona los productos de Firebase:**  
   Utiliza las teclas de flecha para moverte y la barra espaciadora para seleccionar **Hosting**. También puedes seleccionar otros productos si los necesitas.

2. **Selecciona el proyecto Firebase:**  
   Cuando se te pregunte "¿Qué proyecto quieres usar?", selecciona el proyecto que creaste en Firebase Console.

3. **Define el directorio público:**  
   Se te solicitará ingresar el directorio que contendrá los archivos para hosting, por ejemplo, `public` o `build`.  
   - *Nota:* Asegúrate de que el directorio que indiques contenga tu archivo `index.html` (u otro archivo principal) que será el punto de entrada de tu sitio.

4. **Configuración de aplicaciones de una sola página (Single Page Applications):**  
   Si estás utilizando un framework como React, Angular o Vue, es posible que necesites configurar las redirecciones para URLs no encontradas. Responde **sí** a la pregunta "¿Configurar como una aplicación de una sola página (rewrite all URLs to /index.html)?" si es necesario.

5. **Sobre sobrescribir archivos:**  
   Si ya tienes un archivo `index.html` en el directorio, el CLI te preguntará si deseas sobrescribirlo. Lee la advertencia y procede según corresponda.

### 3. Construir tu proyecto (si aplica)

Si tu aplicación necesita ser compilada (por ejemplo, si estás utilizando un framework o un bundler), ejecuta el comando de construcción de tu proyecto. Por ejemplo, para una aplicación creada con React:

```bash
npm run build
```

Luego, asegúrate de que el directorio de salida (generalmente `build` o `dist`) coincida con el directorio configurado en el paso de inicialización (`firebase init`).

### 4. Desplegar a Firebase Hosting

Con la configuración completada y el proyecto listo, despliega tu aplicación ejecutando:

```bash
firebase deploy --only hosting
```

Este comando subirá los archivos del directorio configurado al hosting de Firebase. Al finalizar, recibirás una URL donde podrás ver tu sitio en línea.

### 5. Verificar el despliegue

Una vez completado el despliegue, abre la URL proporcionada en un navegador para asegurarte de que tu sitio se muestra correctamente.

---

## Consejos adicionales

- **Actualiza regularmente la CLI:**  
  Mantén el Firebase CLI actualizado ejecutando:

  ```bash
  npm install -g firebase-tools
  ```

- **Automatización de despliegue:**  
  Puedes integrar el comando `firebase deploy` en tu flujo de integración continua (CI) para automatizar despliegues.

- **Revisión de reglas y configuración:**  
  Si usas otros servicios de Firebase (por ejemplo, Firestore o Realtime Database), asegúrate de que las reglas y configuraciones estén actualizadas y sean seguras.

---
