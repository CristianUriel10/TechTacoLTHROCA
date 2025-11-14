# User Flow

1. Visitor lands on the registration page and sees a short description of the
   public network rules.
2. Visitor ingresa correo (obligatorio) y, de forma opcional, teléfono para
   seguimiento; acepta el aviso de privacidad implícito.
3. Visitor submits the form.
4. El cliente obtiene una IP pública ligera y verifica si ya existe un registro
   previo; si es así se muestra un mensaje de “registro existente”.
5. Si no hay registro previo, el formulario valida datos y guarda en Firestore.
6. Se muestran las credenciales Wi-Fi con un botón para copiar contraseña.
7. Al copiar, la interfaz cambia a una pantalla de agradecimiento.
8. En caso de error, un mensaje indica que intente nuevamente.
