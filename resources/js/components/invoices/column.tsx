import { ColumnDef } from "@tanstack/react-table"
import { Customer } from '@/types/domain';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from 'react-day-picker';
import { FileDown, MoreHorizontal } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Fragment } from 'react';


export type Invoice = {
    id: number
    invoice_number: string
    type: "invoice" | "quotation"
    invoice_date: string
    due_date: string | null
    customer_id: number
    customer: Customer
    payment_method: "cash" | "bank transfer" | "mobile money" | null
    subtotal: number
    tax: number
    discount: number
    total: number
    status: "draft" | "sent" | "paid" | "cancelled"
    items: {
        id: number
        description: string
        quantity: number
        unit_price: number
        tax_rate: number
    }[]
}

export const invoiceColumns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "invoice_number",
        header: "Invoice #",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "total",
        header: () => (
            <div className="w-full text-right">
                <span>Total</span>
            </div>
        ),
        cell: ({ row }) =>(
            <div className="w-full text-right">
                <span className="w-full slashed-zero text-right">
                {
                    new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    }).format(row.getValue("total"))
                }
            </span>
            </div>
        ),
    },
    {
        accessorKey: "customer.name",
        header: "Customer",
    },
    {
        accessorKey: "invoice_date",
        header: "Date",
        cell: ({ row }) => new Date(row.getValue("invoice_date")).toLocaleDateString(),
    },
    {
        accessorKey: "due_date",
        header: "Due Date",
        cell: ({ row }) =>
            row.getValue("due_date")
                ? new Date(row.getValue("due_date")).toLocaleDateString()
                : "-",
    },
    {
        accessorKey: "payment_method",
        header: "Payment",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as Invoice["status"]
            const colors: Record<Invoice["status"], string> = {
                draft: "bg-gray-200 text-gray-800",
                sent: "bg-blue-200 text-blue-800",
                paid: "bg-green-200 text-green-800",
                cancelled: "bg-red-200 text-red-800",
            }
            return (
                <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status]}`}>
          {status}
        </span>
            )
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const invoiceId = row.original.id
            const customerId = row.original.customer_id

            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <a href={`/invoices/${invoiceId}`} className="w-full">
                                    View
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <a href={route('customers.invoices', customerId )} className="w-full">
                                    All invoices
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={route('invoices.store')}
                                    className="flex items-center gap-2 w-full"
                                >
                                    Create
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                                <a
                                    href={route('invoices.download', invoiceId)}
                                    className="flex items-center gap-2 w-full"
                                >
                                    <FileDown className="h-4 w-4" />
                                    Download
                                </a>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    }
]
