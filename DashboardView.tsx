import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart,
  ShieldAlert,
  ArrowUpRight,
  Info,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  MONTHLY_METRICS,
  TOTAL_KPI,
  ServiceItem,
  CUSTOMER_SEGMENTS,
} from '../data/marinaData';

interface DashboardViewProps {
  services: ServiceItem[];
  lang: 'TH' | 'EN';
}

export const DashboardView: React.FC<DashboardViewProps> = ({ services, lang }) => {
  const [activeMetricView, setActiveMetricView] = useState<'rev-cost' | 'profit'>('rev-cost');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const maxRevenue = 2.5; // for graph scaling in Million Baht

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C9A45C]/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-display-luxury text-[#C9A45C] tracking-[0.2em] uppercase mb-1">
            <BarChart className="w-4 h-4" />
            <span>EXECUTIVE FINANCIAL DASHBOARD (JAN - SEP 2026)</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            ภาพรวมผลประกอบการและการวิเคราะห์
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-1 font-light">
            รายงานตัวชี้วัดสำคัญทางการเงิน (KPIs), แนวโน้มรายได้, ต้นทุนบริการ และการติดตามโควตาคงเหลือ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5">
            <ArrowUpRight className="w-4 h-4" />
            <span>เติบโต +98.2% (ม.ค. - ก.ย.)</span>
          </span>
        </div>
      </div>

      {/* 4 CORE KPI CARDS (From User Brief) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Revenue */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0E2A4E] to-[#071527] border border-[#C9A45C]/30 relative overflow-hidden group hover:border-[#C9A45C]/80 transition-all shadow-lg">
          <div className="flex items-center justify-between text-xs text-white/60 mb-2">
            <span className="uppercase tracking-wider">รายได้รวม (Total Revenue)</span>
            <DollarSign className="w-4 h-4 text-[#C9A45C]" />
          </div>
          <div className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white">
            {TOTAL_KPI.revenue}
          </div>
          <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>14,950,000 บาท (สะสม 9 เดือน)</span>
          </div>
        </div>

        {/* Card 2: Cost */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0E2A4E] to-[#071527] border border-[#C9A45C]/30 relative overflow-hidden group hover:border-[#C9A45C]/80 transition-all shadow-lg">
          <div className="flex items-center justify-between text-xs text-white/60 mb-2">
            <span className="uppercase tracking-wider">ต้นทุนบริการรวม (Cost)</span>
            <Layers className="w-4 h-4 text-white/60" />
          </div>
          <div className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white/90">
            {TOTAL_KPI.cost}
          </div>
          <div className="mt-2 text-xs text-white/60 flex items-center gap-1">
            <span>9,207,000 บาท (ต้นทุนตรงต่อทริป)</span>
          </div>
        </div>

        {/* Card 3: Gross Profit */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0E2A4E] to-[#071527] border border-[#C9A45C]/40 relative overflow-hidden group hover:border-[#C9A45C] transition-all shadow-lg">
          <div className="flex items-center justify-between text-xs text-[#DFBE7E] mb-2">
            <span className="uppercase tracking-wider font-semibold">กำไรขั้นต้น (Gross Profit)</span>
            <TrendingUp className="w-4 h-4 text-[#C9A45C]" />
          </div>
          <div className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#DFBE7E]">
            {TOTAL_KPI.grossProfit}
          </div>
          <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1 font-medium">
            <span>5,743,000 บาท (กำไรเป็นบวกทุกเดือน)</span>
          </div>
        </div>

        {/* Card 4: Gross Margin */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0E2A4E] to-[#071527] border border-[#247DA5]/50 relative overflow-hidden group hover:border-[#247DA5] transition-all shadow-lg">
          <div className="flex items-center justify-between text-xs text-[#247DA5] mb-2">
            <span className="uppercase tracking-wider font-semibold">อัตรากำไรขั้นต้น (Margin %)</span>
            <PieChart className="w-4 h-4 text-[#247DA5]" />
          </div>
          <div className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white">
            {TOTAL_KPI.grossMargin}
          </div>
          <div className="mt-2 text-xs text-white/70 flex items-center gap-1">
            <span>สูตร (รายได้ - ต้นทุน) / รายได้</span>
          </div>
        </div>
      </div>

      {/* MONTHLY REVENUE & PROFIT INTERACTIVE CHARTS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0E2A4E]/80 to-[#071527] border border-[#C9A45C]/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-display-luxury text-[#C9A45C] uppercase tracking-wider block">
              แนวโน้มรายเดือน (MONTHLY TREND 2026)
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              {activeMetricView === 'rev-cost'
                ? 'กราฟเปรียบเทียบรายได้และต้นทุนบริการ (Revenue vs Cost)'
                : 'กราฟกำไรขั้นต้นรายเดือน (Monthly Gross Profit)'}
            </h3>
            <span className="text-xs text-white/50">หน่วย: ล้านบาท (Million THB)</span>
          </div>

          <div className="flex items-center gap-2 bg-[#071527] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveMetricView('rev-cost')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeMetricView === 'rev-cost'
                  ? 'bg-[#247DA5] text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              รายได้ vs ต้นทุน
            </button>
            <button
              onClick={() => setActiveMetricView('profit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeMetricView === 'profit'
                  ? 'bg-[#C9A45C] text-[#0B1F3A] font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              กำไรขั้นต้น
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-xs text-white/70">
          {activeMetricView === 'rev-cost' ? (
            <>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#247DA5]" />
                <span>รายได้ (Revenue)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#C9A45C]" />
                <span>ต้นทุนบริการ (Cost)</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-emerald-400" />
              <span>กำไรขั้นต้น (Gross Profit)</span>
            </div>
          )}
        </div>

        {/* Bar Chart Visual */}
        <div className="h-72 sm:h-80 flex items-end gap-3 sm:gap-6 pt-8 pb-4 border-b border-white/10">
          {MONTHLY_METRICS.map((m, idx) => {
            const revHeight = (m.revenue / maxRevenue) * 100;
            const costHeight = (m.cost / maxRevenue) * 100;
            const profitHeight = (m.grossProfit / maxRevenue) * 100;
            const isHovered = hoveredMonth === idx;

            return (
              <div
                key={m.month}
                onMouseEnter={() => setHoveredMonth(idx)}
                onMouseLeave={() => setHoveredMonth(null)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-20 z-20 px-3 py-2 rounded-lg bg-[#071527] border border-[#C9A45C] text-[11px] shadow-2xl whitespace-nowrap text-left space-y-0.5">
                    <div className="font-bold text-[#DFBE7E]">{m.month} ({m.monthTh})</div>
                    <div className="text-white">รายได้: ฿{m.revenue.toFixed(2)}M</div>
                    <div className="text-white/70">ต้นทุน: ฿{m.cost.toFixed(3)}M</div>
                    <div className="text-emerald-400 font-semibold">กำไร: ฿{m.grossProfit.toFixed(3)}M</div>
                  </div>
                )}

                {/* Bars */}
                {activeMetricView === 'rev-cost' ? (
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    {/* Revenue Bar */}
                    <div
                      style={{ height: `${revHeight}%` }}
                      className="w-1/2 max-w-[28px] bg-gradient-to-t from-[#1b5d7b] to-[#247DA5] rounded-t-sm group-hover:brightness-125 transition-all relative"
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/80 hidden sm:block">
                        {m.revenue}M
                      </span>
                    </div>
                    {/* Cost Bar */}
                    <div
                      style={{ height: `${costHeight}%` }}
                      className="w-1/2 max-w-[28px] bg-gradient-to-t from-[#9B7732] to-[#C9A45C] rounded-t-sm group-hover:brightness-125 transition-all relative"
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/60 hidden sm:block">
                        {m.cost}M
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex items-end justify-center h-full">
                    <div
                      style={{ height: `${profitHeight}%` }}
                      className="w-full max-w-[42px] bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm group-hover:brightness-125 transition-all relative"
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-emerald-300 font-bold">
                        {m.grossProfit}M
                      </span>
                    </div>
                  </div>
                )}

                {/* Month Label */}
                <div className="mt-3 text-[11px] text-white/70 group-hover:text-[#DFBE7E] font-medium">
                  {m.monthTh}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-COLUMN ANALYSIS & INVENTORY MONITOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Inventory Scarcity & Top Services */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#071527] border border-[#C9A45C]/30 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-display-luxury text-[#C9A45C] uppercase tracking-wider block">
                INVENTORY SCARCITY & QUOTA MONITOR
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                ติดตามโควตาบริการใกล้หมด
              </h3>
            </div>
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          </div>

          <div className="space-y-4">
            {services.map((s) => {
              const bookedPct = (s.quotaBooked / s.quotaTotal) * 100;
              const isUrgent = s.quotaRemaining <= 2;

              return (
                <div key={s.id} className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-white">{s.name}</span>
                    <span
                      className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                        isUrgent ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      เหลือ {s.quotaRemaining} / {s.quotaTotal} รอบ
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      style={{ width: `${bookedPct}%` }}
                      className={`h-full rounded-full ${
                        isUrgent
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                          : 'bg-gradient-to-r from-[#247DA5] to-[#C9A45C]'
                      }`}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-white/50">
                    <span>ราคา ฿{s.price.toLocaleString()}</span>
                    <span>ยอดขายสะสม ฿{s.cumulativeRevenue.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Key Business Takeaways (From User Brief) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#071527] border border-[#C9A45C]/30 space-y-6">
          <div>
            <span className="text-xs font-display-luxury text-[#C9A45C] uppercase tracking-wider block">
              STRATEGIC FINDINGS
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              ผลการวิเคราะห์ข้อมูลเบื้องต้น
            </h3>
          </div>

          <div className="space-y-4 text-xs text-white/80">
            {/* Finding 1 */}
            <div className="p-4 rounded-xl bg-[#0E2A4E]/50 border-l-4 border-emerald-400 space-y-1">
              <div className="font-bold text-white text-sm">1. รายได้เติบโตอย่างก้าวกระโดด (+98.2%)</div>
              <p className="font-light text-white/70 leading-relaxed">
                รายได้เพิ่มจาก 1.12 ล้านบาทในเดือนมกราคม เป็น 2.22 ล้านบาทในเดือนกันยายน สะท้อนความต้องการเช่าเรือยอร์ชและวิลล่าส่วนตัวที่เพิ่มขึ้นต่อเนื่อง
              </p>
            </div>

            {/* Finding 2 */}
            <div className="p-4 rounded-xl bg-[#0E2A4E]/50 border-l-4 border-[#C9A45C] space-y-1">
              <div className="font-bold text-white text-sm">2. กำไรเป็นบวกทุกเดือน (Total GP ฿5.743M)</div>
              <p className="font-light text-white/70 leading-relaxed">
                กำไรขั้นต้นรวม 5.743 ล้านบาท (38.4%) แต่ยังไม่ใช่กำไรสุทธิ เนื่องจากยังไม่ได้หักค่าใช้จ่ายบริหาร เช่น เงินเดือนประจำลูกเรือ ค่าประกันภัยเรือ และค่าการตลาด
              </p>
            </div>

            {/* Finding 3 */}
            <div className="p-4 rounded-xl bg-[#0E2A4E]/50 border-l-4 border-purple-400 space-y-1">
              <div className="font-bold text-white text-sm">3. บริการยอดนิยมที่ควรติดตาม</div>
              <p className="font-light text-white/70 leading-relaxed">
                <strong>Valérielle Signature Celebration (MV-005)</strong> มียอดขายสะสมสูงสุดในกลุ่มบริการที่ 1.10 ล้านบาท และได้รับความนิยมสูงสุดในกลุ่มคู่รักและโอกาสพิเศษ
              </p>
            </div>

            {/* Finding 4 */}
            <div className="p-4 rounded-xl bg-[#0E2A4E]/50 border-l-4 border-rose-400 space-y-1">
              <div className="font-bold text-white text-sm">4. บริการที่มีโควตาจำกัดวิกฤต (Scarcity Alert)</div>
              <p className="font-light text-white/70 leading-relaxed">
                <strong>Royal Blue Business Voyage (MV-004)</strong> และ <strong>Ocean Jewel Overnight (MV-006)</strong> เหลือเพียงอย่างละ 2 รอบ จึงควรใช้กลยุทธ์ Dynamic Pricing เพื่อเพิ่มกำไรสูงสุด
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
