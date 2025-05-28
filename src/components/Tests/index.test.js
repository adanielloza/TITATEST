import * as components from "../index";

describe("components barrel file (index.js)", () => {
  it("debe exportar todos los componentes esperados", () => {
    const expectedExports = [
      "Button",
      "DateInput",
      "Dropdown",
      "Input",
      "Loader",
      "Modal",
      "Spinner",
      "TextArea",
      "Controls",
      "DataTable",
      "Pagination",
      "TableBody",
      "TableHeader",
    ];

    expectedExports.forEach((key) => {
      expect(components[key]).toBeDefined();
      expect(typeof components[key]).toBe("function");
    });
  });
});
