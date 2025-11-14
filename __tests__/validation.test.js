const { validateFields } = require("../scripts/validation.js");

describe("validateFields", () => {
  it("accepts a valid payload", () => {
    const result = validateFields({
      fullName: "Ana Martínez",
      email: "ana@example.com",
      phone: "+52 55 1234 5678",
      termsAccepted: true
    });

    expect(result).toEqual({ valid: true });
  });

  it("rejects malformed emails", () => {
    const result = validateFields({
      fullName: "Ana Martínez",
      email: "ana@",
      phone: "5512345678",
      termsAccepted: true
    });

    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/correo/i);
  });

  it("rejects submissions without accepted terms", () => {
    const result = validateFields({
      fullName: "Ana Martínez",
      email: "ana@example.com",
      phone: "5512345678",
      termsAccepted: false
    });

    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/términos/i);
  });
});
