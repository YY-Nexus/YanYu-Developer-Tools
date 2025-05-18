"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  Cloud,
  Code,
  Database,
  FileText,
  Github,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  HardDrive,
  Laptop,
  LayoutDashboard,
  Menu,
  Monitor,
  Moon,
  Network,
  Server,
  Settings,
  Shield,
  Sun,
  Terminal,
  PenToolIcon as Tool,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import { GlobalLogo } from "@/app/components/ui/global-logo"
import { AnimatedLink } from "@/app/components/ui/animated-link"
import { useNavigation } from "@/app/components/ui/navigation-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// 定义导航菜单项及子菜单
const navItems = [
  {
    title: "概览",
    href: "/",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "设备配置",
    href: "/devices",
    icon: <Laptop className="h-5 w-5" />,
    children: [
      {
        title: "设备角色",
        href: "/devices/roles",
        icon: <Monitor className="h-4 w-4" />,
        description: "设备角色与资源分配",
      },
      {
        title: "网络配置",
        href: "/devices/network",
        icon: <Network className="h-4 w-4" />,
        description: "设备网络连接设置",
      },
      {
        title: "存储管理",
        href: "/devices/storage",
        icon: <HardDrive className="h-4 w-4" />,
        description: "存储设备管理与配置",
      },
    ],
  },
  {
    title: "服务器设置",
    href: "/server",
    icon: <Server className="h-5 w-5" />,
    children: [
      {
        title: "基础配置",
        href: "/server/basic",
        icon: <Terminal className="h-4 w-4" />,
        description: "服务器基础环境配置",
      },
      {
        title: "安全设置",
        href: "/server/security",
        icon: <Shield className="h-4 w-4" />,
        description: "服务器安全与防火墙配置",
      },
      {
        title: "性能优化",
        href: "/server/performance",
        icon: <HardDrive className="h-4 w-4" />,
        description: "服务器性能监控与优化",
      },
    ],
  },
  {
    title: "Git服务",
    href: "/git",
    icon: <Github className="h-5 w-5" />,
    children: [
      {
        title: "Gitea安装",
        href: "/git/gitea",
        icon: <GitBranch className="h-4 w-4" />,
        description: "轻量级Git服务安装与配置",
      },
      {
        title: "仓库管理",
        href: "/git/repositories",
        icon: <GitCommit className="h-4 w-4" />,
        description: "创建和管理Git仓库",
      },
      {
        title: "分支策略",
        href: "/git/branches",
        icon: <GitMerge className="h-4 w-4" />,
        description: "分支管理与合并策略",
      },
      {
        title: "CI/CD集成",
        href: "/git/ci-cd",
        icon: <GitPullRequest className="h-4 w-4" />,
        description: "持续集成与部署配置",
      },
    ],
  },
  {
    title: "云服务集成",
    href: "/cloud",
    icon: <Cloud className="h-5 w-5" />,
    children: [
      {
        title: "阿里云",
        href: "/cloud/aliyun",
        icon: <Cloud className="h-4 w-4" />,
        description: "阿里云服务集成配置",
      },
      {
        title: "腾讯云",
        href: "/cloud/tencent",
        icon: <Cloud className="h-4 w-4" />,
        description: "腾讯云服务集成配置",
      },
      {
        title: "百度云",
        href: "/cloud/baidu",
        icon: <Cloud className="h-4 w-4" />,
        description: "百度云服务集成配置",
      },
      {
        title: "数据同步",
        href: "/cloud/sync",
        icon: <Database className="h-4 w-4" />,
        description: "云端数据同步策略",
      },
    ],
  },
  {
    title: "开发工具",
    href: "/tools",
    icon: <Code className="h-5 w-5" />,
    children: [
      {
        title: "命令行工具",
        href: "/tools/cli",
        icon: <Terminal className="h-4 w-4" />,
        description: "常用命令行工具配置",
      },
      {
        title: "开发环境",
        href: "/tools/dev-env",
        icon: <Code className="h-4 w-4" />,
        description: "开发环境配置与管理",
      },
      {
        title: "自动化脚本",
        href: "/tools/automation",
        icon: <Tool className="h-4 w-4" />,
        description: "自动化脚本与工作流",
      },
    ],
  },
  {
    title: "系统设置",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
    children: [
      {
        title: "用户管理",
        href: "/settings/users",
        icon: <FileText className="h-4 w-4" />,
        description: "用户账户与权限管理",
      },
      {
        title: "备份恢复",
        href: "/settings/backup",
        icon: <Database className="h-4 w-4" />,
        description: "系统备份与恢复策略",
      },
      {
        title: "系统日志",
        href: "/settings/logs",
        icon: <FileText className="h-4 w-4" />,
        description: "系统日志查看与分析",
      },
      {
        title: "依赖健康检查",
        href: "/dependency-check",
        icon: <FileText className="h-4 w-4" />,
        description: "检查项目依赖的健康状况",
      },
    ],
  },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { navigateTo } = useNavigation()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              navigateTo("/")
            }}
            className="flex items-center gap-2"
          >
            <GlobalLogo size="sm" showShadow={true} />
          </a>
        </div>

        {/* 桌面导航 */}
        <nav className="hidden md:flex items-center gap-6">
          <TooltipProvider>
            {navItems.map((item) => {
              // 如果有子菜单，使用下拉菜单
              if (item.children) {
                return (
                  <DropdownMenu key={item.href}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                          isActive(item.href) ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {item.icon}
                        {item.title}
                        <ChevronDown className="h-4 w-4 ml-0.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <AnimatedLink href={item.href} className="w-full">
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                          <div className="bg-primary/10 p-1 rounded">{item.icon}</div>
                          <div>
                            <div className="font-medium">{item.title}概览</div>
                            <div className="text-xs text-muted-foreground">{item.title}总览</div>
                          </div>
                        </DropdownMenuItem>
                      </AnimatedLink>
                      <DropdownMenuSeparator />
                      {item.children.map((child) => (
                        <AnimatedLink key={child.href} href={child.href} className="w-full">
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                            <div className="bg-primary/10 p-1 rounded">{child.icon}</div>
                            <div>
                              <div className="font-medium">{child.title}</div>
                              <div className="text-xs text-muted-foreground">{child.description}</div>
                            </div>
                          </DropdownMenuItem>
                        </AnimatedLink>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }

              // 普通菜单项
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <AnimatedLink
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                        isActive(item.href) ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {item.icon}
                      {item.title}
                    </AnimatedLink>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.title}</p>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </TooltipProvider>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full btn-hover-effect"
            aria-label="切换主题"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">切换主题</span>
          </Button>

          {/* 移动端菜单按钮 */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden btn-hover-effect"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.href} className="mb-2">
                <AnimatedLink
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                  onClick={() => {
                    if (!item.children) setMobileMenuOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    {item.title}
                  </div>
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </AnimatedLink>

                {/* 子菜单 */}
                {item.children && isActive(item.href) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <AnimatedLink
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                          pathname === child.href ? "bg-primary/10 text-primary" : "hover:bg-muted",
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.icon}
                        {child.title}
                      </AnimatedLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
