"use client"

import { Cloud } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface RainbowLogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
  animated?: boolean
}

export function RainbowLogo({ size = "md", showText = true, className, animated = true }: RainbowLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  }

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <div
      className={cn("flex items-center gap-2", sizeClasses[size], className, animated && "transition-all duration-300")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full",
          size === "lg" ? "p-3" : "p-2",
          isHovered ? "rainbow-border" : "bg-primary/10",
        )}
      >
        <Cloud className={cn(iconSizes[size], isHovered ? "text-white" : "text-primary")} />
      </div>
      {showText && (
        <div className="flex items-baseline">
          <span
            className={cn(
              "font-bold",
              size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base",
              isHovered ? "rainbow-text" : "",
            )}
          >
            YanYu Cloud
          </span>
          <sup
            className={cn(
              size === "lg" ? "text-lg" : size === "sm" ? "text-xs" : "text-sm",
              isHovered ? "rainbow-text" : "",
            )}
          >
            3
          </sup>
        </div>
      )}
    </div>
  )
}
