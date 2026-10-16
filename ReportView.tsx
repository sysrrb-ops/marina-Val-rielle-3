import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Award,
  Users,
  Database,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

export const ReportView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const fullReportText = `รายงานธุรกิจ Marina Valérielle
ธุรกิจบริการเช่าเรือยอร์ชส่วนตัวและทัวร์เกาะหรู

1. ความเป็นมาและลักษณะธุรกิจ
Marina Valérielle เป็นธุรกิจสมมติที่ให้บริการเช่าเรือยอร์ชส่วนตัว ทัวร์เกาะหรู และประสบการณ์การพักผ่อนระดับพรีเมียม โดยให้บริการพร้อมกัปตัน ลูกเรือ อาหารและเครื่องดื่ม กิจกรรมทางทะเล และการจัดโปรแกรมเดินทางตามความต้องการของลูกค้า
ธุรกิจมุ่งเน้นความเป็นส่วนตัว ความสะดวกสบาย ความปลอดภัย และการบริการเฉพาะบุคคล ภายใต้ภาพลักษณ์หรูหราด้วยโทนสีกรมท่า น้ำเงิน ขาว และทอง

2. กลุ่มเป้าหมาย
1. นักท่องเที่ยวต่างชาติและนักท่องเที่ยวระดับพรีเมียม
2. คู่รักและลูกค้าที่เดินทางในโอกาสพิเศษ
3. ครอบครัวและกลุ่มเพื่อนที่ต้องการทริปส่วนตัว
4. นักธุรกิจและองค์กรที่ต้องการจัดประชุมหรืองานรับรอง
5. ลูกค้า VIP ที่ต้องการบริการ Concierge และการจัดโปรแกรมเฉพาะบุคคล

3. การจัดการฐานข้อมูล
ฐานข้อมูลแบ่งเป็นข้อมูลบริการและโควตา ข้อมูลธุรกรรมการขาย ข้อมูลกลุ่มลูกค้า และ Dashboard โดยจัดเก็บรหัสบริการ ราคา ต้นทุน จำนวนจอง รายได้ และสถานะการจอง เพื่อให้สามารถตรวจสอบข้อมูลและนำไปวิเคราะห์ผลประกอบการได้อย่างเป็นระบบ

4. ผลการวิเคราะห์ข้อมูล
จากชุดข้อมูลจำลองช่วงเดือนมกราคมถึงกันยายน 2026 ธุรกิจมีรายได้รวม 14,950,000 บาท ต้นทุนบริการรวม 9,207,000 บาท และกำไรขั้นต้น 5,743,000 บาท คิดเป็นอัตรากำไรขั้นต้นประมาณ 38.4%
รายได้สูงสุดอยู่ในเดือนกันยายนที่ 2,220,000 บาท แสดงให้เห็นแนวโน้มรายได้ที่เพิ่มขึ้นเมื่อเทียบกับต้นปี อย่างไรก็ตาม ควรตรวจสอบข้อมูลธุรกรรมจริงก่อนสรุปแนวโน้มตามฤดูกาล

5. ข้อเสนอแนะ
1. พัฒนาระบบจองออนไลน์ที่ตรวจสอบวันว่างและจำนวนรอบให้บริการได้
2. สร้างแพ็กเกจร่วมกับโรงแรมและวิลล่าหรู
3. ใช้ระบบสมาชิกและ CRM เพื่อเพิ่มการกลับมาใช้บริการซ้ำ
4. ติดตามต้นทุนต่อทริป รวมถึงค่าบำรุงรักษาเรือ ประกันภัย และค่าบุคลากร
5. ใช้ Dashboard ติดตามรายได้ กำไรขั้นต้น อัตราการจอง และโควตาคงเหลือเป็นประจำ
6. ให้ความสำคัญกับความปลอดภัยทางทะเล การดูแลสิ่งแวดล้อม และมาตรฐานการให้บริการ

6. สรุป
Marina Valérielle เป็นแนวคิดธุรกิจบริการระดับหรูที่สามารถใช้ฐานข้อมูลและ Dashboard เพื่อช่วยวางแผนการขาย ควบคุมต้นทุน และประเมินผลการดำเนินงานได้ การพัฒนาระบบข้อมูลให้เชื่อมโยงกันและตรวจสอบได้จะช่วยให้การตัดสินใจทางธุรกิจมีความแม่นยำยิ่งขึ้น`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullReportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C9A45C]/20 pb-6 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-display-luxury text-[#C9A45C] tracking-[0.2em] uppercase mb-1">
            <FileText className="w-4 h-4" />
            <span>EXECUTIVE BUSINESS REPORT & BRIEFING</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            รายงานสรุปธุรกิจ Marina Valérielle
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-1 font-light">
            เอกสารสรุปผลการดำเนินงาน การจัดการฐานข้อมูล และข้อเสนอแนะเชิงกลยุทธ์สำหรับผู้บริหาร
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg bg-[#071527] border border-[#C9A45C]/40 text-[#DFBE7E] hover:bg-[#C9A45C]/20 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">คัดลอกเรียบร้อย</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>คัดลอกเนื้อหารายงาน</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="gold-btn px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>พิมพ์รายงาน / บันทึก PDF</span>
          </button>
        </div>
      </div>

      {/* Main Report Document Container */}
      <div className="bg-[#071527] border border-[#C9A45C]/40 rounded-3xl p-8 sm:p-14 space-y-12 shadow-2xl text-white/90 font-light print:bg-white print:text-black print:p-0 print:border-none">
        {/* Document Header */}
        <div className="border-b border-[#C9A45C]/30 pb-8 space-y-3">
          <div className="text-xs font-display-luxury tracking-[0.25em] text-[#C9A45C] uppercase">
            MARINA VALÉRIELLE · EXECUTIVE BRIEF
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white print:text-black">
            รายงานธุรกิจ Marina Valérielle
          </h1>
          <div className="text-sm font-medium text-[#DFBE7E] print:text-gray-700">
            ธุรกิจบริการเช่าเรือยอร์ชส่วนตัวและทัวร์เกาะหรู (Ultra-Luxury Yacht Charter & Private Island Escapes)
          </div>
          <div className="text-xs text-white/50 print:text-gray-500 pt-2 flex items-center gap-4">
            <span>วันที่จัดทำ: ตุลาคม 2026</span>
            <span>สถานะ: รายงานฉบับสมบูรณ์ (เชื่อมโยงฐานข้อมูลและ Dashboard)</span>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#C9A45C]/20 border border-[#C9A45C] text-[#DFBE7E] text-xs font-bold flex items-center justify-center font-mono">
              1
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white print:text-black">
              ความเป็นมาและลักษณะธุรกิจ
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-white/80 print:text-gray-800 pl-10">
            <strong>Marina Valérielle</strong> เป็นธุรกิจสมมติที่ให้บริการเช่าเรือยอร์ชส่วนตัว ทัวร์เกาะหรู และประสบการณ์การพักผ่อนระดับพรีเมียม
            โดยให้บริการพร้อมกัปตัน ลูกเรือ อาหารและเครื่องดื่ม กิจกรรมทางทะเล และการจัดโปรแกรมเดินทางตามความต้องการของลูกค้า
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-white/80 print:text-gray-800 pl-10">
            ธุรกิจมุ่งเน้นความเป็นส่วนตัว ความสะดวกสบาย ความปลอดภัย และการบริการเฉพาะบุคคล
            ภายใต้ภาพลักษณ์หรูหราด้วยโทนสีกรมท่า (<code className="text-[#DFBE7E] font-mono">#0B1F3A</code>)
            น้ำเงินทะเล (<code className="text-[#247DA5] font-mono">#247DA5</code>)
            ขาวมุก (<code className="text-white font-mono">#FFFFFF</code>)
            และทองแชมเปญ (<code className="text-[#C9A45C] font-mono">#C9A45C</code>)
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#C9A45C]/20 border border-[#C9A45C] text-[#DFBE7E] text-xs font-bold flex items-center justify-center font-mono">
              2
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white print:text-black">
              กลุ่มเป้าหมาย (Target Segments)
            </h2>
          </div>
          <div className="pl-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 print:bg-gray-50 print:border-gray-200">
              <div className="font-bold text-[#DFBE7E] print:text-black mb-1">1. นักท่องเที่ยวระดับพรีเมียมทั่วโลก (34%)</div>
              <p className="text-white/70 print:text-gray-700">ผู้มีกำลังซื้อสูงที่ต้องการประสบการณ์ทะเลแบบเป็นส่วนตัว ไม่แออัด และได้รับมาตรฐานความปลอดภัยระดับสูงสุด</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 print:bg-gray-50 print:border-gray-200">
              <div className="font-bold text-[#DFBE7E] print:text-black mb-1">2. คู่รักและลูกค้าในโอกาสพิเศษ (22%)</div>
              <p className="text-white/70 print:text-gray-700">ทริปโรแมนติก ฮันนีมูน ดินเนอร์ใต้แสงดาวบนเรือ และแพ็กเกจฉลองครบรอบสุดประทับใจ</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 print:bg-gray-50 print:border-gray-200">
              <div className="font-bold text-[#DFBE7E] print:text-black mb-1">3. ครอบครัวและกลุ่มเพื่อน (18%)</div>
              <p className="text-white/70 print:text-gray-700">ทริปส่วนตัวที่กำหนดเส้นทาง เกาะแวะพัก และกิจกรรมทางน้ำได้ตามความต้องการ</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 print:bg-gray-50 print:border-gray-200">
              <div className="font-bold text-[#DFBE7E] print:text-black mb-1">4. นักธุรกิจและองค์กร (16%)</div>
              <p className="text-white/70 print:text-gray-700">งานประชุมบอร์ดบริหารระดับสูง งานรับรองคู่ค้า และกิจกรรมสร้างความสัมพันธ์พันธมิตร</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 sm:col-span-2 print:bg-gray-50 print:border-gray-200">
              <div className="font-bold text-[#DFBE7E] print:text-black mb-1">5. ลูกค้า VIP & Royal Concierge (10%)</div>
              <p className="text-white/70 print:text-gray-700">ผู้ต้องการบริการ Concierge ส่วนตัว 24/7 วิลล่าหรูบนเกาะส่วนตัว และการจัดทริปเฉพาะบุคคลที่มีมาตรการรักษาความปลอดภัยสูงสุด</p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#C9A45C]/20 border border-[#C9A45C] text-[#DFBE7E] text-xs font-bold flex items-center justify-center font-mono">
              3
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white print:text-black">
              การจัดการฐานข้อมูล (Database Structure)
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-white/80 print:text-gray-800 pl-10">
            ฐานข้อมูลธุรกิจแบ่งเป็น 4 ส่วนหลัก: ข้อมูลบริการและโควตา (Services & Inventory), ข้อมูลธุรกรรมการขาย (Sales Transactions),
            ข้อมูลกลุ่มลูกค้า (Customer Segments) และ Dashboard สรุปผล
            โดยจัดเก็บรหัสบริการ ราคา ต้นทุน จำนวนจอง รายได้ และสถานะการจอง เพื่อให้สามารถตรวจสอบข้อมูลและนำไปวิเคราะห์ผลประกอบการได้อย่างเป็นระบบ
          </p>
          <div className="pl-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#0E2A4E]/50 border border-white/10">
              <span className="text-[#DFBE7E] font-semibold block">Sheet 1</span>
              <span>บริการ & โควตา 8 รายการ</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0E2A4E]/50 border border-white/10">
              <span className="text-[#DFBE7E] font-semibold block">Sheet 2</span>
              <span>บันทึกธุรกรรมการขาย</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0E2A4E]/50 border border-white/10">
              <span className="text-[#DFBE7E] font-semibold block">Sheet 3</span>
              <span>ข้อมูล 5 กลุ่มลูกค้า</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0E2A4E]/50 border border-white/10">
              <span className="text-[#DFBE7E] font-semibold block">Sheet 4</span>
              <span>สูตรคำนวณการเงิน</span>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#C9A45C]/20 border border-[#C9A45C] text-[#DFBE7E] text-xs font-bold flex items-center justify-center font-mono">
              4
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white print:text-black">
              ผลการวิเคราะห์ข้อมูล (Financial Analysis)
            </h2>
          </div>
          <div className="pl-10 space-y-4 text-sm leading-relaxed text-white/80 print:text-gray-800">
            <p>
              จากชุดข้อมูลจำลองช่วงเดือนมกราคมถึงกันยายน 2026 ธุรกิจมี:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 font-mono">
              <div className="p-3 rounded-xl bg-white/5 border border-[#C9A45C]/30 text-center">
                <span className="text-[10px] text-white/50 block">รายได้รวม</span>
                <span className="text-xl font-bold text-white">฿14.95M</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-[#C9A45C]/30 text-center">
                <span className="text-[10px] text-white/50 block">ต้นทุนบริการรวม</span>
                <span className="text-xl font-bold text-white/80">฿9.207M</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-[#C9A45C]/30 text-center">
                <span className="text-[10px] text-white/50 block">กำไรขั้นต้น</span>
                <span className="text-xl font-bold text-emerald-400">฿5.743M</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-[#C9A45C]/30 text-center">
                <span className="text-[10px] text-white/50 block">อัตรากำไรขั้นต้น</span>
                <span className="text-xl font-bold text-[#DFBE7E]">38.4%</span>
              </div>
            </div>
            <p>
              รายได้สูงสุดอยู่ในเดือนกันยายนที่ <strong>2,220,000 บาท</strong> แสดงให้เห็นแนวโน้มรายได้ที่เพิ่มขึ้นเมื่อเทียบกับต้นปี (มกราคม 1,120,000 บาท หรือเพิ่มขึ้น <strong>+98.2%</strong>)
              อย่างไรก็ตาม ควรตรวจสอบข้อมูลธุรกรรมจริงก่อนสรุปแนวโน้มตามฤดูกาล
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#C9A45C]/20 border border-[#C9A45C] text-[#DFBE7E] text-xs font-bold flex items-center justify-center font-mono">
              5
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white print:text-black">
              ข้อเสนอแนะเชิงกลยุทธ์ (Strategic Recommendations)
            </h2>
          </div>
          <div className="pl-10 space-y-3 text-xs sm:text-sm text-white/80 print:text-gray-800">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C9A45C] mt-0.5 shrink-0" />
              <span><strong>1. พัฒนาระบบจองออนไลน์:</strong> ตรวจสอบวันว่างและจำนวนรอบให้บริการได้แบบ Real-Time เพื่อป้องกัน Overbooking</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C9A45C] mt-0.5 shrink-0" />
              <span><strong>2. สร้างแพ็กเกจร่วมกับโรงแรมและวิลล่าหรู:</strong> ขยายเครือข่ายพันธมิตรระดับ 5-6 ดาว เพื่อดึงดูดลูกค้า VIP</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C9A45C] mt-0.5 shrink-0" />
              <span><strong>3. ใช้ระบบสมาชิกและ CRM:</strong> มอบสิทธิประโยชน์พิเศษและบริการเฉพาะบุคคลเพื่อเพิ่มอัตราการกลับมาใช้บริการซ้ำ</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C9A45C] mt-0.5 shrink-0" />
              <span><strong>4. ติดตามต้นทุนต่อทริปอย่างละเอียด:</strong> ควบคุมค่าบำรุงรักษาเรือ ประกันภัยทางทะเล ค่าน้ำมัน และค่าตอบแทนบุคลากร</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C9A45C] mt-0.5 shrink-0" />
              <span><strong>5. ใช้ Dashboard ติดตามผลสม่ำเสมอ:</strong> มอนิเตอร์รายได้ กำไรขั้นต้น อัตราการจอง และโควตาคงเหลือเป็นประจำทุกสัปดาห์</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C9A45C] mt-0.5 shrink-0" />
              <span><strong>6. มาตรฐานความปลอดภัยและการดูแลสิ่งแวดล้อม:</strong> ยึดมั่นมาตรฐานความปลอดภัยสากล การอนุรักษ์แนวปะการัง และการท่องเที่ยวอย่างยั่งยืน</span>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-4 border-t border-[#C9A45C]/20 pt-8">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#C9A45C]/20 border border-[#C9A45C] text-[#DFBE7E] text-xs font-bold flex items-center justify-center font-mono">
              6
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white print:text-black">
              บทสรุปผู้บริหาร (Executive Summary)
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-white/80 print:text-gray-800 pl-10">
            <strong>Marina Valérielle</strong> เป็นแนวคิดธุรกิจบริการระดับ Ultra-Luxury ที่สามารถใช้ฐานข้อมูลและ Dashboard
            เพื่อช่วยวางแผนการขาย ควบคุมต้นทุน และประเมินผลการดำเนินงานได้อย่างมีประสิทธิภาพ
            การพัฒนาระบบข้อมูลให้เชื่อมโยงกันและตรวจสอบได้จะช่วยให้การตัดสินใจทางธุรกิจมีความแม่นยำยิ่งขึ้น
            และผลักดันแบรนด์สู่การเป็นผู้นำด้านการท่องเที่ยวทางทะเลระดับโลกอย่างยั่งยืน
          </p>
        </section>
      </div>
    </div>
  );
};
