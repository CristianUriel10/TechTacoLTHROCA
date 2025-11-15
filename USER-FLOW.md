# User Flow

1. Visitor lands on the registration page and sees a short description of the
   public network rules.
2. Visitor ingresa correo (obligatorio) y, de forma opcional, teléfono para
   seguimiento; acepta el aviso de privacidad implícito.
3. Visitor submits the form.
4. El cliente revisa en `localStorage` si el dispositivo ya completó el
   registro; si es así, se muestra el mensaje de “registro existente”.
5. Si no hay marca local, el formulario valida datos y guarda en Firestore
   (bloqueando correos duplicados).
6. Se muestran las credenciales Wi-Fi con un botón para copiar contraseña.
7. Al copiar, la interfaz cambia a una pantalla de agradecimiento y se marca el
   dispositivo.
8. En visitas futuras con la marca, solo se muestra el mensaje de agradecimiento.
