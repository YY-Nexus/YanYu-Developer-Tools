"use client"

import { createContext, useContext, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Cloud, Code, Database, FileText, Github, Home, Laptop, Server, Settings, Terminal } from "lucide-react"
import type { BreadcrumbItem } from "./breadcrumb"

// 定义路径映射
const pathMap: Record<string, { label: string; icon: ReactNode }> = {
  "": { label: "首页", icon: <Home className="h-4 w-4" /> },
  devices: { label: "设备配置", icon: <Laptop className="h-4 w-4" /> },
  server: { label: "服务器设置", icon: <Server className="h-4 w-4" /> },
  git: { label: "Git服务", icon: <Github className="h-4 w-4" /> },
  cloud: { label: "云服务集成", icon: <Cloud className="h-4 w-4" /> },
  tools: { label: "开发工具", icon: <Code className="h-4 w-4" /> },
  data: { label: "数据管理", icon: <Database className="h-4 w-4" /> },
  settings: { label: "系统设置", icon: <Settings className="h-4 w-4" /> },
  basic: { label: "基础环境", icon: <Terminal className="h-4 w-4" /> },
  vercel: { label: "Vercel集成", icon: <FileText className="h-4 w-4" /> },
  docs: { label: "文档", icon: <FileText className="h-4 w-4" /> },
  signup: { label: "注册", icon: <FileText className="h-4 w-4" /> },
  contact: { label: "联系我们", icon: <FileText className="h-4 w-4" /> },
}

// 创建上下文
interface BreadcrumbContextType {
  items: BreadcrumbItem[]
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined)

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // 生成面包屑项
  const generateBreadcrumbItems = (): BreadcrumbItem[] => {
    if (pathname === "/") return []

    const pathSegments = pathname.split("/").filter(Boolean)
    const breadcrumbItems: BreadcrumbItem[] = []

    let currentPath = ""

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`

      const pathInfo = pathMap[segment] || {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        icon: <FileText className="h-4 w-4" />,
      }

      breadcrumbItems.push({
        label: pathInfo.label,
        href: currentPath,
        icon: pathInfo.icon,
      })
    })

    return breadcrumbItems
  }

  const items = generateBreadcrumbItems()

  return <BreadcrumbContext.Provider value={{ items }}>{children}</BreadcrumbContext.Provider>
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext)
  if (context === undefined) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider")
  }
  return context
}
