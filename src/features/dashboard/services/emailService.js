import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendOTPEmail = async (email, otp) => {
  const templateParams = {
    email: email,
    passcode: otp,
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  } catch (err) {
    console.error("Error al enviar OTP:", err);
    throw err;
  }
};
