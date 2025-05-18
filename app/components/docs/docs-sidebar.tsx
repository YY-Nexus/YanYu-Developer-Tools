"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronRight } from "lucide-react"
import { AnimatedLink } from "@/app/components/ui/animated-link"

interface DocGroup {
  title: string
  items: {
    title: string
    href: string
    items?: {
      title: string
      href: string
    }[]
  }[]
}

const docsConfig: DocGroup[] = [
  {
    title: "入门",
    items: [
      {
        title: "介绍",
        href: "/docs",
      },
      {
        title: "入门指南",
        href: "/docs/getting-started",
      },
      {
        title: "安装",
        href: "/docs/installation",
      },
    ],
  },
  {
    title: "基础配置",
    items: [
      {
        title: "环境配置",
        href: "/docs/setup",
      },
      {
        title: "设备角色",
        href: "/docs/device-roles",
      },
      {
        title: "网络设置",
        href: "/docs/network-setup",
      },
    ],
  },
  {
    title: "服务器配置",
    items: [
      {
        title: "服务器基础",
        href: "/docs/server-setup",
      },
      {
        title: "安全配置",
        href: "/docs/server-security",
      },
      {
        title: "性能优化",
        href: "/docs/server-performance",
      },
    ],
  },
  {
    title: "Git服务",
    items: [
      {
        title: "Gitea安装",
        href: "/docs/git-setup",
      },
      {
        title: "仓库管理",
        href: "/docs/git-repositories",
      },
      {
        title: "分支策略",
        href: "/docs/git-branches",
      },
      {
        title: "CI/CD集成",
        href: "/docs/git-cicd",
      },
    ],
  },
  {
    title: "云服务集成",
    items: [
      {
        title: "概述",
        href: "/docs/cloud-integration",
      },
      {
        title: "阿里云",
        href: "/docs/cloud-aliyun",
      },
      {
        title: "腾讯云",
        href: "/docs/cloud-tencent",
      },
      {
        title: "百度云",
        href: "/docs/cloud-baidu",
      },
      {
        title: "数据同步",
        href: "/docs/cloud-sync",
      },
    ],
  },
  {
    title: "API参考",
    items: [
      {
        title: "API概览",
        href: "/docs/api/overview",
      },
      {
        title: "认证与授权",
        href: "/docs/api/authentication",
      },
      {
        title: "接口列表",
        href: "/docs/api/endpoints",
        items: [
          {
            title: "设备管理",
            href: "/docs/api/endpoints/devices",
          },
          {
            title: "服务器管理",
            href: "/docs/api/endpoints/servers",
          },
          {
            title: "Git服务",
            href: "/docs/api/endpoints/git",
          },
          {
            title: "云服务",
            href: "/docs/api/endpoints/cloud",
          },
        ],
      },
    ],
  },
  {
    title: "最佳实践",
    items: [
      {
        title: "架构设计",
        href: "/docs/best-practices/architecture",
      },
      {
        title: "安全最佳实践",
        href: "/docs/best-practices/security",
      },
      {
        title: "性能优化",
        href: "/docs/best-practices/performance",
      },
    ],
  },
]

interface DocsSidebarProps {
  className?: string
}

export function DocsSidebar({ className }: DocsSidebarProps) {
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">文档导航</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/docs">文档首页</Link>
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-6 px-3">
            {docsConfig.map((group) => (
              <div key={group.title} className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-between font-medium"
                  onClick={() => toggleGroup(group.title)}
                >
                  {group.title}
                  {openGroups[group.title] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
                {openGroups[group.title] && (
                  <div className="ml-4 space-y-1">
                    {group.items.map((item) => (
                      <div key={item.href}>
                        <Button
                          variant="ghost"
                          className={cn("w-full justify-start", pathname === item.href && "bg-muted font-medium")}
                          asChild
                        >
                          <AnimatedLink href={item.href}>{item.title}</AnimatedLink>
                        </Button>
                        {item.items && openGroups[group.title] && (
                          <div className="ml-4 space-y-1">
                            {item.items.map((subItem) => (
                              <Button
                                key={subItem.href}
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start",
                                  pathname === subItem.href && "bg-muted font-medium",
                                )}
                                asChild
                              >
                                <AnimatedLink href={subItem.href}>{subItem.title}</AnimatedLink>
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
