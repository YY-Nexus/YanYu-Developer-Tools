"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface CodeDisplayProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  title?: string
  description?: string
}

export default function CodeDisplay({
  code,
  language = "bash",
  showLineNumbers = false,
  title,
  description,
}: CodeDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    toast({
      title: "命令已复制到剪贴板",
      description: "您可以在终端中粘贴并执行此命令",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  return (
    <div className="relative">
      {title && <div className="text-sm font-medium mb-1">{title}</div>}
      {description && <div className="text-sm text-muted-foreground mb-2">{description}</div>}
      <div className="bg-muted rounded-md overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
          <span className="text-xs font-medium">{language}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyToClipboard} title="复制代码">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm font-mono">
            {showLineNumbers
              ? lines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="text-muted-foreground w-7 text-right mr-3 select-none">{i + 1}</span>
                    <span>{line}</span>
                  </div>
                ))
              : lines.map((line, i) => <div key={i}>{line}</div>)}
          </pre>
        </div>
      </div>
    </div>
  )
}
