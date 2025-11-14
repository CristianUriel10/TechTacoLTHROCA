/**
 * Validates registration fields for the Wi-Fi form.
 * @param {{ email: string, phone: string }} fields
 * @returns {{ valid: boolean, message?: string }}
 */
const validateFields = (fields) => {
  const trimmedEmail = fields.email?.trim();
  const trimmedPhone = fields.phone?.trim();

  const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
  if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
    return { valid: false, message: "Correo electrónico inválido." };
  }

  const numeralsOnly = trimmedPhone?.replace(/\D/g, "");
  if (!numeralsOnly || numeralsOnly.length < 8) {
    return { valid: false, message: "Número telefónico inválido." };
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
