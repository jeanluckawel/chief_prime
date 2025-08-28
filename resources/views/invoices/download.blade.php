<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice {{ $invoice->invoice_number }}</title>
    <script src="https://cdn.tailwindcss.com"></script>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
</head>
<body class="bg-gray-100 p-4 sm:p-6">


<div id="pdf-content" class="mx-auto w-full max-w-[794px] space-y-6 p-4 sm:p-8 lg:p-12 bg-white shadow-md rounded-lg text-[13px] leading-relaxed">


    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        <div class="flex flex-col space-y-2">
            <div class="flex items-center gap-4">
                <img src="/img/2025061815274361.jpg" alt="Logo CHIEFPRIME" class="h-10 object-contain" />
                <h1 class="text-lg sm:text-xl font-bold tracking-tight">CHIEFPRIME SARL</h1>
            </div>
            <div class="text-gray-500 text-xs sm:text-sm">
                <p>Mukaka n°439B, Quartier Mutoshi</p>
                <p>Kolwezi, Lualaba - DRC</p>
                <p>RCCM: CD/KNG/RCCM/24-B-00348</p>
                <p>NIF: A2403258T</p>
                <p>ID.NAT: 01-D3501-N52469L</p>
            </div>
        </div>

        <div class="flex flex-col">
            <p class="font-semibold text-base sm:text-xl">Invoice No: {{ $invoice->invoice_number }}</p>
            <div class="mt-2 text-xs sm:text-sm text-gray-500 space-y-1">
                <p class="flex justify-between gap-2">Date: <span>{{ $invoice->invoice_date ? \Carbon\Carbon::parse($invoice->invoice_date)->format('d/m/Y') : '-' }}</span></p>
                <p class="flex justify-between gap-2">Due: <span>{{ $invoice->due_date ? \Carbon\Carbon::parse($invoice->due_date)->format('d/m/Y') : '-' }}</span></p>
{{--                <p class="flex justify-between gap-2">Terms: <span>14 days</span></p>--}}
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
            <h2 class="text-sm font-semibold uppercase text-gray-500">From</h2>
            <div class="text-xs sm:text-sm">
                <p class="font-semibold">CHIEFPRIME SARL</p>
                <p>info@chiefprime.com</p>
                <p>+243812345678</p>
            </div>
        </div>

        <div class="space-y-2">
            <h2 class="text-sm font-semibold uppercase text-gray-500">Bill To</h2>
            @if($invoice->customer)
                <div class="text-xs sm:text-sm">
                    <p class="font-semibold">{{ $invoice->customer->name }}</p>
                    <p>{{ $invoice->customer->email }}</p>
                    <p>{{ $invoice->customer->phone }}</p>
                    <p>{{ $invoice->customer->address }}</p>
                </div>
            @endif
        </div>
    </div>


    <div class="mb-6 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table class="min-w-full border-collapse text-xs sm:text-sm">
            <thead class="bg-gray-100">
            <tr>
                <th class="border-b border-gray-200 p-3 text-gray-600 text-left font-semibold uppercase">Description</th>
                <th class="border-b border-gray-200 p-3 text-gray-600 text-right font-semibold uppercase">Qty</th>
                <th class="border-b border-gray-200 p-3 text-gray-600 text-right font-semibold uppercase">Unit</th>
                <th class="border-b border-gray-200 p-3 text-gray-600 text-right font-semibold uppercase">Total</th>
            </tr>
            </thead>
            <tbody>
            @foreach($invoice->items as $item)
                <tr class="even:bg-gray-50 hover:bg-gray-100 transition">
                    <td class="border-b border-gray-200 p-3">{{ $item->description }}</td>
                    <td class="border-b border-gray-200 p-3 text-right">{{ $item->quantity }}</td>
                    <td class="border-b border-gray-200 p-3 text-right">${{ number_format($item->unit_price, 2) }}</td>
                    <td class="border-b border-gray-200 p-3 text-right font-semibold">${{ number_format($item->quantity * $item->unit_price, 2) }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>


    <div class="flex justify-end">
        <div class="w-full sm:w-64 bg-gray-50 border rounded-lg shadow-sm p-4 space-y-2">
            <div class="flex justify-between text-gray-700 text-sm sm:text-base">
                <span>Subtotal</span>
                <span class="font-medium">${{ number_format($invoice->subtotal, 2) }}</span>
            </div>
            <div class="flex justify-between text-gray-700 text-sm sm:text-base">
                <span>Tax ({{ $invoice->tax }}%)</span>
                <span class="font-medium">${{ number_format($invoice->subtotal * $invoice->tax / 100, 2) }}</span>
            </div>
            <div class="border-t pt-2"></div>
            <div class="flex justify-between text-base sm:text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${{ number_format($invoice->total, 2) }}</span>
            </div>
        </div>
    </div>

    <br>
    <br>
    <br>


    <div class="text-gray-500 text-xs sm:text-sm">
        <p class="font-semibold text-blue-600">Bank details</p>
        <p>RAWBANK</p>
        <p>Account: 05100-05139-01118805001-15</p>
        <p>Holder: CHIEFPRIME SARL</p>
        <p>SWIFT: RAWBCDRC</p>
    </div>

    <p class="mt-6 text-xs italic text-gray-500 sm:text-sm">
        Thanks Chiefprime for your business!
    </p>
</div>


<div class="flex justify-center mt-6">
    <button id="downloadBtn" class="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-lg shadow">
        📥 Download PDF
    </button>
</div>

<script>
    document.getElementById("downloadBtn").addEventListener("click", async () => {
        const { jsPDF } = window.jspdf;
        const invoice = document.getElementById("pdf-content");

        const canvas = await html2canvas(invoice, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("invoice_{{ $invoice->invoice_number }}.pdf");
    });
</script>
</body>
</html>
