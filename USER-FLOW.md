# User Flow

1. Visitor lands on the registration page and sees a short description of the
   public network rules.
2. Visitor ingresa correo (obligatorio) y, de forma opcional, teléfono para
   seguimiento; acepta el aviso de privacidad implícito.
3. Visitor submits the form.
4. El formulario valida datos y guarda en Firestore (bloqueando correos
   duplicados).
5. Se muestran las credenciales Wi-Fi con un botón para copiar contraseña y el
   formulario se oculta para evitar reenvíos.
6. Al copiar, el usuario recibe una confirmación rápida.
7. Si el correo ya existía, solo se muestra un mensaje de aviso y no se crea un
   registro nuevo.
