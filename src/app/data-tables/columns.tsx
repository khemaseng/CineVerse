"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { toast } from "sonner"
import { type DataTableFeatures } from "./data-table-features"

export type Product = {
  id: string
  image: string
  title: string
  price: number
  category: string
  rate: number
}

const columnHelper = createColumnHelper<DataTableFeatures, Product>()

// Every column def now lives inside the same array passed to columnHelper.columns()
export const columns = columnHelper.columns([
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="h-8 w-8 p-0" />}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(product.id)
                toast.success(`Copied ID ${product.id} to clipboard`)
              }}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              render={<Link href={`/product/${product.id}`} />}
            >
              View product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
  columnHelper.accessor("image", {
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue<string>("image")
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={row.original.title}
          className="h-10 w-10 rounded object-contain bg-white border p-0.5"
        />
      )
    },
  }),
  columnHelper.accessor("id", {
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(isSorted === "asc")}
          className="-ml-3 h-8 text-xs font-semibold hover:bg-muted"
        >
          ID
          {isSorted === "asc" ? (
            <ArrowUp className="ml-1.5 h-3.5 w-3.5" />
          ) : isSorted === "desc" ? (
            <ArrowDown className="ml-1.5 h-3.5 w-3.5" />
          ) : (
            <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 opacity-40" />
          )}
        </Button>
      )
    },
  }),
  columnHelper.accessor("title", {
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(isSorted === "asc")}
          className="-ml-3 h-8 text-xs font-semibold hover:bg-muted"
        >
          Title
          {isSorted === "asc" ? (
            <ArrowUp className="ml-1.5 h-3.5 w-3.5" />
          ) : isSorted === "desc" ? (
            <ArrowDown className="ml-1.5 h-3.5 w-3.5" />
          ) : (
            <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 opacity-40" />
          )}
        </Button>
      )
    },
    cell: ({ row }) => (
      <Link
        href={`/product/${row.original.id}`}
        className="font-medium hover:underline hover:text-primary transition-colors line-clamp-1 max-w-sm block"
        title={row.getValue<string>("title")}
      >
        {row.getValue<string>("title")}
      </Link>
    ),
  }),
  columnHelper.accessor("price", {
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(isSorted === "asc")}
            className="-mr-3 h-8 text-xs font-semibold hover:bg-muted"
          >
            Price
            {isSorted === "asc" ? (
              <ArrowUp className="ml-1.5 h-3.5 w-3.5" />
            ) : isSorted === "desc" ? (
              <ArrowDown className="ml-1.5 h-3.5 w-3.5" />
            ) : (
              <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 opacity-40" />
            )}
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const price = row.getValue<number>("price")
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)

      return (
        <div className="text-right font-semibold text-emerald-600 dark:text-emerald-400">
          {formatted}
        </div>
      )
    },
  }),
  columnHelper.accessor("category", {
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(isSorted === "asc")}
          className="-ml-3 h-8 text-xs font-semibold hover:bg-muted"
        >
          Category
          {isSorted === "asc" ? (
            <ArrowUp className="ml-1.5 h-3.5 w-3.5" />
          ) : isSorted === "desc" ? (
            <ArrowDown className="ml-1.5 h-3.5 w-3.5" />
          ) : (
            <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 opacity-40" />
          )}
        </Button>
      )
    },
    cell: ({ row }) => (
      <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium capitalize">
        {row.getValue<string>("category")}
      </span>
    ),
  }),
  columnHelper.accessor("rate", {
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(isSorted === "asc")}
          className="-ml-3 h-8 text-xs font-semibold hover:bg-muted"
        >
          Rating
          {isSorted === "asc" ? (
            <ArrowUp className="ml-1.5 h-3.5 w-3.5" />
          ) : isSorted === "desc" ? (
            <ArrowDown className="ml-1.5 h-3.5 w-3.5" />
          ) : (
            <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 opacity-40" />
          )}
        </Button>
      )
    },
    cell: ({ row }) => {
      const rate = row.getValue<number>("rate")
      return (
        <div className="flex items-center gap-1 text-sm font-medium">
          <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400" />
          <span>{rate}</span>
        </div>
      )
    },
  }),
])