"use client"

import { useState } from "react"
import { ArrowRight, Server, Cloud, Github, Laptop, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function WorkflowDiagram() {
  const [showDetails, setShowDetails] = useState<number | null>(null)
  const [copied, setCopied] = useState<number | null>(null)

  const workflowSteps = [
    {
      title: "本地开发",
      description: "在Mac设备上进行开发",
      details: "使用VS Code或其他IDE，连接到本地Git仓库",
      icon: <Laptop className="h-6 w-6 text-blue-500" />,
      command: "git clone http://mac-server:3000/username/project-name.git && cd project-name && code .",
    },
    {
      title: "同步到云端",
      description: "将代码同步到云服务器",
      details: "使用自动同步脚本，将代码推送到云服务器",
      icon: <Cloud className="h-6 w-6 text-sky-500" />,
      command: "~/sync-to-aliyun.sh",
    },
    {
      title: "备份数据",
      description: "定期备份数据库和文件",
      details: "使用自动备份脚本，将数据库和文件备份到云存储",
      icon: <Server className="h-6 w-6 text-purple-500" />,
      command: "~/backup-aliyun-db.sh",
    },
    {
      title: "部署应用",
      description: "部署应用到生产环境",
      details: "使用CI/CD流程，自动部署应用到生产环境",
      icon: <Github className="h-6 w-6 text-gray-800" />,
      command: "curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_xxxxxxxxxxxx/yyyyyyyyyyy",
    },
  ]

  const copyCommand = (command: string, index: number) => {
    navigator.clipboard.writeText(command)
    setCopied(index)
    toast({
      title: "命令已复制到剪贴板",
      description: "您可以在终端中粘贴并执行此命令",
    })
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Mac与云服务器工作流</h2>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        {workflowSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative">
            <div
              className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 cursor-pointer hover:bg-primary/20 transition-colors"
              onClick={() => setShowDetails(showDetails === index ? null : index)}
            >
              {step.icon}
            </div>
            <h3 className="font-medium text-center">{step.title}</h3>
            {index < workflowSteps.length - 1 && (
              <ArrowRight className="hidden md:block h-6 w-6 text-muted-foreground rotate-0 md:rotate-0 mt-8 md:mt-0 absolute -right-8 top-5" />
            )}

            {showDetails === index && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-64 border mt-2">
                <h4 className="font-medium mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                <p className="text-sm mb-3">{step.details}</p>
                <div className="bg-muted p-2 rounded text-xs font-mono mb-2 overflow-x-auto">{step.command}</div>
                <div className="flex justify-between">
                  <Button size="sm" variant="outline" onClick={() => setShowDetails(null)}>
                    关闭
                  </Button>
                  <Button size="sm" onClick={() => copyCommand(step.command, index)}>
                    {copied === index ? "已复制" : "复制命令"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {workflowSteps.map((step, index) => (
          <div key={index} className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              {step.icon}
              <h3 className="font-medium">{step.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
            <p className="text-sm">{step.details}</p>
            <Button
              size="sm"
              variant="outline"
              className="mt-2 w-full gap-1"
              onClick={() => copyCommand(step.command, index + 10)}
            >
              {copied === index + 10 ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied === index + 10 ? "已复制" : "复制相关命令"}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
