import { ColumnDef } from '@tanstack/react-table';
import { Customer } from '@/types/domain';
import { DataTableColumnHeader } from '@/components/data-table-column-header';

export const column: ColumnDef<Customer>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID"/>
        ),
    },
    {
        accessorKey: "type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type"/>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name"/>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email"/>
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone"/>
        ),
    },
    {
        accessorKey: "address",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Address"/>
        ),
    },
    {
        accessorKey: "country",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Country"/>
        ),
    },
    {
        accessorKey: "city",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="City"/>
        ),
    },
    {
        accessorKey: "nif",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="NIF"/>
        ),
    },
    {
        accessorKey: "rccm",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="RCCM"/>
        ),
    },
    {
        accessorKey: "idnat",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="IDNAT"/>
        ),
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At"/>
        ),
        cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
    },
    {
        accessorKey: "updated_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Updated At"/>
        ),
        cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
    },
]
