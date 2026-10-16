import React, { useState } from 'react';
import {
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Anchor,
  Clock,
} from 'lucide-react';
import { ServiceItem, Transaction } from '../data/marinaData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  preSelectedService?: ServiceItem | null;
  onBookingConfirmed: (newTx: Transaction, serviceId: string) => void;
  lang: 'TH' | 'EN';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  preSelectedService,
  onBookingConfirmed,
  lang,
}) => {
  if (!isOpen) return null;

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preSelectedService ? preSelectedService.id : services[0].id
  );
  const [guestName, setGuestName] = useState<string>('');
  const [country, setCountry] = useState<string>('Thailand');
  const [guestsCount, setGuestsCount] = useState<number>(4);
  const [bookingDate, setBookingDate] = useState<string>(
    new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]
  );
  const [specialRequests, setSpecialRequests] = useState<string[]>([]);
  const [customNote, setCustomNote] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [lastBookingId, setLastBookingId] = useState<string>('');

  const currentService =
    services.find((s) => s.id === selectedServiceId) || services[0];

  const addOnOptions = [
    { id: 'chef', label: 'เชฟมิชลินส่วนตัว (Private Michelin Chef)', price: 45000 },
    { id: 'dom', label: 'ไวน์ & แชมเปญ Dom Pérignon Vintage', price: 35000 },
    { id: 'heli', label: 'เฮลิคอปเตอร์รับส่งสนามบิน (Heli Transfer)', price: 65000 },
    { id: 'drone', label: 'ช่างภาพและโดรน 4K บันทึกวิดีโอ', price: 25000 },
  ];

  const toggleAddOn = (id: string) => {
    setSpecialRequests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addOnsTotal = specialRequests.reduce((sum, reqId) => {
    const item = addOnOptions.find((o) => o.id === reqId);
    return sum + (item ? item.price : 0);
  }, 0);

  const basePrice = currentService.price;
  const totalPrice = basePrice + addOnsTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentService.quotaRemaining <= 0) {
      alert('ขออภัย โควตารอบบริการนี้เต็มแล้ว');
      return;
    }

    const bookingId = `BK-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newTx: Transaction = {
      bookingId,
      date: bookingDate,
      serviceId: currentService.id,
      serviceName: currentService.name,
      customerName: guestName || 'VIP Guest',
      country,
      segment: 'Direct VIP Online Portal',
      quantity: 1,
      unitPrice: totalPrice,
      discount: 0,
      netAmount: totalPrice,
      cost: currentService.cost + Math.floor(addOnsTotal * 0.6),
      status: 'Confirmed',
      channel: 'Direct Concierge Web Portal',
    };

    onBookingConfirmed(newTx, currentService.id);
    setLastBookingId(bookingId);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0B1F3A] border border-[#C9A45C]/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/20 text-white/60 hover:text-white flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        {!isSuccess ? (
          <>
            <div className="border-b border-[#C9A45C]/30 pb-4">
              <div className="text-[11px] font-display-luxury tracking-[0.2em] text-[#C9A45C] uppercase">
                RESERVATION & BESPOKE CHARTER
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                จองการเดินทางส่วนตัว (Book Your Voyage)
              </h3>
              <p className="text-xs text-white/70 mt-1 font-light">
                กรอกข้อมูลการเดินทางเพื่อยืนยันรอบบริการและเชื่อมโยงกับฐานข้อมูลของ Marina Valérielle
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {/* Select Service */}
              <div>
                <label className="text-white/80 font-medium block mb-1.5">
                  เลือกเรือยอร์ชหรือแพ็กเกจ (Select Service):
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#071527] border border-[#C9A45C]/40 text-white focus:outline-none focus:border-[#C9A45C]"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id} disabled={s.quotaRemaining <= 0}>
                      {s.id} — {s.name} (฿{s.price.toLocaleString()}) — เหลือ {s.quotaRemaining} รอบ
                    </option>
                  ))}
                </select>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/80 font-medium block mb-1.5">
                    ชื่อผู้จอง / ตัวแทน (VIP Guest Name):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น Khun Voravat, Lord Alistair"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#071527] border border-white/20 text-white focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
                <div>
                  <label className="text-white/80 font-medium block mb-1.5">
                    ประเทศที่พำนัก (Country):
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#071527] border border-white/20 text-white focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
              </div>

              {/* Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/80 font-medium block mb-1.5">
                    วันที่เดินทาง (Voyage Date):
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#071527] border border-white/20 text-white focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
                <div>
                  <label className="text-white/80 font-medium block mb-1.5">
                    จำนวนผู้โดยสาร (Guests Count):
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full p-3 rounded-xl bg-[#071527] border border-white/20 text-white focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <label className="text-white/80 font-medium block mb-2">
                  บริการพิเศษเพิ่มเติม (VIP Add-Ons):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {addOnOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        specialRequests.includes(opt.id)
                          ? 'bg-[#C9A45C]/15 border-[#C9A45C] text-white'
                          : 'bg-[#071527] border-white/10 text-white/70 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={specialRequests.includes(opt.id)}
                          onChange={() => toggleAddOn(opt.id)}
                          className="rounded text-[#C9A45C] focus:ring-0"
                        />
                        <span className="text-[11px]">{opt.label}</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#DFBE7E]">
                        +฿{opt.price.toLocaleString()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-xl bg-[#071527] border border-[#C9A45C]/30 space-y-2">
                <div className="flex justify-between text-white/70">
                  <span>ราคาแพ็กเกจหลัก ({currentService.id}):</span>
                  <span className="font-mono text-white">฿{basePrice.toLocaleString()}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-white/70">
                    <span>บริการพิเศษเพิ่มเติม ({specialRequests.length} รายการ):</span>
                    <span className="font-mono text-white">+฿{addOnsTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-white block">ยอดรวมสุทธิ (Total Net Amount)</span>
                    <span className="text-[10px] text-white/40">รวมภาษีมูลค่าเพิ่มและการดูแลระดับไวท์โกลฟ</span>
                  </div>
                  <div className="text-2xl font-serif-luxury font-bold text-[#DFBE7E]">
                    ฿{totalPrice.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-full border border-white/20 text-white/70 hover:text-white"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="gold-btn px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-xl"
                >
                  <span>ยืนยันการจองรอบนี้</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-display-luxury text-[#C9A45C] uppercase tracking-wider">
                CONFIRMED RESERVATION
              </span>
              <h3 className="font-serif-luxury text-3xl font-bold text-white mt-1">
                ยืนยันการจองเรียบร้อยแล้ว
              </h3>
              <p className="text-xs text-white/70 max-w-md mx-auto mt-2 leading-relaxed">
                บันทึกการจองรหัส <strong className="text-[#DFBE7E] font-mono">{lastBookingId}</strong> ได้ถูกเพิ่มเข้าสู่ฐานข้อมูลธุรกรรม
                และระบบได้ทำการตัดยอดโควตาคงเหลือของ <strong className="text-white">{currentService.name}</strong> ให้โดยอัตโนมัติแล้ว
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 max-w-md mx-auto text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-white/50">ผู้จอง:</span>
                <span className="text-white font-medium">{guestName} ({country})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">วันเดินทาง:</span>
                <span className="text-white font-medium">{bookingDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">ยอดชำระ:</span>
                <span className="text-[#DFBE7E] font-mono font-bold">฿{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="gold-btn px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg"
            >
              เสร็จสิ้นและกลับสู่หน้าหลัก
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
