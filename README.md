# TechTaco Public Network Registration

Formulario estático con branding Grupo Roca + LTH + TechTaco que guarda correo
y, opcionalmente, teléfono e IP pública en Firebase Firestore, muestra las
credenciales con un botón para copiar la contraseña y finaliza con una pantalla
de agradecimiento tras el copiado. También detecta visitas recurrentes para
avisar que el dispositivo ya se registró.
“Ya te puedes conectar a RedTechTaco_LTHROCA. La contraseña es TacoLTHR0!2025”.

## Puesta en marcha

1. Crea un proyecto Firebase y habilita Firestore (modo production o test).
2. Copia tus credenciales en `scripts/app.js` dentro de `firebaseConfig`.
3. Instala dependencias para poder ejecutar pruebas:

```bash
npm install
```

4. Sirve los archivos con cualquier servidor estático:

```bash
npx serve .
```

> También puedes abrir `index.html` directamente en el navegador mientras
> desarrollas, pero las APIs de Firebase requieren HTTPS para dominios
> personalizados.

## Estructura

- `index.html`: Marca principal, logos, formulario y pantallas de estado.
- `styles/main.css`: Estilos y tema.
- `scripts/app.js`: Lógica de validación y escritura en Firestore.
- `scripts/validation.js`: Helper reutilizable (navegador + Jest).
- `assets/`: Carpeta para colocar `logo-grupo-roca.png`, `logo-lth.png` y
  `logo-techtaco.png`.
- `PLANNING.md`, `USER-FLOW.md`, `TASK.md`: Documentación base del proyecto.

## Pruebas

Ejecuta las pruebas unitarias del validador con:

```bash
npm test
```

Las pruebas usan Jest y cubren:

- Caso exitoso con datos válidos.
- Caso borde con correos inválidos.
- Caso exitoso sin teléfono.
- Caso de error cuando el teléfono proporcionado no cumple el mínimo de dígitos.

## Notas adicionales

- El cliente usa `https://api.ipify.org?format=json` para obtener la IP
  pública; asegúrate de permitir esa solicitud saliente (HTTPS) o reemplázala
  por tu propio servicio.
- Recuerda actualizar tu aviso de privacidad si almacenarás IPs.

Integra este comando en tu pipeline de CI antes de publicar cambios.
