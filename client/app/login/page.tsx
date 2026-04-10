"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import axios from 'axios';
import Link from 'next/link';
import { MessageCircle, Lock, Phone, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [errors, setErrors] = useState<{ phone?: string, password?: string }>({});
  const router = useRouter();
  const { setUser } = useStore();

  const validate = () => {
    const newErrors: { phone?: string, password?: string } = {};
    if (!phone.trim()) newErrors.phone = 'Required';
    else if (!/^\+?\d{8,15}$/.test(phone)) newErrors.phone = 'Invalid format';

    if (!password.trim()) newErrors.password = 'Required';
    else if (password.length < 6) newErrors.password = 'At least 6 chars';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/login', { phone, password });
      setUser(res.data.user, res.data.token);
      router.push('/');
    } catch {
      setGlobalError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1014] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden font-sans">

      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00a884] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#06cf9c] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>

      <div className="relative z-10 w-full max-w-[420px]">
        <div className="bg-[#111b21]/80 backdrop-blur-2xl rounded-[32px] p-8 sm:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-white/[0.05]">

          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00a884] to-[#007b61] rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,168,132,0.3)] ring-1 ring-white/10 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300 ease-out">
              <MessageCircle className="w-8 h-8 text-white stroke-[2]" />
            </div>

            <h1 className="text-[28px] font-bold text-white tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-[#8696a0] text-[15px] text-center max-w-[260px] leading-relaxed">
              Enter your credentials to continue to ChatterBox
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {globalError && (
              <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[14px] font-medium text-center flex items-center justify-center gap-2 transition-all">
                <Lock className="w-4 h-4 text-red-500" /> {globalError}
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[14px] font-medium text-[#8696a0]">
                  Phone Number
                </label>
                {errors.phone && <span className="text-[12px] text-red-400 font-medium px-2 py-0.5 bg-red-500/10 rounded-md">{errors.phone}</span>}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className={`w-5 h-5 transition-colors duration-300 ${errors.phone ? 'text-red-400' : 'text-[#8696a0] group-focus-within:text-[#00a884]'}`} />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                  }}
                  className={`w-full bg-[#202c33]/50 text-white text-[16px] pl-12 pr-4 py-4 rounded-2xl border ${errors.phone ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/5 hover:border-white/10 hover:bg-[#202c33]/80 focus:border-[#00a884] focus:bg-[#202c33] focus:shadow-[0_0_20px_rgba(0,168,132,0.15)]'} outline-none transition-all duration-300 placeholder:text-[#667781] font-medium shadow-inner`}
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[14px] font-medium text-[#8696a0]">
                  Password
                </label>
                <div className="flex items-center gap-3">
                  {errors.password && <span className="text-[12px] text-red-400 font-medium px-2 py-0.5 bg-red-500/10 rounded-md">{errors.password}</span>}
                  <Link href="#" className="text-[14px] text-[#00a884] hover:text-[#00bfa5] font-medium transition-colors">
                    Forgot?
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`w-5 h-5 transition-colors duration-300 ${errors.password ? 'text-red-400' : 'text-[#8696a0] group-focus-within:text-[#00a884]'}`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                  }}
                  className={`w-full bg-[#202c33]/50 text-white text-[16px] pl-12 pr-12 py-4 rounded-2xl border ${errors.password ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/5 hover:border-white/10 hover:bg-[#202c33]/80 focus:border-[#00a884] focus:bg-[#202c33] focus:shadow-[0_0_20px_rgba(0,168,132,0.15)]'} outline-none transition-all duration-300 placeholder:text-[#667781] font-medium shadow-inner`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#8696a0] hover:text-white transition-colors p-2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group w-full py-4 rounded-2xl bg-[#00a884] hover:bg-[#00bfa5] active:scale-[0.98] text-[#111b21] text-[16px] font-bold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_4px_14px_0_rgba(0,168,132,0.2)] hover:shadow-[0_6px_25px_rgba(0,168,132,0.35)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#111b21]" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-[15px] text-[#8696a0]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-white hover:text-[#00a884] font-semibold transition-colors decoration-[#00a884]/40 hover:underline underline-offset-4">
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
}