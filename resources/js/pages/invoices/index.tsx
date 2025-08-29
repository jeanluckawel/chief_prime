import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head,
    router
} from '@inertiajs/react';
import Heading from '@/components/heading';
import { DataTable } from '@/components/data-table';
import { Invoice, invoiceColumns } from '@/components/invoices/column';
import CreateInvoiceButton from '@/components/invoices/buttons/create';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoices',
        href: '/invoices',
    },
];

export default function Index({ invoices }: { invoices: { data: Invoice[], [key: string]: unknown } }) {
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
    console.log(invoices);

    const onRowClick = (invoice: Invoice) => {
        router.visit(route("invoices.show", invoice))
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Heading title="Invoices" description="Manage your invoices" />

                <div className="">
                    <DataTable
                        data={invoices?.data}
                        columns={invoiceColumns}
                        initialColumnVisibility={columnVisibility}
                        createTrigger={<CreateInvoiceButton />}
                        rowClassName="hover:cursor-pointer"
                        onRowClick={onRowClick}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
