import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { DataTable } from '@/components/data-table';
import { Invoice, invoiceColumns } from '@/components/invoices/column';

export default function CustomerInvoices({
                                             customer,
                                             invoices,
                                         }: {
    customer: { id: number; name: string };
    invoices: { data: Invoice[], [key: string]: unknown };
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Customers',
            href: '/customers',
        },
        {
            title: customer.name,
            href: `/customers/${customer.id}`,
        },
        {
            title: 'Invoices',
            href: route('customers.invoices', { customer: customer.id }),
        },
    ];

    const columnVisibility = {
        address: false,
        city: false,
        state: false,
        zip: false,
        country: false,
        created_at: false,
        updated_at: false,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Invoices of ${customer.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Heading title={`Invoices for ${customer.name}`} description="Manage customer invoices" />

                <DataTable
                    data={invoices?.data}
                    columns={invoiceColumns}
                    initialColumnVisibility={columnVisibility}
                />
            </div>
        </AppLayout>
    );
}
