import React from "react";
import {
    Customer,
    InvoiceRequest } from '@/types/domain';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function money(n: number) {
    return new Intl.NumberFormat(
        'en-US',
        {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ).format(n);
}

export default function InvoiceViewComponent({
    invoice,
    customers,
}: {
    invoice: InvoiceRequest
    customers: Customer[]
}) {
    console.log(customers);
    const customer = invoice.customer_id ? customers.find(it => it.id === invoice.customer_id): null

    return (
        <div className="mx-auto max-w-4xl space-y-6 p-8 bg-background shadow-sm text-[13px] leading-relaxed print:shadow-none print:p-0">
            <div className="flex items-start justify-between">
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-4">
                        <img
                            src="/img/2025061815274361.jpg"
                            alt="Logo CHIEFPRIME"
                            className="h-10 object-contain"
                        />
                        <h1 className="text-xl font-bold tracking-tight ">
                            CHIEFPRIME SARL
                        </h1>
                    </div>
                    <div className="text-muted-foreground text-xs">
                        <p>Mukaka n°439B, Quartier Mutoshi</p>
                        <p>Kolwezi, Lualaba - DRC</p>
                        <p>RCCM: CD/KNG/RCCM/24-B-00348</p>
                        <p>NIF: A2403258T</p>
                        <p>ID.NAT: 01-D3501-N52469L</p>
                    </div>
                </div>
                <div className="mt-1 flex flex-col">
                    <p className="flex justify-between items-center gap-2 font-semibold text-xl">Invoice No: {invoice.invoice_number}</p>

                    <div className="place-self-end w-fit mt-2 text-xs inline-block text-muted-foreground">
                        <p className="flex justify-between items-center gap-2">Date: <span>{invoice.invoice_date ? new Date(invoice.invoice_date).toLocaleDateString(): '-'}</span></p>
                        <p className="flex justify-between items-center gap-2">Due: <span>{invoice.due_date ? new Date(invoice.due_date).toLocaleDateString(): '-'}</span></p>
                        <p className="flex justify-between items-center gap-2">Terms: <span>14 days</span></p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <h2 className="text-sm font-semibold uppercase text-muted-foreground">From</h2>
                    <div className="text-xs">
                        <p className="font-semibold text-sm">CHIEFPRIME SARL</p>
                        <p>info@chiefprime.com</p>
                        <p>+243812345678</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-sm font-semibold uppercase text-muted-foreground">Bill To</h2>
                    {
                        customer && (
                            <div className="text-xs">
                                <p className="font-semibold text-sm">{customer?.name}</p>
                                <p>{customer?.email}</p>
                                <p>{customer?.phone}</p>
                                <p>{customer?.address}</p>
                            </div>
                        )
                    }
                </div>
            </div>

            {/* Table */}
            <div className="mb-6 overflow-x-auto rounded border">
                <Table className="min-w-full border-collapse">
                    <TableHeader className="">
                    <TableRow>
                        <TableHead className="border-b p-2 text-xs text-muted-foreground text-left font-semibold w-full">Description</TableHead>
                        <TableHead className="border-b p-2 text-xs text-muted-foreground text-right font-semibold">Qty</TableHead>
                        <TableHead className="border-b p-2 text-xs text-muted-foreground text-right font-semibold">Unit</TableHead>
                        <TableHead className="border-b p-2 text-xs text-muted-foreground text-right font-semibold">Total</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            invoice.items.map((item, index) => (
                                <TableRow key={index} className="even:bg-muted/50">
                                    <TableCell className="border-b p-2">{item.description}</TableCell>
                                    <TableCell className="border-b p-2 text-right text-nowrap">{item.quantity}</TableCell>
                                    <TableCell className="border-b p-2 text-right text-nowrap">{money(item.unit_price)}</TableCell>
                                    <td className="border-b p-2 text-right text-nowrap">{money(item.quantity * item.unit_price)}</td>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-end">
                <div className="min-w-fit w-50 max-w-xs space-y-1">
                    <div className="flex justify-between"><span>Subtotal</span><span>{money(invoice.subtotal)}</span></div>
                    <div className="flex justify-between"><span>Tax {invoice.tax}%</span><span>{money(invoice.subtotal * invoice.tax / 100)}</span></div>
                    <div className="mt-1 border-t pt-1 font-semibold">
                        <div className="flex justify-between"><span>Total</span><span>{money(invoice.total)}</span></div>
                    </div>
                </div>
            </div>

            <div className="text-muted-foreground text-xs">
                <p className="font-semibold text-primary text-sm">Bank details</p>
                <p>RAWBANK</p>
                <p>Account: 05100-05139-01118805001-15</p>
                <p>Holder: CHIEFPRIME SARL</p>
                <p>SWIFT: RAWBCDRC</p>
            </div>

            <p className="mt-6 text-center text-xs italic text-muted-foreground">
                Thanks
            </p>
        </div>
    );
}
