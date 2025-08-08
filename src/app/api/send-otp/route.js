import nodemailer from 'nodemailer';
import { otpStore } from '@/lib/otpStore';

export async function POST(req) {
  const { email } = await req.json();

  console.log("Received email:", email);

  if (email !== "prajanya1717@gmail.com" && email !== "mishasood1234@gmail.com") {
    console.log("❌ Unauthorized email");
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);
  console.log("✅ Generated OTP:", otp);
  console.log("📦 OTP Store Now:", otpStore);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.OTP_EMAIL,
      pass: process.env.OTP_EMAIL_PASS, // ✅ corrected name
    },
  });

  try {
    await transporter.sendMail({
      from: `"Dumbo’s App 💖" <${process.env.OTP_EMAIL}>`,
      to: email,
      subject: "Your Birthday OTP 🎉",
      html: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`,
    });

    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    console.error("❌ Mail sending error:", err);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }
}

export function GET() {
  return new Response("GET not allowed", { status: 405 });
}
