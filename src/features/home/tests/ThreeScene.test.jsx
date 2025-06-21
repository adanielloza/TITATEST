import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ThreeScene from "../components/ThreeScene";
import { useMediaQuery } from "react-responsive";

vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
  useFrame: vi.fn(),
  useLoader: vi.fn().mockReturnValue({ scene: {} }),
  useThree: vi.fn().mockReturnValue({
    camera: {},
    gl: { domElement: {} },
  }),
}));

vi.mock("three/examples/jsm/loaders/GLTFLoader", () => ({
  GLTFLoader: vi.fn(),
}));

vi.mock("three/examples/jsm/controls/OrbitControls", () => {
  return {
    OrbitControls: vi.fn().mockImplementation(() => ({
      enableZoom: false,
      enablePan: false,
      dispose: vi.fn(),
      update: vi.fn(),
    })),
  };
});

vi.mock("react-responsive", () => ({
  useMediaQuery: vi.fn(),
}));

describe("ThreeScene Component", () => {
  it("renders Canvas correctly", () => {
    useMediaQuery.mockReturnValue(false);

    render(<ThreeScene />);

    expect(screen.getByTestId("canvas")).toBeInTheDocument();
  });

  it("adjusts scale based on viewport size", () => {
    useMediaQuery.mockReturnValue(true);

    render(<ThreeScene />);

    expect(useMediaQuery).toHaveBeenCalledWith({ query: "(max-width: 768px)" });
  });
});
