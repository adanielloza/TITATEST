import { sendOTPEmail } from "../emailService";
import emailjs from "@emailjs/browser";

vi.mock("@emailjs/browser", () => ({
  __esModule: true,
  default: {
    send: vi.fn(),
  },
}));

describe("sendOTPEmail", () => {
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("envía el OTP con los parámetros correctos", async () => {
    emailjs.send.mockResolvedValueOnce({ status: 200 });

    const email = "test@example.com";
    const otp = "123456";

    await sendOTPEmail(email, otp);

    expect(emailjs.send).toHaveBeenCalledWith(
      SERVICE_ID,
      TEMPLATE_ID,
      { email, passcode: otp },
      PUBLIC_KEY
    );
  });

  it("lanza un error si emailjs falla", async () => {
    const error = new Error("fallo de red");
    emailjs.send.mockRejectedValueOnce(error);

    await expect(sendOTPEmail("fail@example.com", "999999")).rejects.toThrow(
      "fallo de red"
    );
  });

  it("ejecuta en menos de 100ms", async () => {
    emailjs.send.mockResolvedValueOnce({ status: 200 });

    const start = performance.now();
    await sendOTPEmail("tiempo@example.com", "000000");
    const duration = performance.now() - start;

    expect(duration).toBeLessThan(100);
  });
});
