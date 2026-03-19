// components/home/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-white  sticky top-0 z-50">
      {/* SAĞ: Logo */}
      <div className="flex-1 flex justify-start">
        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
          <img
            src="/gemi1.svg"
            alt="Shiplytics Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      {/* ORTA: Şirket İsmi */}
      <div className="flex-1 text-center">
        <span className="text-xl font-bold tracking-widest text-slate-800 uppercase">
          SHIPLYTICS
        </span>
      </div>
      {/* SOL: Login Butonu */}
      <div className="flex-1 flex justify-end">
        <Link
          href="/login"
          className="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition shadow-lg inline-block"
        >
          Giriş Yap
        </Link>
      </div>
    </nav>
  );
}
