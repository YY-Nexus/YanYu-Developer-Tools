"use client"

import type { ReactNode } from "react"
import { Breadcrumb } from "@/app/components/ui/breadcrumb"
import { useBreadcrumb } from "@/app/components/ui/breadcrumb-provider"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  const { items } = useBreadcrumb()

  return (
    <div className={cn("space-y-4", className)}>
      {items.length > 0 && <Breadcrumb items={items} className="mb-6" />}

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      {children && (
        <div className="flex items-center justify-between">
          <div className="flex-1">{children}</div>
        </div>
      )}
    </div>
  )
}
