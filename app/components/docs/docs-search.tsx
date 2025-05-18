"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface SearchResult {
  title: string
  href: string
  category: string
}

// 模拟搜索结果数据
const searchResults: SearchResult[] = [
  { title: "入门指南", href: "/docs/getting-started", category: "入门" },
  { title: "环境配置", href: "/docs/setup", category: "基础配置" },
  { title: "设备角色", href: "/docs/device-roles", category: "基础配置" },
  { title: "服务器基础", href: "/docs/server-setup", category: "服务器配置" },
  { title: "Gitea安装", href: "/docs/git-setup", category: "Git服务" },
  { title: "阿里云集成", href: "/docs/cloud-aliyun", category: "云服务集成" },
  { title: "API概览", href: "/docs/api/overview", category: "API参考" },
]

export function DocsSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()

  const filteredResults = query
    ? searchResults.filter(
        (result) =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.category.toLowerCase().includes(query.toLowerCase()),
      )
    : []

  const handleSelect = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="搜索文档..."
          className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          onClick={() => setOpen(true)}
          readOnly
        />
        <kbd className="pointer-events-none absolute right-2.5 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="搜索文档..." value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>没有找到相关结果</CommandEmpty>
          <CommandGroup heading="搜索结果">
            {filteredResults.map((result) => (
              <CommandItem key={result.href} onSelect={() => handleSelect(result.href)}>
                <span>{result.title}</span>
                <span className="ml-2 text-xs text-muted-foreground">{result.category}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
