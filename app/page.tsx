import Header from "@/components/home/Header";
import Head from "@/components/home/Head";
import WhatWeDo from "@/components/home/WhatWeDo";
import Footer from "@/components/home/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <Head />
      <WhatWeDo />
      {/* HowItWorks içeriğini de WhatWeDo benzeri bir yapıyla buraya ekleyebilirsin */}
      <Footer />
    </main>
  );
}
