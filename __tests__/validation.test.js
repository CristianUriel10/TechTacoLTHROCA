const { validateFields } = require("../scripts/validation.js");

describe("validateFields", () => {
  it("accepts a valid payload", () => {
    const result = validateFields({
      email: "ana@example.com",
      phone: "+52 55 1234 5678",
    });

    expect(result).toEqual({ valid: true });
  });

  it("accepts submissions without phone", () => {
    const result = validateFields({
      email: "ana@example.com",
      phone: "",
    });

    expect(result).toEqual({ valid: true });
  });

  it("rejects malformed emails", () => {
    const result = validateFields({
      email: "ana@",
      phone: "5512345678",
    });

    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/correo/i);
  });

  it("rejects short phone numbers", () => {
    const result = validateFields({
      email: "ana@example.com",
      phone: "123",
    });

    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/telefónico/i);
  });
});
