# HTML Elements

## 1.1 \<dialog\>

El elemento `<dialog>` representa una ventana de diálogo o cuadro de diálogo. Es un contenedor que se puede mostrar u ocultar mediante JavaScript.

```html
<dialog>
  <button autofocus onclick="this.parentNode.close()">Close</button>
  <p>This modal dialog has a groovy backdrop!</p>
</dialog>
<button onclick="this.querySelector('dialog').showModal()">
  Show the dialog
</button>
```

- **Example:**
<dialog>
  <button autofocus onclick="this.parentNode.close()">Close</button>
  <p>This modal dialog has a groovy backdrop!</p>
</dialog>
<button onclick="document.querySelector('dialog').showModal()">
  Show the dialog
</button>

## 1.2 \<details\>

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

- **Example:**

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

## 1.3 \<menu\>

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
- **Example:**
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

## 1.4 Popover

El elemento `<popover>` representa un cuadro de diálogo emergente que se muestra al hacer clic en un elemento.

```html
<button popovertarget="my-popover">Open Popover</button>
<div popover id="my-popover">Greetings, one and all!</div>
```
- **Example:**
<button popovertarget="my-popover">Open Popover</button>
<div popover id="my-popover">Greetings, one and all!</div>

### Popover anchor

El atributo `popovertarget` se puede usar para especificar un selector de destino para el popover.

```html
<button id="anchor_1" popovertarget="popover_1">Open popover</button>
<ul id="popover_1" popover>
  <li><a href="#">Item 0</a></li>
  <li><a href="#">Item 1</a></li>
  <li><a href="#">Item 2</a></li>
  <li><a href="#">Item 3</a></li>
</ul>
```
```css
[popover] {
  margin: 0;
  padding: 0;
  border: 0;
}
#anchor_1 {
  anchor-name: --anchor_1;
}
[popover] {
  border: 1px solid;
  padding: 1rem;
  position: absolute;
  width: 10rem;
  position-anchor: --anchor_1;
  top: anchor(--anchor_1 bottom); 
  left: anchor(--anchor_1 right); 
  
/*  inset-block-start: anchor(--anchor_1 bottom);*/
/*  inset-inline-start: anchor(--anchor_1 right);*/
}

```
- **Example:**

<style>
  [popover] {
    margin: 0;
    padding: 0;
    border: 0;
  }
  #anchor_1 {
    anchor-name: --anchor_1;
  }
  [popover] {
    border: 1px solid;
    padding: 1rem;
    position: absolute;
    width: 10rem;
    position-anchor: --anchor_1;
    top: anchor(--anchor_1 top); 
    left: anchor(--anchor_1 right); 
  /*  inset-block-start: anchor(--anchor_1 bottom);*/
  /*  inset-inline-start: anchor(--anchor_1 right);*/
  }
</style>
<button id="anchor_1" popovertarget="popover_1">Open popover</button>
<ul id="popover_1" popover>
  <li><a href="#">Item 0</a></li>
  <li><a href="#">Item 1</a></li>
  <li><a href="#">Item 2</a></li>
  <li><a href="#">Item 3</a></li>
</ul>

---

<div style="height:30vh"></div>