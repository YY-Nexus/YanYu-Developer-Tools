"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface GlobalLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  showShadow?: boolean
}

export function GlobalLogo({ size = "md", className, showShadow = false }: GlobalLogoProps) {
  const sizeMap = {
    sm: { width: 120, height: 40 },
    md: { width: 150, height: 50 },
    lg: { width: 180, height: 60 },
  }

  return (
    <div className={cn("relative", className)}>
      <Image
        src="/yanyu-global-logo.png"
        alt="YanYu Cloud³"
        width={sizeMap[size].width}
        height={sizeMap[size].height}
        className={cn(
          "object-contain transition-all duration-300",
          showShadow && "drop-shadow-md hover:drop-shadow-lg",
        )}
      />
    </div>
  )
}
