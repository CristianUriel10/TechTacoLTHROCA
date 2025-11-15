const { validateFields } = require("../scripts/validation.js");

describe("validateFields", () => {
  it("accepts a valid payload", () => {
    const result = validateFields({
      email: "ana@example.com",
      phone: "55 1234 5678",
      marketingAccepted: true,
    });

    expect(result).toEqual({ valid: true });
  });

  it("accepts submissions without phone", () => {
    const result = validateFields({
      email: "ana@example.com",
      phone: "",
      marketingAccepted: true,
    });

    expect(result).toEqual({ valid: true });
  });

  it("rejects malformed emails", () => {
    const result = validateFields({
      email: "ana@",
      phone: "5512345678",
      marketingAccepted: true,
    });

    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/correo/i);
  });

  it("rejects short phone numbers", () => {
    const result = validateFields({
      email: "ana@example.com",
      phone: "123",
      marketingAccepted: true,
    });

    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/telefónico/i);
  });

  it("rejects when marketing opt-in is not accepted", () => {
    const result = validateFields({
      email: "ana@example.com",
      phone: "55 1234 5678",
      marketingAccepted: false,
    });

    expect(result.valid).toBe(false);
    expect(result.message).toMatch(/condiciones/i);
  });
});
