# Fogón Criollo · Interfaz web responsiva

Guía 4: Desarrollo de una interfaz web responsiva.

Sitio web de un restaurante ficticio de cocina colombiana. Está hecho con HTML5 semántico, CSS3 (Mobile First, Media Queries, Flexbox y CSS Grid) y JavaScript sin librerías.

## Cómo verlo

Abre `index.html` en el navegador. Para probar otros tamaños en Chrome: `F12` y luego `Ctrl + Shift + M`.

## Estructura

```
index.html        Estructura principal de la página
css/styles.css    Estilos (Mobile First + Media Queries a 600, 900 y 1200 px)
js/main.js        Menú adaptable, filtro del menú, tarjetas desplegables, validación del formulario
img/              Ilustraciones SVG originales
docs/             Documentación PDF y capturas
```

## Interacción

- Menú hamburguesa en pantallas menores de 900 px
- Filtro de platos por categoría
- Tarjetas con detalle desplegable
- Formulario de reservas con validación
- Preguntas frecuentes desplegables (`<details>`)

## Entregables

- `docs/Documentacion.pdf`: documentación del desarrollo
- `docs/capturas/`: evidencias en los tres tamaños
