import { ReactNode } from "react";

export default function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-focused simple header */}
      <header className="bg-white border-b sticky top-0 z-10 p-4 shadow-sm">
        <h1 className="text-lg font-bold text-center">Gemi Personel Girişi</h1>
      </header>
      
      <main className="p-4 safe-area-bottom">
        {children}
      </main>
    </div>
  );
}
