import { InertiaFormProps } from '@inertiajs/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, CirclePlusIcon } from 'lucide-react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
    useDebounceCallback,
    useDebounceValue
} from 'usehooks-ts';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { InvoiceRequest } from '@/types/domain';
import { toast } from 'sonner';


export default function InvoiceForm({
    form,
    customers
}: {
    form: InertiaFormProps<InvoiceRequest>
    customers: Array<{id: number, name: string}>
}) {
    const { data, setData, errors, post, processing,  } = form;

    const [subTotal] = useDebounceValue(
        data.items.reduce(
            (acc, item) => acc + (item.quantity ?? 0) * (item.unit_price ?? 0), 0
        ),
        500
    );
    const [tax] = useDebounceValue(subTotal * ((data.tax ?? 0) / 100), 500);
    const [discount] = useDebounceValue(subTotal * ((data.discount ?? 0) / 100), 500);

    const computeInlineItemTotal = useDebounceCallback(
        (items: { description: string, quantity: number, unit_price: number, tax_rate: number }[]) => {
            items.forEach((it, index) => {
                setData(`items.${index}.total`, (it.unit_price ?? 0) * (it.quantity ?? 1))
            })

            setData(
                "subtotal",
                data.items.reduce(
                    (acc, item) => acc + (item.quantity ?? 0) * (item.unit_price ?? 0), 0
                )
            )
        }
    )

    const computeTotal = useDebounceCallback(
        (subTotal, tax, discount) => (
            setData("total", subTotal + tax - discount)
        ),
        500
    )

    computeInlineItemTotal(data.items)
    computeTotal(subTotal, tax, discount)

    const addItem = () => {
        setData("items", [
            ...data.items,
            { description: "", quantity: 1, unit_price: 0, tax_rate: 0, total: 0 }
        ]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route("invoices.store"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Invoice created successfully!");
            },
            onError: (r) => {
                toast.error("Failed to create invoice. Please try again.")
                console.log(r);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
            {/* Left side: Invoice details */}
            <h2 className="font-semibold">Invoice Details</h2>
            <div className="space-y-4">
                <div className="flex flex-col gap-4 lg:flex-row">
                    {/* Customer */}
                    <div className="lg:flex-1/2">
                        <Label htmlFor="customer_id">Customer</Label>
                        <Select
                            value={data.customer_id.toString()}
                            onValueChange={(value) => setData('customer_id', parseInt(value))}
                            name="customer_id"
                        >
                            <SelectTrigger className="rounded-md border p-2">
                                <SelectValue placeholder="Select customer" />
                            </SelectTrigger>
                            <SelectContent>
                                {customers.map((c) => (
                                    <SelectItem key={c.id} value={c.id.toString()}>
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.customer_id && <p className="text-sm text-red-500">{errors.customer_id}</p>}
                    </div>

                    {/* Invoice Number */}
                    <div className="lg:flex-1/2">
                        <Label htmlFor="invoice_number">Invoice Number</Label>
                        <Input
                            value={data.invoice_number}
                            onChange={(e) => setData('invoice_number', e.target.value)}
                            id="invoice_number"
                            name="invoice_number"
                            placeholder="INV-0001"
                        />
                        {errors.invoice_number && <p className="text-sm text-red-500">{errors.invoice_number}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row">
                    {/* Invoice Date */}
                    <div className="flex flex-col gap-2 lg:flex-1/2">
                        <Label htmlFor="invoice_date">Invoice Date</Label>
                        <Popover>
                            <PopoverTrigger className="" asChild>
                                <Button
                                    variant="outline"
                                    data-empty={!data.invoice_date}
                                    className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                                >
                                    <CalendarIcon />
                                    {data.invoice_date ? format(data.invoice_date, 'PPP') : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={data.invoice_date} onSelect={(value) => setData('invoice_date', value as Date)} />
                            </PopoverContent>
                        </Popover>
                        {errors.invoice_date && <p className="text-sm text-red-500">{errors.invoice_date}</p>}
                    </div>

                    {/* Due Date */}
                    <div className="flex flex-col gap-2 lg:flex-1/2">
                        <Label htmlFor="due_date">Due Date</Label>
                        <Popover>
                            <PopoverTrigger className="" asChild>
                                <Button
                                    variant="outline"
                                    data-empty={!data.due_date}
                                    className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                                >
                                    <CalendarIcon />
                                    {data.due_date ? format(data.due_date, 'PPP') : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={data.due_date} onSelect={(value) => setData('due_date', value as Date)} />
                            </PopoverContent>
                        </Popover>
                        {errors.due_date && <p className="text-sm text-red-500">{errors.due_date}</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row">
                    {/* Payment Method */}
                    <div className="lg:w-1/2">
                        <Label>Payment Method</Label>
                        <Select name="payment_method">
                            <SelectTrigger>
                                <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="bank transfer">Bank Transfer</SelectItem>
                                <SelectItem value="mobile money">Mobile Money</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.payment_method && <p className="text-sm text-red-500">{errors.payment_method}</p>}
                    </div>
                    <div className="hidden lg:block lg:flex-1/2" />
                </div>
            </div>

            <hr className="lg:my-2" />

            {/* Right side: Items + Totals */}
            <h2 className="font-semibold">Items</h2>
            <div className="space-y-4">
                <Table>
                    <TableHeader>
                        <TableRow className="font-semibold">
                            <TableCell className="w-full">Description</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Unit price</TableCell>
                            <TableCell>Tax%</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.items.map((_item, idx) => (
                            <TableRow key={idx}>
                                <TableCell className="border p-0.5">
                                    <Input
                                        className="rounded-none border-none shadow-none"
                                        name={`items.${idx}.description}`}
                                        value={data.items[idx].description}
                                        onChange={(e) => setData(`items.${idx}.description`, e.target.value)}
                                    />
                                </TableCell>
                                <TableCell className="border p-0.5">
                                    <Input
                                        className="min-w-24 rounded-none border-none shadow-none"
                                        type="number"
                                        min={1}
                                        name={`items.${idx}.quantity}`}
                                        value={data.items[idx].quantity}
                                        onChange={(e) => setData(`items.${idx}.quantity`, parseInt(e.target.value))}
                                    />
                                </TableCell>
                                <TableCell className="border p-0.5">
                                    <Input
                                        className="min-w-24 rounded-none border-none shadow-none"
                                        type="number"
                                        min={1}
                                        name={`items.${idx}.unit_price}`}
                                        value={data.items[idx].unit_price}
                                        onChange={(e) => setData(`items.${idx}.unit_price`, parseFloat(e.target.value))}
                                    />
                                </TableCell>
                                <TableCell className="border p-0.5">
                                    <Input
                                        className="min-w-18 rounded-none border-none shadow-none"
                                        type="number"
                                        min={0}
                                        max={100}
                                        name={`items.${idx}.tax_rate}`}
                                        value={data.items[idx].tax_rate}
                                        onChange={(e) => setData(`items.${idx}.tax_rate`, parseFloat(e.target.value))}
                                    />
                                </TableCell>
                                <TableCell className="border px-2 py-0.5">
                                    <span className="hover:cursor-pointer">
                                        <TrashIcon className="size-4 text-muted-foreground transition-all duration-200 hover:text-destructive" />
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex justify-end">
                    <Button className="place-self-end p-0 px-0 text-xs hover:cursor-pointer" type="button" variant="link" onClick={addItem}>
                        <CirclePlusIcon className="size-3" />
                        Add Item
                    </Button>
                </div>

                <hr />
                <div className="w-fit space-y-2 pt-4">
                    <div className="flex items-center justify-between gap-2">
                        <span>Subtotal:</span>
                        <span className="ml-2">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subTotal)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <p>Tax %:</p>
                        <Input
                            className="w-18"
                            type="number"
                            min={0}
                            max={100}
                            name="tax"
                            value={data.tax}
                            onChange={(e) => setData('tax', parseFloat(e.target.value ?? '0'))}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <p>Discount %:</p>
                        <Input
                            className="w-18"
                            type="number"
                            min={0}
                            max={100}
                            name="discount"
                            value={data.discount}
                            onChange={(e) => setData('discount', parseFloat(e.target.value ?? '0'))}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <p className="">Total:</p>
                        <span className="ml-2 font-bold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.total)}</span>
                    </div>
                </div>
            </div>

            <div className="bottom-0 flex justify-end gap-2">
                <Button className="place-self-end" type="submit" disabled={processing}>
                    {processing ? 'Saving...' : 'Save Invoice'}
                </Button>
            </div>
        </form>
    );
}
