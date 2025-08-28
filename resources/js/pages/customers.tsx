import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { DataTable } from '@/components/data-table';
import { column } from '@/components/customers/column';
import CreateCustomer from '@/components/customers/buttons/create';
import { Customer } from '@/types/domain';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: '/customers',
    },
];

export default function Customers({ customers }: { customers: { data: Customer[], [key: string]: unknown } }) {
    const columnVisibility = {
        address: false,
        city: false,
        state: false,
        zip: false,
        country: false,
        created_at: false,
        updated_at: false,
    };

    console.log('Customer log from frontend');
    console.log(customers);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Heading title="Customers" description="Manage your customers " />

                <p>
                    <a
                        href="/invoices/create"
                        className="text-blue-600 hover:underline"
                    >
                        Save Invoice
                    </a>
                </p>

                <div className="">
                    <DataTable
                        data={customers?.data}
                        columns={column}
                        initialColumnVisibility={columnVisibility}
                        createTrigger={<CreateCustomer />}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
