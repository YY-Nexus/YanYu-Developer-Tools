import { Check, Server, Database, Shield, Repeat } from "lucide-react"

export function ServerSetup() {
  const setupSteps = [
    {
      title: "安装Homebrew",
      description: "作为包管理器，简化软件安装",
      command: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
      icon: <Check className="h-5 w-5 text-green-500" />,
    },
    {
      title: "安装Docker",
      description: "容器化应用管理",
      command: "brew install --cask docker",
      icon: <Server className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "安装Gitea",
      description: "轻量级Git服务",
      command: "docker run -d --name=gitea -p 3000:3000 -p 22:22 -v ~/gitea:/data gitea/gitea:latest",
      icon: <Database className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "配置防火墙",
      description: "保护服务器安全",
      command: "sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on",
      icon: <Shield className="h-5 w-5 text-red-500" />,
    },
    {
      title: "设置自动备份",
      description: "使用rsync定时备份",
      command: "brew install rsync && crontab -e",
      icon: <Repeat className="h-5 w-5 text-amber-500" />,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4 bg-muted/50">
        <h3 className="font-medium mb-2">推荐软件清单</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Gitea/GitLab CE - 代码仓库管理</li>
          <li>Docker - 容器化环境</li>
          <li>Nginx - 反向代理服务器</li>
          <li>MongoDB/PostgreSQL - 数据库</li>
          <li>Redis - 缓存服务</li>
          <li>Syncthing - 设备间文件同步</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">安装步骤</h3>
        {setupSteps.map((step, index) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
            <div className="mt-0.5">{step.icon}</div>
            <div className="space-y-2">
              <h4 className="font-medium">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              <div className="bg-muted p-2 rounded text-sm font-mono">{step.command}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
