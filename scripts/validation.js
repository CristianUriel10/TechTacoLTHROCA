/**
 * Validates registration fields for the Wi-Fi form.
 * @param {{ fullName: string, email: string, phone: string, termsAccepted: boolean }} fields
 * @returns {{ valid: boolean, message?: string }}
 */
const validateFields = (fields) => {
  const trimmedName = fields.fullName?.trim();
  const trimmedEmail = fields.email?.trim();
  const trimmedPhone = fields.phone?.trim();

  if (!trimmedName || trimmedName.length < 3) {
    return { valid: false, message: "Ingresa tu nombre completo." };
  }

  const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
  if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
    return { valid: false, message: "Correo electrónico inválido." };
  }

  const numeralsOnly = trimmedPhone?.replace(/\D/g, "");
  if (!numeralsOnly || numeralsOnly.length < 8) {
    return { valid: false, message: "Número telefónico inválido." };
  }

  if (!fields.termsAccepted) {
    return { valid: false, message: "Debes aceptar los términos de uso." };
  }

  return { valid: true };
};

if (typeof window !== "undefined") {
  window.validateFields = validateFields;
}

// CommonJS export for Jest.
if (typeof module !== "undefined") {
  module.exports = { validateFields };
}

