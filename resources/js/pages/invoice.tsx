import React from "react";

function money(n: number) {
  return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + " FC";
}

export default function Invoice() {
  return (
    <div className="mx-auto max-w-4xl bg-white p-8 shadow-sm text-[13px] leading-relaxed print:shadow-none print:p-0">

      <div className="mb-6 flex items-start justify-between">
          <div className="flex-1 flex items-center ">
            <img
              src="/img/2025061815274361.jpg"
              alt="Logo CHIEFPRIME"
              className="h-30 object-contain"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight text-gray-800">
              CHIEFPRIME SARL
            </h1>
            <p>Mukaka n°439B, Quartier Mutoshi</p>
            <p>Kolwezi, Lualaba - DRC</p>
            <p>RCCM: CD/KNG/RCCM/24-B-00348</p>
            <p>NIF: A2403258T</p>
            <p>ID.NAT: 01-D3501-N52469L</p>
          </div>
          <div className="flex-1 text-center">
            <div className="rounded border px-3 py-2 inline-block">
              <p><span className="font-semibold">Invoice No:</span> INV-2025-001</p>
              <p><span className="font-semibold">Date:</span> 2025-08-22</p>
              <p><span className="font-semibold">Due:</span> 2025-09-05</p>
              <p><span className="font-semibold">Terms:</span>14 days</p>
            </div>
          </div>
        </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h2 className="mb-1 text-sm font-semibold uppercase text-gray-600">Bill To</h2>
          <div className="rounded border p-3">
            <p className="font-semibold">Solutic SA</p>
            <p>contact@solutic.net</p>
            <p>+243974453545</p>
            <p>Avenue Lumumba 45, Kolwezi, DRC</p>
          </div>
        </div>
        <div>
          <h2 className="mb-1 text-sm font-semibold uppercase text-gray-600">From</h2>
          <div className="rounded border p-3">
            <p className="font-semibold">CHIEFPRIME SARL</p>
            <p>info@chiefprime.com</p>
            <p>+243812345678</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mb-6 overflow-x-auto rounded border">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="border-b p-2 text-left">Description</th>
              <th className="border-b p-2 text-right">Qty</th>
              <th className="border-b p-2 text-right">Unit</th>
              <th className="border-b p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border-b p-2">Website development</td>
              <td className="border-b p-2 text-right">1</td>
              <td className="border-b p-2 text-right">{money(1500)}</td>
              <td className="border-b p-2 text-right">{money(1500)}</td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border-b p-2">Hosting (12 months)</td>
              <td className="border-b p-2 text-right">1</td>
              <td className="border-b p-2 text-right">{money(200)}</td>
              <td className="border-b p-2 text-right">{money(200)}</td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border-b p-2">Maintenance</td>
              <td className="border-b p-2 text-right">1</td>
              <td className="border-b p-2 text-right">{money(300)}</td>
              <td className="border-b p-2 text-right">{money(300)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-6 flex justify-end">
        <div className="w-full max-w-xs space-y-1">
          <div className="flex justify-between"><span>Subtotal</span><span>{money(2000)}</span></div>
          <div className="flex justify-between"><span>Tax 16%</span><span>{money(320)}</span></div>
          <div className="mt-1 border-t pt-1 font-semibold">
            <div className="flex justify-between"><span>Total</span><span>{money(2320)}</span></div>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded border p-3 text-sm">
        <p className="font-semibold">Bank details</p>
        <p>RAWBANK</p>
        <p>Account: 05100-05139-01118805001-15</p>
        <p>Holder: CHIEFPRIME SARL</p>
        <p>SWIFT: RAWBCDRC</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6 text-xs text-gray-600 print:mt-6">
        <div className="space-y-1">
          <p className="font-semibold">Customer Signature</p>
          <div className="h-16 rounded border"></div>
          <p className="text-[11px] italic">Signed by Solutic Sa</p>
        </div>
        <div className="space-y-1 text-right">
          <p className="font-semibold">Company Signature</p>
          <div className="h-16 rounded border"></div>
          <p className="text-[11px] italic">For CHIEFPRIME SARL</p>
        </div>
      </div>

      <p className="mt-6 text-center text-xs italic text-gray-500">
        Thanks
      </p>
    </div>
  );
}
