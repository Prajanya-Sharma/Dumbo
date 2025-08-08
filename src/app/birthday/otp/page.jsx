'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OTPPage() {
  const [step, setStep] = useState('email');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const email = 'prajanya1717@gmail.com'; // or 'mishasood1234@gmail.com'

  const sendOTP = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStep('otp');
        setMessage('OTP sent to your email 💌');
      } else {
        setMessage(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      console.error("Client send error:", err);
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/birthday/game');
      } else {
        setMessage(data.error || 'Incorrect OTP');
      }
    } catch (err) {
      console.error("Client verify error:", err);
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-pink-700 mb-4">🔐 OTP Access</h1>

        {step === 'email' && (
          <>
            <p className="text-sm text-rose-500 mb-1">OTP will be sent to:</p>
            <p className="font-semibold text-md mb-4">{email}</p>
            <button
              onClick={sendOTP}
              disabled={loading}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 rounded-xl border mt-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <button
              onClick={verifyOTP}
              disabled={loading}
              className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        )}

        {message && <p className="mt-4 text-sm text-rose-700">{message}</p>}
      </div>
    </div>
  );
}
