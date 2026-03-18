"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Anchor, ArrowRight, Loader2, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Giriş yapılamadı.");
      } else {
        router.push(data.redirect || "/dashboard");
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Box - Brand / Visual */}
      <div className="hidden lg:flex flex-col justify-between bg-blue-900 text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 opacity-90 z-0"></div>
        {/* Subtle decorative circles */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 flex items-center space-x-3">
          <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
            <Anchor className="w-8 h-8 text-blue-200" />
          </div>
          <span className="text-3xl font-bold tracking-tight">Shiplytics</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Şirket Verilerini
            <br />
            Güvenle Yönetin
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed">
            Tüm gemilerinizden gelen canlı raporları tek bir ekranda, güvenle ve
            kolayca inceleyin.
          </p>
        </div>

        <div className="relative z-10 flex items-center space-x-4 text-blue-300/80 text-sm">
          <span>&copy; 2026 Shiplytics</span>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">
            Gizlilik Politikası
          </a>
        </div>
      </div>

      {/* Right Box - Form */}
      <div className="flex items-center justify-center p-8 bg-slate-50 relative">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 relative z-10 backdrop-blur-xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
              Hoş Geldiniz
            </h2>
            <p className="mt-2 text-slate-500">
              Şirket paneline erişmek için giriş yapın
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="ornek@sirketiniz.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-slate-700">
                  Şifre
                </label>
                {/* <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Şifremi Unuttum?</a> */}
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-700"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 mt-2 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Giriş Yap
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
