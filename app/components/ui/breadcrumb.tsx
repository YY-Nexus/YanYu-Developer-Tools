"use client"

import type React from "react"

import { Fragment } from "react"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedLink } from "./animated-link"
import { motion } from "framer-motion"

export interface BreadcrumbItem {
  label: string
  href: string
  icon?: React.ReactNode
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <motion.nav
      aria-label="面包屑"
      className={cn("flex", className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        <motion.li
          className="flex items-center"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <AnimatedLink
            href="/"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="首页"
          >
            <Home className="h-4 w-4" />
          </AnimatedLink>
        </motion.li>
        {items.map((item, index) => (
          <Fragment key={item.href}>
            <motion.li
              className="flex items-center text-muted-foreground"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
            >
              {index === items.length - 1 ? (
                <span className="flex items-center font-medium text-foreground">
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <AnimatedLink
                  href={item.href}
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.label}
                </AnimatedLink>
              )}
            </motion.li>
          </Fragment>
        ))}
      </ol>
    </motion.nav>
  )
}
