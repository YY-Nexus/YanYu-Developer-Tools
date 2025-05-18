"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"

interface NavigationContextType {
  navigateTo: (path: string) => void
  isNavigating: boolean
  currentPath: string
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)

  const navigateTo = useCallback(
    (path: string) => {
      if (path === pathname) return

      setIsNavigating(true)

      // 延迟导航以显示过渡动画
      setTimeout(() => {
        router.push(path)
        // 导航完成后重置状态
        setTimeout(() => {
          setIsNavigating(false)
        }, 100)
      }, 500)
    },
    [router, pathname],
  )

  return (
    <NavigationContext.Provider value={{ navigateTo, isNavigating, currentPath: pathname }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
