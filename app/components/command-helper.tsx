"use client"

import type React from "react"

import { useState } from "react"
import { Terminal, HelpCircle, Copy, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CommandHelperProps {
  command: string
  title: string
  description?: string
  children?: React.ReactNode
}

export default function CommandHelper({ command, title, description, children }: CommandHelperProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    toast({
      title: "命令已复制到剪贴板",
      description: "您可以在终端中粘贴并执行此命令",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Terminal className="h-3.5 w-3.5" />
          <span>查看命令</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="command" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="command">命令</TabsTrigger>
            <TabsTrigger value="help">帮助说明</TabsTrigger>
          </TabsList>
          <TabsContent value="command" className="space-y-4">
            <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap">
              {command.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button onClick={copyToClipboard} className="gap-1">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "已复制" : "复制命令"}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="help" className="space-y-4">
            <div className="text-sm space-y-2">
              {children || (
                <>
                  <p>
                    <strong>使用说明：</strong>
                  </p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>复制上面的命令</li>
                    <li>打开终端（Terminal）应用</li>
                    <li>粘贴命令并按回车键执行</li>
                    <li>根据提示输入所需信息</li>
                  </ol>
                  <p className="mt-2">
                    <strong>注意：</strong> 某些命令可能需要管理员权限，系统会提示您输入密码。
                  </p>
                </>
              )}
            </div>
            <div className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-md">
              <HelpCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                执行命令前请确保您了解命令的作用。如有疑问，请查阅相关文档或咨询专业人士。
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
