import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface DocsPaginationProps {
  prev?: {
    title: string
    href: string
  }
  next?: {
    title: string
    href: string
  }
}

export function DocsPagination({ prev, next }: DocsPaginationProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      {prev ? (
        <Link href={prev.href} className={cn(buttonVariants({ variant: "outline" }), "gap-1")}>
          <ChevronLeft className="h-4 w-4" />
          {prev.title}
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link href={next.href} className={cn(buttonVariants({ variant: "outline" }), "gap-1 ml-auto")}>
          {next.title}
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
