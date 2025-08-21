import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { DataTable } from '@/components/data-table';
import { column } from '@/components/customers/column';
import { Customer } from '@/types/domain';
import CreateCustomer from '@/components/customers/buttons/create';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: '/customers',
    },
];

export default function Customers({
    customers
}: {
    customers: Customer[];
}) {
    const columnVisibility = {
        address: false,
        city: false,
        state: false,
        zip: false,
        country: false,
        created_at: false,
        updated_at: false,
    }

    console.log("Customer log from frontend");
    console.log(customers);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <Heading title="Customers" description="Manage your customers" />

                <div className="">
                    <DataTable
                        data={customers}
                        columns={column}
                        initialColumnVisibility={columnVisibility}
                        createTrigger={<CreateCustomer/>}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
