import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head,
    useForm
} from '@inertiajs/react';
import Heading from '@/components/heading';
import { Customer } from '@/types/domain';
import InvoiceForm from '@/components/invoices/forms/create';
import InvoiceViewComponent from '@/components/invoices';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create invoice',
        href: '/invoices/create',
    },
];

type Props = {
    customers: Customer[]
}
export default function Create({ customers }: Props) {
    const form = useForm({
        customer_id: customers.length > 0 ? customers[0].id: 1,
        type: "invoice",
        invoice_number: "",
        invoice_date: new Date(),
        due_date: new Date(),
        payment_method: "bank transfer",
        tax: 16,
        discount: 0,
        subtotal: 0,
        total: 0,
        items: [
            { description: "", quantity: 1, unit_price: 0, tax_rate: 0, total: 0 },
        ],
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 lg:p-0">
                <div className="flex flex-col lg:flex-row gap-4 h-full">
                    <section className="flex-1 lg:flex-1/2 w-full h-full lg:p-4">
                        <Heading title="Invoices" description="Manage your invoices" />

                        <InvoiceForm form={form} customers={customers}/>
                    </section>
                    <section className="hidden lg:block lg:flex-1/2 lg:h-full w-full bg-sidebar lg:p-4">
                        <InvoiceViewComponent invoice={form.data} customers={customers}/>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
