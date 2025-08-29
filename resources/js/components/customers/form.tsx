import { Form, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function CustomersForm({
    onSuccess
}: {
    onSuccess?: () => void;
}) {
    const { errors } = usePage().props

    useEffect(() => {
        console.log(errors)
    }, [errors])


    return (
        <div>
            <Form
                onSubmit={console.log}
                id="customer-form" action={route('customers.store')}
                method="post"
                onSuccess={onSuccess}
                resetOnSuccess
            >
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-3 lg:flex-row">
                        {/* Name */}
                        <div className="flex-1/2 space-y-0.5">
                            <Label className="block text-xs">Name <RequiredFieldIndicator/></Label>
                            <Input name="name" className="rounded-xs" placeholder="Enter customer name" />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* Type */}
                        <div className="flex-1/2 space-y-0.5">
                            <Label className="block text-xs">Type <RequiredFieldIndicator/></Label>
                            <Select name="type" defaultValue="individual">
                                <SelectTrigger className="rounded-xs">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xs">
                                    <SelectItem value="individual">Individual</SelectItem>
                                    <SelectItem value="company">Company</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:flex-row">
                        {/* Email */}
                        <div className="flex-1/2 space-y-0.5">
                            <Label className="block text-xs">Email <RequiredFieldIndicator/></Label>
                            <Input type="email" name="email" className="rounded-xs" placeholder="Enter customer email" />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div className="flex-1/2 space-y-0.5">
                            <label className="block text-xs">Phone</label>
                            <Input name="phone" className="rounded-xs" placeholder="Enter customer phone" />
                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-0.5">
                        <Label className="block text-xs">Address</Label>
                        <Textarea name="address" className="rounded-xs" placeholder="Enter customer address" />
                        {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                    </div>

                    <div className="flex flex-col gap-3 lg:flex-row">
                        {/* Country */}
                        <div className="flex-1/2 space-y-0.5">
                            <Label className="block text-xs">Country</Label>
                            <Input name="country" className="rounded-xs" placeholder="Enter customer country" />
                            {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}
                        </div>

                        {/* City */}
                        <div className="flex-1/2 space-y-0.5">
                            <Label className="block text-xs">City</Label>
                            <Input name="city" className="rounded-xs" placeholder="Enter customer city" />
                            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:flex-row">
                        {/* NIF */}
                        <div className="flex-1/2 space-y-0.5">
                            <Label className="block text-xs">NIF</Label>
                            <Input name="nif" className="rounded-xs" placeholder="Enter customer NIF" />
                            {errors.nif && <p className="text-xs text-red-500 mt-1">{errors.nif}</p>}
                        </div>

                        {/* RCCM */}
                        <div className="flex-1/2 space-y-0.5">
                            <Label className="block text-xs">RCCM</Label>
                            <Input name="rccm" className="rounded-xs" placeholder="Enter customer RCCM" />
                            {errors.rccm && <p className="text-xs text-red-500 mt-1">{errors.rccm}</p>}
                        </div>
                    </div>

                    {/* IDNAT */}
                    <div className="space-y-0.5">
                        <Label className="block text-xs">IDNAT</Label>
                        <Input name="idnat" className="rounded-xs" placeholder="Enter customer IDNAT" />
                        {errors.idnat && <p className="text-xs text-red-500 mt-1">{errors.idnat}</p>}
                    </div>
                </div>
            </Form>
        </div>
    )
}

const RequiredFieldIndicator = () => <span className="text-red-500">*</span>;
