# TechTaco Public Network Registration

Formulario estático que guarda registros en Firebase Firestore y revela la
contraseña de la red pública tras una inscripción exitosa.

## Puesta en marcha

1. Crea un proyecto Firebase y habilita Firestore (modo production o test).
2. Copia tus credenciales en `scripts/app.js` dentro de `firebaseConfig`.
3. Sirve los archivos con cualquier servidor estático:

```bash
npx serve .
```

> También puedes abrir `index.html` directamente en el navegador mientras
> desarrollas, pero las APIs de Firebase requieren HTTPS para dominios
> personalizados.

## Estructura

- `index.html`: Marca principal y formulario.
- `styles/main.css`: Estilos y tema.
- `scripts/app.js`: Lógica de validación y escritura en Firestore.
- `PLANNING.md`, `USER-FLOW.md`, `TASK.md`: Documentación base del proyecto.

## Pruebas

El repositorio aún no incluye configuración de Jest. Para cubrir validaciones
rápidamente, extrae `validateData` a un módulo y crea pruebas unitarias con
Jest + Testing Library. Ejecuta las pruebas como parte del flujo de CI antes de
desplegar cambios.

