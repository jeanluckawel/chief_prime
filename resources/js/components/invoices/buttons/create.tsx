import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { CirclePlusIcon } from 'lucide-react';

export default function CreateInvoiceButton() {
    return (
        <Link
            href={route('invoices.create')}
            className="hover:cursor-pointer"
        >
            <Button className="hover:cursor-pointer" size="sm">
                <CirclePlusIcon/>
                Save Invoice
            </Button>
        </Link>
    )
}
