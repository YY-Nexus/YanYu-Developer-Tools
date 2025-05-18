"use client"

import type React from "react"

import { forwardRef } from "react"
import { useNavigation } from "./navigation-context"
import { cn } from "@/lib/utils"

interface AnimatedLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string
  prefetch?: boolean
  replace?: boolean
  scroll?: boolean
}

const AnimatedLink = forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  ({ href, className, children, onClick, ...props }, ref) => {
    const { navigateTo, currentPath } = useNavigation()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      if (onClick) onClick(e)
      navigateTo(href)
    }

    const isActive = currentPath === href

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        className={cn(
          "transition-colors",
          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    )
  },
)

AnimatedLink.displayName = "AnimatedLink"

export { AnimatedLink }
