import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_bfvg1jl";
const TEMPLATE_ID = "template_l11t24d";
const PUBLIC_KEY = "LsWgOJHwSPNzs9Tne";

export const sendOTPEmail = async (email, otp) => {
  const now = new Date();
  const expiration = new Date(now.getTime() + 15 * 60000);
  const time = expiration.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const templateParams = {
    email: email,
    passcode: otp,
    time: time,
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log("✅ OTP enviado a:", email);
  } catch (err) {
    console.error("❌ Error al enviar OTP:", err);
    throw err;
  }
};
