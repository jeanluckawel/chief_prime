import Layout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { Invoice } from '@/components/invoices/column';
import ViewInvoice from '@/components/invoices/view';
import { BreadcrumbItem } from '@/types';


export default function show({
    invoice
}: {
    invoice: Invoice
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Invoices',
            href: '/invoices',
        },
        {
            title: `${invoice.invoice_number}`,
            href: `/invoices/show/${invoice.id}`,
        },
    ];

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title="show"/>
            <ViewInvoice invoice={invoice} />
        </Layout>
    )
}
