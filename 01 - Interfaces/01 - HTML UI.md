# HTML Elements

## <dialog>

El elemento `<dialog>` representa una ventana de diálogo o cuadro de diálogo. Es un contenedor que se puede mostrar u ocultar mediante JavaScript.

```html
<dialog>
  <button autofocus>Close</button>
  <p>This modal dialog has a groovy backdrop!</p>
</dialog>
<button onclick="this.querySelector('dialog').showModal()">
  Show the dialog
</button>
```

## <details>

El elemento `<details>` representa un widget de control de divulgación desde el que el usuario puede obtener información adicional o controles interactivos.

```html
<style>
  details {
    border: 1px solid #aaa;
    border-radius: 4px;
    padding: 0.5em 0.5em 0;
  }

  summary {
    font-weight: bold;
    margin: -0.5em -0.5em 0;
    padding: 0.5em;
  }

  details[open] {
    padding: 0.5em;
  }

  details[open] summary {
    border-bottom: 1px solid #aaa;
    margin-bottom: 0.5em;
  }
</style>
<details>
  <summary>Details</summary>
  Something small enough to escape casual notice.
</details>
```

## <menu>

El elemento `<menu>` representa un grupo de comandos que un usuario puede invocar o activar. Este elemento se puede usar para crear menús contextuales y menús de herramientas.

```html
<style>
  menu {
    list-style-type: none;
    display: flex;
    padding: 0;
    margin-bottom: 0;
    gap: 1em;
  }
</style>
<menu type="toolbar">
  <button>Save</button>
  <button>Open</button>
  <button>Close</button>
</menu>
```

## popover

El elemento `<popover>` representa un cuadro de diálogo emergente que se muestra al hacer clic en un elemento.

```html
<button popovertarget="my-popover">Open Popover</button>

<div popover id="my-popover">Greetings, one and all!</div>
```
