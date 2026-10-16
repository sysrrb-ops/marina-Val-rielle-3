import React, { useState } from 'react';
import {
  Ship,
  Palmtree,
  Sparkles,
  Briefcase,
  Calendar,
  Compass,
  Users,
  Clock,
  ShieldCheck,
  ChevronRight,
  PhoneCall,
  Mail,
  MapPin,
  CheckCircle2,
  Award,
  Wine,
  Waves,
  Eye,
} from 'lucide-react';
import { ServiceItem } from '../data/marinaData';

interface WebsiteViewProps {
  services: ServiceItem[];
  onSelectServiceToBook: (service: ServiceItem) => void;
  onOpenBooking: () => void;
  lang: 'TH' | 'EN';
}

export const WebsiteView: React.FC<WebsiteViewProps> = ({
  services,
  onSelectServiceToBook,
  onOpenBooking,
  lang,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedService, setExpandedService] = useState<ServiceItem | null>(null);

  const categories = ['All', 'Yacht Charter', 'Sunset Cruise', 'Private Island', 'Corporate', 'Experiences'];

  const filteredServices =
    selectedCategory === 'All'
      ? services
      : services.filter((s) => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="space-y-24 pb-20">
      {/* 01 — HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.openai.com/static-rsc-4/xqExfnpkGeaUQMfso96mGxRuhyb_9Ih4joYb9Zwt7kwLLNDDPnkU4lV8PcbaIOkUGsNQSAk0hdzAoU8-UgUW_pcrUmj9DwuyZ6XfpZClygCLRktiBNwXfmiqxuejBYsBArtvado0U13gyR17ZFmNEsxmKGTL8ajVvuucqucRSEA?purpose=inline"
            alt="Marina Valérielle Luxury Ocean"
            className="w-full h-full object-cover scale-105 transform motion-safe:animate-subtle-zoom brightness-[0.78]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/70 via-[#0B1F3A]/45 to-[#0B1F3A]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0B1F3A_95%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A45C]/50 bg-[#0B1F3A]/80 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#C9A45C] animate-ping" />
            <span className="text-[11px] sm:text-xs font-display-luxury tracking-[0.25em] text-[#DFBE7E] uppercase">
              PRIVATE YACHTS · PRIVATE ISLANDS · EXCEPTIONAL JOURNEYS
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.05] mb-6">
            Beyond the Blue.{' '}
            <span className="italic block font-light gold-gradient-text">
              Beyond the Ordinary.
            </span>
          </h1>

          {/* Tagline Paragraph */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#FFFFFF]/85 font-light leading-relaxed mb-10">
            {lang === 'TH'
              ? 'สัมผัสอิสระเหนือระดับ กับการเดินทางส่วนตัวบนผืนน้ำสีคริสตัล พร้อมเรือยอร์ชสุดหรู เกาะสวรรค์ และบริการที่ออกแบบเพื่อคุณโดยเฉพาะ'
              : 'Experience unparalleled freedom on crystalline waters with ultra-luxury bespoke yachts, private sanctuaries, and customized white-glove hospitality.'}
          </p>

          {/* 3 Pillars Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 text-xs sm:text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#071527]/70 border border-[#C9A45C]/30 text-white backdrop-blur-sm">
              <Ship className="w-4 h-4 text-[#C9A45C]" />
              <span>Private Yacht Charter</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#071527]/70 border border-[#C9A45C]/30 text-white backdrop-blur-sm">
              <Palmtree className="w-4 h-4 text-[#C9A45C]" />
              <span>Luxury Island Escape</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#071527]/70 border border-[#C9A45C]/30 text-white backdrop-blur-sm">
              <Briefcase className="w-4 h-4 text-[#C9A45C]" />
              <span>Executive Voyages</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto gold-btn px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-2xl"
            >
              <span>{lang === 'TH' ? 'จองการเดินทางส่วนตัว (Book Your Escape)' : 'Book Your Escape'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href="#yachts"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase border border-white/30 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <span>{lang === 'TH' ? 'ชมคอลเลกชันเรือยอร์ช' : 'Explore Fleet'}</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-[#C9A45C]/20 pt-8 text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#DFBE7E]">8 Vessels</div>
              <div className="text-[11px] text-white/60 uppercase tracking-wider">Superyacht Fleet</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#DFBE7E]">3 Atolls</div>
              <div className="text-[11px] text-white/60 uppercase tracking-wider">Private Sanctuary Islands</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#DFBE7E]">24/7 Butler</div>
              <div className="text-[11px] text-white/60 uppercase tracking-wider">VIP Concierge Escort</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#DFBE7E]">38.4%</div>
              <div className="text-[11px] text-white/60 uppercase tracking-wider">Operational Profit Margin</div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — YACHT COLLECTION SECTION */}
      <section id="yachts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-display-luxury text-[#C9A45C] tracking-[0.25em] uppercase mb-2">
              02 — THE FLEET & SERVICES
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white">
              Yacht Collection & Luxury Escapes
            </h2>
            <p className="text-sm text-white/70 max-w-xl mt-2 font-light">
              เรือยอร์ชระดับไฮเอนด์ ครบครันด้วยกัปตัน ลูกเรือเชฟมิชลิน และสิ่งอำนวยความสะดวกครบครัน พร้อมโควตารอบบริการที่จำกัด
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 mt-6 md:mt-0 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#247DA5] text-white shadow-md'
                    : 'bg-[#071527] border border-[#C9A45C]/25 text-white/70 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-gradient-to-b from-[#0E2A4E]/60 to-[#071527]/90 rounded-2xl border border-[#C9A45C]/25 overflow-hidden hover:border-[#C9A45C]/70 transition-all hover:shadow-2xl hover:shadow-[#0B1F3A]"
            >
              {/* Image & Badges */}
              <div className="relative h-60 sm:h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071527] via-transparent to-black/30" />

                {/* Service Code & Category */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#0B1F3A]/90 border border-[#C9A45C]/50 text-[10px] font-mono text-[#DFBE7E] font-bold">
                    {service.id}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#247DA5]/90 text-[10px] text-white font-medium">
                    {service.category}
                  </span>
                </div>

                {/* Quota Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1.5 backdrop-blur-md ${
                      service.quotaRemaining <= 2
                        ? 'bg-rose-500/90 text-white animate-pulse'
                        : 'bg-[#0B1F3A]/85 text-[#DFBE7E] border border-[#C9A45C]/40'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>เหลือ {service.quotaRemaining} รอบ</span>
                  </span>
                </div>

                {/* Vessel / Tagline overlay */}
                <div className="absolute bottom-3 left-4 right-4 text-xs font-serif-luxury italic text-[#DFBE7E] drop-shadow-md">
                  {service.tagline}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-serif-luxury text-2xl font-bold text-white group-hover:text-[#DFBE7E] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-2 mt-1.5 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Specs snapshot */}
                <div className="grid grid-cols-2 gap-2 text-[11px] py-2 border-y border-white/10 text-white/80">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>{service.specs.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>{service.specs.duration}</span>
                  </div>
                </div>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5">
                  {service.specs.highlights.slice(0, 2).map((h, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-white/70"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Price & Action */}
                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/50">ราคาขาย / ครั้ง</div>
                    <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#DFBE7E]">
                      ฿{service.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setExpandedService(service)}
                      className="p-2.5 rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      title="ดูรายละเอียดเรือ"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectServiceToBook(service)}
                      className="px-4 py-2.5 rounded-full gold-btn text-xs font-semibold uppercase tracking-wider flex items-center gap-1 shadow-md"
                    >
                      <span>จองรอบนี้</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — PRIVATE ISLANDS & VILLAS */}
      <section className="relative py-20 bg-gradient-to-b from-[#071527] via-[#0B1F3A] to-[#071527] border-y border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-display-luxury text-[#C9A45C] tracking-[0.25em] uppercase mb-2">
              03 — PRIVATE ISLAND RESORTS
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white">
              Sanctuary Island Escapes
            </h2>
            <p className="text-sm sm:text-base text-white/70 mt-3 font-light">
              สัมผัสความเงียบสงบที่แท้จริงบนเกาะส่วนตัว วิลล่าเหนือน้ำสีคราม ท่าจอดเรือยอร์ชส่วนตัว ลานจอดเฮลิคอปเตอร์ และบริการสปาระดับเวิลด์คลาส
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Big Showcase */}
            <div className="relative rounded-3xl overflow-hidden border border-[#C9A45C]/40 shadow-2xl group">
              <img
                src="https://images.openai.com/static-rsc-4/xH3OQsXT35KAjU8VVY6mZt4bdPQrLAQM410xQRNlnrAnlhRaISNATDodZ96MLbTs-s4clqX9oXWlVuDCyxMP8rK2cZ9ox-sE0dq3_IIThnc9fzJ5t9jFkV_es5Di9pybZFILx2dEIxhsGIJUCJ9z3J5GxmuAgAERh_7VoGWc8jQ?purpose=inline"
                alt="Pearl Lagoon Overwater Villas"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#071527]/90 backdrop-blur-md border border-[#C9A45C]/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-display-luxury text-[#DFBE7E]">MV-003 · PRIVATE ATOLL</span>
                  <span className="text-xs text-emerald-400 font-semibold">โควตาคงเหลือ 3 รอบ</span>
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Pearl Lagoon Private Island Sanctuary
                </h3>
                <p className="text-xs text-white/70 mt-1 font-light">
                  วิลล่าส่วนตัวกลางน้ำ พร้อมสระอินฟินิตี้ ซันเด็คส่วนตัว กิจกรรมดำน้ำรอบเกาะ และอาหารมื้อค่ำบนสันทรายใต้แสงดาว
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-serif-luxury text-[#DFBE7E] font-bold">
                    ฿245,000 <span className="text-xs font-normal text-white/50">/ ทริป</span>
                  </span>
                  <button
                    onClick={() => {
                      const s = services.find((x) => x.id === 'MV-003');
                      if (s) onSelectServiceToBook(s);
                    }}
                    className="gold-btn px-4 py-2 rounded-full text-xs font-semibold uppercase"
                  >
                    จองเกาะส่วนตัว
                  </button>
                </div>
              </div>
            </div>

            {/* Right Features List */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#0E2A4E]/40 border border-[#C9A45C]/20 hover:border-[#C9A45C]/60 transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#247DA5]/20 text-[#247DA5] border border-[#247DA5]/40">
                    <Palmtree className="w-6 h-6 text-[#DFBE7E]" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-xl font-bold text-white">
                      เกาะส่วนตัว 100% ไร้สิ่งรบกวน (Total Exclusivity)
                    </h4>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed font-light">
                      เปิดรับเฉพาะคณะของคุณเท่านั้น ให้คุณเพลิดเพลินกับธรรมชาติ หาดทรายขาว และน้ำทะเลใสราวคริสตัลอย่างเป็นส่วนตัวสูงสุด
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0E2A4E]/40 border border-[#C9A45C]/20 hover:border-[#C9A45C]/60 transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#247DA5]/20 text-[#247DA5] border border-[#247DA5]/40">
                    <Wine className="w-6 h-6 text-[#DFBE7E]" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-xl font-bold text-white">
                      เชฟส่วนตัว & วัตถุดิบชั้นเลิศ (Michelin Gastronomy)
                    </h4>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed font-light">
                      รังสรรค์เมนูไฟน์ไดน์นิ่ง อาหารทะเลสดใหม่ ล็อบสเตอร์ คาเวียร์ และไวน์วินเทจ โดยเชฟส่วนตัวที่พร้อมเสิร์ฟถึงระเบียงวิลล่า
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0E2A4E]/40 border border-[#C9A45C]/20 hover:border-[#C9A45C]/60 transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#247DA5]/20 text-[#247DA5] border border-[#247DA5]/40">
                    <Waves className="w-6 h-6 text-[#DFBE7E]" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-xl font-bold text-white">
                      กิจกรรมทางน้ำ & สปาริมทะเล (Bespoke Wellness)
                    </h4>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed font-light">
                      ดำน้ำดูปะการังน้ำตื้นและน้ำลึก พายเรือคายัคใส เจ็ตสกี และทรีตเมนต์สปาริมหาดจากนักบำบัดผู้เชี่ยวชาญ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 & 05 — EXPERIENCES & CORPORATE VOYAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Curated Experiences */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0E2A4E]/80 to-[#071527] border border-[#C9A45C]/30 space-y-6">
            <div className="text-xs font-display-luxury text-[#C9A45C] tracking-[0.25em] uppercase">
              04 — CURATED EXPERIENCES
            </div>
            <h3 className="font-serif-luxury text-3xl font-bold text-white">
              ฮันนีมูน งานฉลอง & ค่ำคืนใต้แสงดาว
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              ฉลองหมุดหมายสำคัญของชีวิต ดินเนอร์สุดโรแมนติกกลางทะเล หรือนอนค้างใต้ผืนฟ้าที่ระยิบระยับด้วยดวงดาวนับล้าน
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <Sparkles className="w-4 h-4 text-[#C9A45C]" />
                <span>พลุไฟกลางทะเลได้รับอนุญาตพิเศษ (Authorized Offshore Fireworks)</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
                <span>ช่างภาพและโดรนบันทึกภาพถ่ายยนตร์ส่วนตัว (Private Cinematography)</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <Wine className="w-4 h-4 text-[#C9A45C]" />
                <span>แชมเปญ Dom Pérignon วินเทจ และเค้กออกแบบเฉพาะบุคคล</span>
              </div>
            </div>
            <button
              onClick={() => {
                const s = services.find((x) => x.id === 'MV-005');
                if (s) onSelectServiceToBook(s);
              }}
              className="gold-btn px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              <span>ดูแพ็กเกจ Signature Celebration</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Corporate Charter */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B1F3A] to-[#061324] border border-[#247DA5]/50 space-y-6">
            <div className="text-xs font-display-luxury text-[#247DA5] tracking-[0.25em] uppercase">
              05 — CORPORATE CHARTER
            </div>
            <h3 className="font-serif-luxury text-3xl font-bold text-white">
              Executive Voyages & การประชุมระดับผู้นำ
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              เปลี่ยนห้องประชุมสี่เหลี่ยมเป็นห้องประชุมลอยน้ำบนซูเปอร์ยอร์ช 133 ฟุต พร้อมระบบการสื่อสารผ่านดาวเทียม Starlink ความปลอดภัยสูงสุด
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#247DA5]" />
                <span>มาตรการรักษาความลับทางการค้าและสัญญาความปลอดภัยชั้นสูง</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <Briefcase className="w-4 h-4 text-[#247DA5]" />
                <span>ห้องประชุมบอร์ดรูมพร้อมระบบสื่อสารและจอภาพ 4K</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <Award className="w-4 h-4 text-[#247DA5]" />
                <span>งานเลี้ยงค็อกเทลต้อนรับคู่ค้าคนสำคัญระดับนานาชาติ</span>
              </div>
            </div>
            <button
              onClick={() => {
                const s = services.find((x) => x.id === 'MV-004');
                if (s) onSelectServiceToBook(s);
              }}
              className="px-6 py-3 rounded-full bg-[#247DA5] hover:bg-[#1f6b8e] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <span>ดูรายละเอียด Royal Blue Business</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 06 & 07 — RESERVATIONS & CONCIERGE CONTACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B1F3A] via-[#0E2A4E] to-[#071527] rounded-3xl border border-[#C9A45C]/30 p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="text-xs font-display-luxury text-[#C9A45C] tracking-[0.25em] uppercase">
              06 & 07 — RESERVATIONS & CONCIERGE
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
              พร้อมสำหรับการเดินทางเหนือระดับหรือยัง?
            </h2>
            <p className="text-sm text-white/80 font-light leading-relaxed">
              ผู้ดูแลส่วนตัว (Private Concierge) ของ Marina Valérielle พร้อมรับคำขอเฉพาะบุคคลตลอด 24 ชั่วโมง
              พร้อมบริการหลายภาษา (TH, EN, FR, AR) เพื่อให้ทุกวินาทีบนท้องทะเลสมบูรณ์แบบที่สุด
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto gold-btn px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
              >
                <Calendar className="w-4 h-4" />
                <span>จองวันเดินทาง (Online Booking Form)</span>
              </button>
              <a
                href="mailto:concierge@marinavalerielle.luxury"
                className="w-full sm:w-auto px-6 py-4 rounded-full border border-[#C9A45C]/50 text-[#DFBE7E] hover:bg-[#C9A45C]/15 transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>ติดต่อผู้ดูแลส่วนตัว 24/7</span>
              </a>
            </div>

            {/* Global Offices */}
            <div className="pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-white/70">
              <div>
                <div className="font-semibold text-white">MONACO</div>
                <div className="text-[11px] text-white/50">Port Hercule VIP Pier</div>
              </div>
              <div>
                <div className="font-semibold text-white">DUBAI</div>
                <div className="text-[11px] text-white/50">DIFC & Dubai Harbour</div>
              </div>
              <div>
                <div className="font-semibold text-white">PHUKET / BANGKOK</div>
                <div className="text-[11px] text-white/50">Royal Marina Lagoon</div>
              </div>
              <div>
                <div className="font-semibold text-white">SINGAPORE</div>
                <div className="text-[11px] text-white/50">Marina Bay Sanctuary</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Vessel Modal */}
      {expandedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0B1F3A] border border-[#C9A45C]/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-[#DFBE7E]">{expandedService.id}</span>
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  {expandedService.name}
                </h3>
              </div>
              <button
                onClick={() => setExpandedService(null)}
                className="w-8 h-8 rounded-full border border-white/20 text-white/60 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <img
              src={expandedService.image}
              alt={expandedService.name}
              className="w-full h-64 object-cover rounded-xl border border-white/10"
            />

            <p className="text-sm text-white/80 leading-relaxed font-light">
              {expandedService.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs bg-white/5 p-4 rounded-xl border border-white/10">
              <div>
                <span className="text-white/40 block">ความยาว / ขนาด:</span>
                <span className="text-white font-medium">{expandedService.specs.length || 'Bespoke Island Access'}</span>
              </div>
              <div>
                <span className="text-white/40 block">ความจุผู้โดยสาร:</span>
                <span className="text-white font-medium">{expandedService.specs.capacity}</span>
              </div>
              <div>
                <span className="text-white/40 block">ลูกเรือ & บริการ:</span>
                <span className="text-white font-medium">{expandedService.specs.crew}</span>
              </div>
              <div>
                <span className="text-white/40 block">ระยะเวลาทริป:</span>
                <span className="text-white font-medium">{expandedService.specs.duration}</span>
              </div>
            </div>

            <div>
              <span className="text-xs uppercase text-[#DFBE7E] font-semibold tracking-wider block mb-2">
                สิ่งอำนวยความสะดวก & ไฮไลต์พิเศษ:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
                {expandedService.specs.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <span className="text-[10px] uppercase text-white/40">ราคาบริการ</span>
                <div className="text-2xl font-serif-luxury text-[#DFBE7E] font-bold">
                  ฿{expandedService.price.toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => {
                  const s = expandedService;
                  setExpandedService(null);
                  onSelectServiceToBook(s);
                }}
                className="gold-btn px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                เลือกบริการนี้ทันที
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
