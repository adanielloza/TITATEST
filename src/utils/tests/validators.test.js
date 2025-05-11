import { describe, it, expect } from "vitest";
import { isValidEmail, isValidPhone } from "../validators";

describe("isValidEmail", () => {
  it("valida correos electrónicos válidos", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("user.name123@mail.co")).toBe(true);
    expect(isValidEmail("john_doe@mail-domain.com")).toBe(true);
  });

  it("rechaza correos electrónicos inválidos", () => {
    expect(isValidEmail("test@.com")).toBe(false);
    expect(isValidEmail("@example.com")).toBe(false);
    expect(isValidEmail("user@com")).toBe(false);
    expect(isValidEmail("user@@domain.com")).toBe(false);
    expect(isValidEmail("userdomain.com")).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("valida teléfonos de 10 dígitos", () => {
    expect(isValidPhone("0987654321")).toBe(true);
    expect(isValidPhone("1234567890")).toBe(true);
  });

  it("rechaza teléfonos inválidos", () => {
    expect(isValidPhone("123456789")).toBe(false);
    expect(isValidPhone("12345678901")).toBe(false);
    expect(isValidPhone("12345abcde")).toBe(false);
    expect(isValidPhone("")).toBe(false);
  });
});
