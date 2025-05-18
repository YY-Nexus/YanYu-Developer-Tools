import { Cloud } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
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
    <div className={cn("flex items-center gap-2", sizeClasses[size], className)}>
      <div className={cn("yanyu-icon-bg flex items-center justify-center", size === "lg" ? "p-3" : "")}>
        <Cloud className={iconSizes[size]} />
      </div>
      {showText && (
        <div className="flex items-baseline">
          <span className={cn("font-bold", size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base")}>
            YanYu Cloud
          </span>
          <sup className={cn(size === "lg" ? "text-lg" : size === "sm" ? "text-xs" : "text-sm")}>3</sup>
        </div>
      )}
    </div>
  )
}
