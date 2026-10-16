import React from 'react';
import { Anchor, Compass, Database, BarChart3, FileText, CalendarCheck, Download, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'website' | 'database' | 'dashboard' | 'report';
  setActiveTab: (tab: 'website' | 'database' | 'dashboard' | 'report') => void;
  onOpenBooking: () => void;
  lang: 'TH' | 'EN';
  setLang: (lang: 'TH' | 'EN') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  lang,
  setLang,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#071527]/95 backdrop-blur-md border-b border-[#C9A45C]/25 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#0B1F3A] via-[#0E2A4E] to-[#0B1F3A] py-1.5 px-4 text-xs text-center border-b border-[#C9A45C]/15 text-[#DFBE7E] flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C9A45C] animate-pulse" />
        <span>
          {lang === 'TH'
            ? 'MARINA VALÉRIELLE — การเดินทางส่วนตัวระดับ Ultra-Luxury บนเรือยอร์ชและเกาะส่วนตัว'
            : 'MARINA VALÉRIELLE — Ultra-Luxury Private Yacht Charters & Exclusive Island Escapes'}
        </span>
        <span className="hidden md:inline text-white/40">|</span>
        <span className="hidden md:inline text-white/70">
          {lang === 'TH' ? 'ระบบจำลองธุรกิจและฐานข้อมูลพร้อม Dashboard 2026' : 'Business Simulation & Integrated Executive Dashboard'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('website')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full border border-[#C9A45C] bg-[#0B1F3A] flex items-center justify-center shadow-lg shadow-[#C9A45C]/15 group-hover:scale-105 transition-transform">
              <Anchor className="w-5 h-5 text-[#C9A45C]" />
            </div>
            <div>
              <div className="font-display-luxury text-lg sm:text-xl font-bold tracking-[0.2em] text-white flex items-center gap-1.5">
                MARINA <span className="gold-gradient-text">VALÉRIELLE</span>
              </div>
              <div className="text-[9px] uppercase tracking-[0.28em] text-[#C9A45C]/80 font-light">
                Private Yachts · Private Islands
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 bg-[#0B1F3A]/80 border border-[#C9A45C]/20 rounded-full">
            <button
              onClick={() => setActiveTab('website')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                activeTab === 'website'
                  ? 'bg-gradient-to-r from-[#247DA5] to-[#1a5b78] text-white shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{lang === 'TH' ? 'หน้าหลักเว็บไซต์' : 'The Experience'}</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                activeTab === 'database'
                  ? 'bg-gradient-to-r from-[#C9A45C] to-[#A48039] text-[#0B1F3A] font-semibold shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>{lang === 'TH' ? 'ฐานข้อมูล (Sheets)' : 'Database'}</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-[#C9A45C] to-[#A48039] text-[#0B1F3A] font-semibold shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{lang === 'TH' ? 'Dashboard การเงิน' : 'Dashboard'}</span>
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                activeTab === 'report'
                  ? 'bg-gradient-to-r from-[#C9A45C] to-[#A48039] text-[#0B1F3A] font-semibold shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{lang === 'TH' ? 'รายงานธุรกิจ' : 'Report'}</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'TH' ? 'EN' : 'TH')}
              className="px-2.5 py-1.5 rounded border border-[#C9A45C]/40 text-xs font-semibold text-[#DFBE7E] hover:bg-[#C9A45C]/15 transition-colors"
              title="Toggle Language"
            >
              {lang}
            </button>

            {/* Download Zip */}
            <a
              href="/marina_valerielle.zip"
              download="marina_valerielle.zip"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#C9A45C]/50 text-xs text-[#DFBE7E] hover:bg-[#C9A45C]/20 transition-all font-medium"
              title="ดาวน์โหลดไฟล์โค้ดโปรเจกต์ ZIP"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ZIP</span>
            </a>

            {/* Book Escape CTA */}
            <button
              onClick={onOpenBooking}
              className="gold-btn px-4 sm:px-5 py-2.5 rounded-full text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>{lang === 'TH' ? 'จองการเดินทาง' : 'Book Escape'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center justify-around py-2.5 border-t border-[#C9A45C]/15 text-[11px] overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('website')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
              activeTab === 'website' ? 'bg-[#247DA5] text-white font-medium' : 'text-white/70'
            }`}
          >
            {lang === 'TH' ? 'หน้าหลัก' : 'Website'}
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
              activeTab === 'database' ? 'bg-[#C9A45C] text-[#0B1F3A] font-semibold' : 'text-white/70'
            }`}
          >
            {lang === 'TH' ? 'ฐานข้อมูล' : 'Database'}
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
              activeTab === 'dashboard' ? 'bg-[#C9A45C] text-[#0B1F3A] font-semibold' : 'text-white/70'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
              activeTab === 'report' ? 'bg-[#C9A45C] text-[#0B1F3A] font-semibold' : 'text-white/70'
            }`}
          >
            {lang === 'TH' ? 'รายงานสรุป' : 'Report'}
          </button>
        </div>
      </div>
    </header>
  );
};
