import { otpStore } from '@/lib/otpStore';

export async function POST(req) {
  const { email, otp } = await req.json();

  console.log("🔍 Verifying:", email, otp);
  console.log("📦 OTP Store at verify:", otpStore);

  if (!otpStore.has(email)) {
    console.log("❌ OTP not found for:", email);
    return new Response(JSON.stringify({ error: "OTP not found or expired" }), { status: 404 });
  }

  const storedOtp = otpStore.get(email);
  if (storedOtp === otp) {
    otpStore.delete(email);
    console.log("✅ OTP verified and removed");
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  console.log("❌ OTP mismatch");
  return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 400 });
}
