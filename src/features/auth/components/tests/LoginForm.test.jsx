import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoginForm from "../LoginForm";

describe("LoginForm", () => {
  const setup = (props = {}) => {
    const defaultProps = {
      data: { email: "", password: "" },
      errorMsg: "",
      onChange: vi.fn(),
      onSubmit: vi.fn((e) => e.preventDefault()),
    };
    return render(<LoginForm {...defaultProps} {...props} />);
  };

  it("renders email and password inputs and submit button", () => {
    setup();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  it("calls onChange when inputs change", () => {
    const handleChange = vi.fn();
    setup({ onChange: handleChange });

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { name: "email", value: "a@b.com" },
    });
    expect(handleChange).toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { name: "password", value: "secret" },
    });
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it("calls onSubmit when form is submitted via button click", async () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    setup({ onSubmit: handleSubmit });

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("displays error message when provided", () => {
    setup({ errorMsg: "Error here" });
    expect(screen.getByText("Error here")).toBeInTheDocument();
  });
});
