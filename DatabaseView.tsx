import React, { useState } from 'react';
import {
  Table,
  Plus,
  Download,
  Copy,
  Check,
  Search,
  Filter,
  Layers,
  DollarSign,
  TrendingUp,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import {
  ServiceItem,
  Transaction,
  CustomerSegment,
  GOOGLE_SHEETS_FORMULAS,
  CUSTOMER_SEGMENTS,
} from '../data/marinaData';

interface DatabaseViewProps {
  services: ServiceItem[];
  transactions: Transaction[];
  onAddTransaction: (tx: Transaction) => void;
  lang: 'TH' | 'EN';
}

export const DatabaseView: React.FC<DatabaseViewProps> = ({
  services,
  transactions,
  onAddTransaction,
  lang,
}) => {
  const [activeSheet, setActiveSheet] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  // New Transaction Form State
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTx, setNewTx] = useState({
    serviceId: 'MV-001',
    customerName: '',
    country: 'Thailand',
    segment: 'Global High-Net-Worth',
    quantity: 1,
    discount: 0,
    status: 'Confirmed' as Transaction['status'],
    channel: 'Direct Concierge Web Portal',
  });

  // Calculate live totals for Sheet 1
  const totalRevenuePotential = services.reduce((acc, s) => acc + s.price * s.quotaTotal, 0);
  const totalCumulativeSales = services.reduce((acc, s) => acc + s.cumulativeRevenue, 0);
  const totalRemainingQuotas = services.reduce((acc, s) => acc + s.quotaRemaining, 0);

  // Filtered transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export CSV function
  const handleExportCSV = (sheetNum: number) => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    if (sheetNum === 1) {
      csvContent += 'Code,Service Name,Category,Price THB,Cost THB,Gross Profit,Margin %,Quota Total,Quota Booked,Quota Remaining,Cumulative Sales\n';
      services.forEach((s) => {
        const gp = s.price - s.cost;
        const margin = ((gp / s.price) * 100).toFixed(1);
        csvContent += `"${s.id}","${s.name}","${s.category}",${s.price},${s.cost},${gp},"${margin}%",${s.quotaTotal},${s.quotaBooked},${s.quotaRemaining},${s.cumulativeRevenue}\n`;
      });
    } else if (sheetNum === 2) {
      csvContent += 'Booking ID,Date,Service ID,Service Name,Customer Name,Country,Segment,Qty,Unit Price,Discount,Net Amount,Cost,Status,Channel\n';
      transactions.forEach((t) => {
        csvContent += `"${t.bookingId}","${t.date}","${t.serviceId}","${t.serviceName}","${t.customerName}","${t.country}","${t.segment}",${t.quantity},${t.unitPrice},${t.discount},${t.netAmount},${t.cost},"${t.status}","${t.channel}"\n`;
      });
    } else if (sheetNum === 3) {
      csvContent += 'Segment ID,Name,Share %,Avg Spend,Key Markets,Primary Channels\n';
      CUSTOMER_SEGMENTS.forEach((c) => {
        csvContent += `"${c.id}","${c.name}",${c.sharePercent},${c.avgSpend},"${c.keyMarkets.join(', ')}","${c.primaryChannels.join(', ')}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Marina_Valerielle_Sheet${sheetNum}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyFormula = (formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const service = services.find((s) => s.id === newTx.serviceId) || services[0];
    const unitPrice = service.price;
    const netAmount = unitPrice * newTx.quantity - newTx.discount;
    const cost = service.cost * newTx.quantity;

    const booking: Transaction = {
      bookingId: `BK-2026-${String(transactions.length + 90).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      serviceId: service.id,
      serviceName: service.name,
      customerName: newTx.customerName || 'Anonymous VIP Client',
      country: newTx.country,
      segment: newTx.segment,
      quantity: Number(newTx.quantity),
      unitPrice,
      discount: Number(newTx.discount),
      netAmount,
      cost,
      status: newTx.status,
      channel: newTx.channel,
    };

    onAddTransaction(booking);
    setShowAddModal(false);
    setNewTx({
      serviceId: 'MV-001',
      customerName: '',
      country: 'Thailand',
      segment: 'Global High-Net-Worth',
      quantity: 1,
      discount: 0,
      status: 'Confirmed',
      channel: 'Direct Concierge Web Portal',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C9A45C]/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-display-luxury text-[#C9A45C] tracking-[0.2em] uppercase mb-1">
            <FileSpreadsheet className="w-4 h-4" />
            <span>BUSINESS DATABASE (GOOGLE SHEETS SIMULATION)</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
            ฐานข้อมูลธุรกิจ Marina Valérielle
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-1 font-light">
            ฐานข้อมูล 4 ชีตเชื่อมโยงระบบการเงิน โควตาบริการ และบันทึกธุรกรรมการขายตามหลักการบัญชีธุรกิจจริง
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExportCSV(activeSheet)}
            className="px-4 py-2 rounded-lg bg-[#247DA5] hover:bg-[#1e698b] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
            title="ดาวน์โหลดไฟล์ CSV สำหรับเปิดใน Google Sheets หรือ Excel"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ส่งออกชีตนี้เป็น CSV</span>
          </button>
          {activeSheet === 2 && (
            <button
              onClick={() => setShowAddModal(true)}
              className="gold-btn px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>เพิ่มบันทึกการจอง</span>
            </button>
          )}
        </div>
      </div>

      {/* Sheet Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveSheet(1)}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            activeSheet === 1
              ? 'bg-[#0E2A4E] text-[#DFBE7E] border-[#C9A45C]'
              : 'text-white/60 hover:text-white border-transparent'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Sheet 1: Services & Inventory (บริการและโควตา)</span>
        </button>

        <button
          onClick={() => setActiveSheet(2)}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            activeSheet === 2
              ? 'bg-[#0E2A4E] text-[#DFBE7E] border-[#C9A45C]'
              : 'text-white/60 hover:text-white border-transparent'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>Sheet 2: Sales Transactions (ประวัติการจอง)</span>
          <span className="px-2 py-0.5 rounded-full bg-[#C9A45C]/20 text-[10px] text-[#DFBE7E]">
            {transactions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSheet(3)}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            activeSheet === 3
              ? 'bg-[#0E2A4E] text-[#DFBE7E] border-[#C9A45C]'
              : 'text-white/60 hover:text-white border-transparent'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Sheet 3: Customer Segments (กลุ่มลูกค้า)</span>
        </button>

        <button
          onClick={() => setActiveSheet(4)}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            activeSheet === 4
              ? 'bg-[#0E2A4E] text-[#DFBE7E] border-[#C9A45C]'
              : 'text-white/60 hover:text-white border-transparent'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Sheet 4: Google Sheets Formulas (สูตรคำนวณ)</span>
        </button>
      </div>

      {/* SHEET 1: SERVICES & INVENTORY */}
      {activeSheet === 1 && (
        <div className="space-y-6">
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#0E2A4E]/60 border border-[#C9A45C]/20">
              <span className="text-[11px] uppercase text-white/50 tracking-wider">โควตารอบคงเหลือรวม</span>
              <div className="text-2xl font-serif-luxury font-bold text-[#DFBE7E]">
                {totalRemainingQuotas} รอบ
              </div>
              <span className="text-[10px] text-emerald-400">พร้อมให้บริการทันที</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0E2A4E]/60 border border-[#C9A45C]/20">
              <span className="text-[11px] uppercase text-white/50 tracking-wider">ยอดขายสะสมตามรายการบริการ</span>
              <div className="text-2xl font-serif-luxury font-bold text-[#DFBE7E]">
                ฿{(totalCumulativeSales / 1000000).toFixed(2)}M
              </div>
              <span className="text-[10px] text-white/60">รวม 8 แพ็กเกจหลัก</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0E2A4E]/60 border border-[#C9A45C]/20">
              <span className="text-[11px] uppercase text-white/50 tracking-wider">อัตรากำไรขั้นต้นเฉลี่ย</span>
              <div className="text-2xl font-serif-luxury font-bold text-[#DFBE7E]">
                36.8%
              </div>
              <span className="text-[10px] text-white/60">คำนวณจากสูตร (ราคา - ต้นทุน) / ราคา</span>
            </div>
          </div>

          {/* Main Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#C9A45C]/30 bg-[#071527]/90 shadow-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0E2A4E] text-[#DFBE7E] border-b border-[#C9A45C]/30 uppercase text-[11px] tracking-wider font-semibold">
                  <th className="p-3.5">รหัส (A)</th>
                  <th className="p-3.5">ชื่อบริการ (B)</th>
                  <th className="p-3.5 text-right">ราคาขาย/ครั้ง (C)</th>
                  <th className="p-3.5 text-right">ต้นทุน/ครั้ง (D)</th>
                  <th className="p-3.5 text-right">กำไรขั้นต้น (=C-D)</th>
                  <th className="p-3.5 text-right">มาร์จิ้น %</th>
                  <th className="p-3.5 text-center">เปิดขาย (E)</th>
                  <th className="p-3.5 text-center">จองแล้ว (F)</th>
                  <th className="p-3.5 text-center">โควตาคงเหลือ (=E-F)</th>
                  <th className="p-3.5 text-right">ยอดขายสะสม</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {services.map((s, idx) => {
                  const gp = s.price - s.cost;
                  const margin = ((gp / s.price) * 100).toFixed(1);
                  return (
                    <tr
                      key={s.id}
                      className="hover:bg-white/5 transition-colors font-light text-white/90"
                    >
                      <td className="p-3.5 font-mono text-[#DFBE7E] font-semibold">{s.id}</td>
                      <td className="p-3.5">
                        <div className="font-medium text-white">{s.name}</div>
                        <div className="text-[10px] text-white/50">{s.category}</div>
                      </td>
                      <td className="p-3.5 text-right font-mono font-medium text-white">
                        ฿{s.price.toLocaleString()}
                      </td>
                      <td className="p-3.5 text-right font-mono text-white/60">
                        ฿{s.cost.toLocaleString()}
                      </td>
                      <td className="p-3.5 text-right font-mono text-emerald-400 font-semibold">
                        +฿{gp.toLocaleString()}
                      </td>
                      <td className="p-3.5 text-right font-mono text-[#DFBE7E]">
                        {margin}%
                      </td>
                      <td className="p-3.5 text-center font-mono text-white/60">{s.quotaTotal}</td>
                      <td className="p-3.5 text-center font-mono text-white/80">{s.quotaBooked}</td>
                      <td className="p-3.5 text-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold font-mono ${
                            s.quotaRemaining <= 2
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          {s.quotaRemaining}
                        </span>
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-[#DFBE7E]">
                        ฿{s.cumulativeRevenue.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-[#0B1F3A] border-t-2 border-[#C9A45C]/40 text-white font-semibold">
                  <td colSpan={2} className="p-3.5 uppercase text-[#DFBE7E]">
                    รวมทั้งสิ้น (TOTAL FORMULA)
                  </td>
                  <td className="p-3.5 text-right font-mono text-white">
                    ฿{services.reduce((a, b) => a + b.price, 0).toLocaleString()}
                  </td>
                  <td className="p-3.5 text-right font-mono text-white/60">
                    ฿{services.reduce((a, b) => a + b.cost, 0).toLocaleString()}
                  </td>
                  <td className="p-3.5 text-right font-mono text-emerald-400">
                    +฿{(services.reduce((a, b) => a + (b.price - b.cost), 0)).toLocaleString()}
                  </td>
                  <td className="p-3.5 text-right font-mono text-[#DFBE7E]">36.8%</td>
                  <td className="p-3.5 text-center font-mono">{services.reduce((a, b) => a + b.quotaTotal, 0)}</td>
                  <td className="p-3.5 text-center font-mono">{services.reduce((a, b) => a + b.quotaBooked, 0)}</td>
                  <td className="p-3.5 text-center font-mono text-emerald-400 font-bold">{totalRemainingQuotas}</td>
                  <td className="p-3.5 text-right font-mono text-[#DFBE7E] font-bold">
                    ฿{totalCumulativeSales.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* SHEET 2: SALES TRANSACTIONS */}
      {activeSheet === 2 && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0E2A4E]/40 p-4 rounded-xl border border-white/10">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาชื่อลูกค้า, Booking ID, ประเทศ..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#071527] border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C9A45C]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-white/40" />
              <span className="text-xs text-white/60">สถานะ:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-[#071527] border border-white/20 text-xs text-white focus:outline-none focus:border-[#C9A45C]"
              >
                <option value="All">ทุกสถานะ (All)</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="In Escrow">In Escrow</option>
                <option value="Pending Concierge">Pending Concierge</option>
              </select>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#C9A45C]/30 bg-[#071527]/90 shadow-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0E2A4E] text-[#DFBE7E] border-b border-[#C9A45C]/30 uppercase text-[11px] tracking-wider font-semibold">
                  <th className="p-3.5">Booking ID</th>
                  <th className="p-3.5">วันที่</th>
                  <th className="p-3.5">รหัสบริการ</th>
                  <th className="p-3.5">ชื่อลูกค้า</th>
                  <th className="p-3.5">ประเทศ</th>
                  <th className="p-3.5">กลุ่มลูกค้า</th>
                  <th className="p-3.5 text-center">จำนวน</th>
                  <th className="p-3.5 text-right">ราคาขาย</th>
                  <th className="p-3.5 text-right">ส่วนลด</th>
                  <th className="p-3.5 text-right">ยอดรับชำระ</th>
                  <th className="p-3.5 text-center">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.bookingId} className="hover:bg-white/5 transition-colors font-light text-white/90">
                    <td className="p-3.5 font-mono text-[#DFBE7E] font-semibold">{tx.bookingId}</td>
                    <td className="p-3.5 text-white/70">{tx.date}</td>
                    <td className="p-3.5 font-mono text-white/80">{tx.serviceId}</td>
                    <td className="p-3.5 font-medium text-white">{tx.customerName}</td>
                    <td className="p-3.5 text-white/70">{tx.country}</td>
                    <td className="p-3.5 text-white/60 text-[11px]">{tx.segment}</td>
                    <td className="p-3.5 text-center font-mono">{tx.quantity}</td>
                    <td className="p-3.5 text-right font-mono text-white/80">
                      ฿{tx.unitPrice.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-right font-mono text-rose-300">
                      {tx.discount > 0 ? `-฿${tx.discount.toLocaleString()}` : '—'}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-[#DFBE7E]">
                      ฿{tx.netAmount.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          tx.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : tx.status === 'Confirmed'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : tx.status === 'In Escrow'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SHEET 3: CUSTOMER SEGMENTS */}
      {activeSheet === 3 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CUSTOMER_SEGMENTS.map((seg) => (
              <div
                key={seg.id}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#0E2A4E]/70 to-[#071527] border border-[#C9A45C]/30 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs text-[#DFBE7E] font-bold">{seg.id}</span>
                  <span className="px-3 py-1 rounded-full bg-[#247DA5]/30 border border-[#247DA5] text-xs font-bold text-white">
                    {seg.sharePercent}% ของลูกค้า
                  </span>
                </div>

                <h4 className="font-serif-luxury text-xl font-bold text-white">{seg.name}</h4>
                <p className="text-xs text-white/70 font-light leading-relaxed">{seg.description}</p>

                <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/50">ยอดใช้จ่ายเฉลี่ย:</span>
                    <span className="font-mono text-[#DFBE7E] font-semibold">฿{seg.avgSpend.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block mb-1">ตลาดหลัก (Key Markets):</span>
                    <div className="flex flex-wrap gap-1">
                      {seg.keyMarkets.map((m, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-white/80">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-white/50 block mb-1">บริการที่นิยม:</span>
                    <div className="flex flex-wrap gap-1">
                      {seg.preferredServices.map((p, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#C9A45C]/10 text-[10px] text-[#DFBE7E]">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SHEET 4: GOOGLE SHEETS FORMULAS & EXPORT HUB */}
      {activeSheet === 4 && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0E2A4E] to-[#071527] border border-[#C9A45C]/40">
            <h3 className="font-serif-luxury text-2xl font-bold text-white mb-2">
              คู่มือสูตรคำนวณสำหรับ Google Sheets / Excel
            </h3>
            <p className="text-xs text-white/70 max-w-2xl font-light leading-relaxed">
              สูตรทางการเงินทั้งหมดถูกออกแบบให้สามารถคัดลอกและนำไปวางใน Google Sheets หรือ Microsoft Excel ได้ทันที
              รองรับการคำนวณอัตโนมัติเมื่อมีการอัปเดตราคา ต้นทุน หรือบันทึกการจอง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GOOGLE_SHEETS_FORMULAS.map((f, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-[#071527] border border-[#C9A45C]/20 hover:border-[#C9A45C]/60 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{f.item}</span>
                  <button
                    onClick={() => handleCopyFormula(f.formula)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#C9A45C]/20 hover:bg-[#C9A45C]/40 text-[#DFBE7E] text-xs font-mono transition-colors"
                  >
                    {copiedFormula === f.formula ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">คัดลอกแล้ว</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>คัดลอกสูตร</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-2.5 rounded bg-black/40 border border-white/10 font-mono text-sm text-[#DFBE7E]">
                  {f.formula}
                </div>

                <p className="text-[11px] text-white/50">{f.note}</p>
              </div>
            ))}
          </div>

          {/* Drive & Sheets import guide */}
          <div className="p-6 rounded-xl bg-[#0B1F3A] border border-white/10 text-xs text-white/80 space-y-2">
            <div className="font-bold text-[#DFBE7E] flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-[#C9A45C]" />
              <span>ขั้นตอนการนำเข้าไฟล์ไปยัง Google Drive:</span>
            </div>
            <ol className="list-decimal pl-5 space-y-1 text-white/70 font-light">
              <li>กดปุ่ม <strong>"ส่งออกชีตนี้เป็น CSV"</strong> ที่มุมขวาบน</li>
              <li>เปิด <a href="https://drive.google.com" target="_blank" rel="noreferrer" className="text-[#247DA5] underline">Google Drive</a> และอัปโหลดไฟล์ CSV ที่ได้รับ</li>
              <li>คลิกขวาที่ไฟล์ เลือก <strong>"เปิดด้วย" (Open with) → Google Sheets</strong></li>
              <li>ไปที่เมนู <strong>ไฟล์ → บันทึกเป็น Google ชีต</strong> เพื่อใช้งานฟังก์ชันและสูตรคำนวณแบบสมบูรณ์</li>
            </ol>
          </div>
        </div>
      )}

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0B1F3A] border border-[#C9A45C]/50 rounded-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                เพิ่มบันทึกการจองใหม่ (New Booking)
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full border border-white/20 text-white/60 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTransaction} className="space-y-4 text-xs">
              <div>
                <label className="text-white/70 block mb-1">เลือกบริการ:</label>
                <select
                  value={newTx.serviceId}
                  onChange={(e) => setNewTx({ ...newTx, serviceId: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#071527] border border-white/20 text-white focus:outline-none focus:border-[#C9A45C]"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.id} — {s.name} (฿{s.price.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white/70 block mb-1">ชื่อลูกค้า (VIP Guest Name):</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Khun Thanin, Sheikh Al-Maktoum"
                  value={newTx.customerName}
                  onChange={(e) => setNewTx({ ...newTx, customerName: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-[#071527] border border-white/20 text-white focus:outline-none focus:border-[#C9A45C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/70 block mb-1">ประเทศ:</label>
                  <input
                    type="text"
                    value={newTx.country}
                    onChange={(e) => setNewTx({ ...newTx, country: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-[#071527] border border-white/20 text-white focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
                <div>
                  <label className="text-white/70 block mb-1">จำนวนรอบ:</label>
                  <input
                    type="number"
                    min={1}
                    value={newTx.quantity}
                    onChange={(e) => setNewTx({ ...newTx, quantity: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-[#071527] border border-white/20 text-white focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/70 block mb-1">ส่วนลด (THB):</label>
                  <input
                    type="number"
                    min={0}
                    value={newTx.discount}
                    onChange={(e) => setNewTx({ ...newTx, discount: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-[#071527] border border-white/20 text-white focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
                <div>
                  <label className="text-white/70 block mb-1">สถานะการจอง:</label>
                  <select
                    value={newTx.status}
                    onChange={(e) => setNewTx({ ...newTx, status: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg bg-[#071527] border border-white/20 text-white focus:outline-none focus:border-[#C9A45C]"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Escrow">In Escrow</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending Concierge">Pending Concierge</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-white/20 text-white/70 hover:text-white"
                >
                  ยกเลิก
                </button>
                <button type="submit" className="gold-btn px-6 py-2 rounded-lg font-semibold uppercase">
                  บันทึกการจอง
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
