import { Dialog, DialogContent,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CustomersForm from '@/components/customers/form';
import { Button } from '@/components/ui/button';
import { CirclePlusIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

export default function CreateCustomer() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const onSuccess = () => {
        toast.success('Customer created successfully');
        setIsDialogOpen(false)
    };

    return (
        <>
            <div className="hidden lg:block">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm">
                            <CirclePlusIcon/>
                            Add Customer
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[80%] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                Create a new customer
                            </DialogTitle>
                        </DialogHeader>
                        <div className="w-full">
                            <CustomersForm onSuccess={onSuccess}/>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => setIsDialogOpen(prevState => !prevState)} variant="destructive" type="button">Cancel</Button>
                            <Button form="customer-form" type="submit">Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="block lg:hidden">
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerTrigger asChild>
                        <Button size="sm">
                            <CirclePlusIcon/>
                            Add Customer
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="mx-auto px-4 overflow-y-auto">
                        <DrawerHeader>
                            <DrawerTitle>
                                Create a new customer
                            </DrawerTitle>
                        </DrawerHeader>
                        <div className="w-full">
                            <CustomersForm onSuccess={onSuccess}/>
                        </div>
                        <DrawerFooter className="flex flex-col gap-2">
                            <Button onClick={() => setIsDrawerOpen(prevState => !prevState)} variant="destructive" type="button" className="w-full">Cancel</Button>
                            <Button form="customer-form" type="submit" className="w-full">Save</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}
