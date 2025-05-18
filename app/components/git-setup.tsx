"use client"

import { useState } from "react"
import { GitBranch } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Steps, Step, type StepAction } from "./steps"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// 预设步骤操作
const stepActions: Record<string, StepAction> = {
  "gitea-install": {
    id: "gitea-install",
    title: "复制Gitea安装命令",
    command:
      "mkdir -p ~/gitea/data && docker run -d --name=gitea \\\n-p 3000:3000 -p 22:22 \\\n-v ~/gitea/data:/data \\\n-e USER_UID=1000 -e USER_GID=1000 \\\n--restart always \\\ngitea/gitea:latest",
    description: "此命令将创建Gitea数据目录，并使用Docker启动Gitea容器",
  },
  "gitea-config": {
    id: "gitea-config",
    title: "复制Gitea配置命令",
    command: "nano ~/gitea/data/gitea/conf/app.ini",
    description: "此命令将打开Gitea配置文件，您需要手动添加配置内容",
  },
  "gitea-restart": {
    id: "gitea-restart",
    title: "复制Gitea重启命令",
    command: "docker restart gitea",
    description: "此命令将重启Gitea容器，使配置生效",
  },
  "git-config": {
    id: "git-config",
    title: "复制Git配置命令",
    command:
      'git config --global user.name "Your Name" && git config --global user.email "your.email@example.com" && git clone http://mac-server:3000/username/project-name.git',
    description: "此命令将配置Git全局用户信息，并克隆Gitea仓库",
  },
  "git-hook": {
    id: "git-hook",
    title: "复制Git钩子配置命令",
    command:
      "cat > .git/hooks/pre-commit << 'EOF'\n#!/bin/sh\n# 运行代码检查\necho \"Running code linting...\"\n# 添加您的代码检查命令\n# 如果检查失败，返回非零状态码阻止提交\nexit 0\nEOF\n\nchmod +x .git/hooks/pre-commit",
    description: "此命令将创建Git pre-commit钩子，用于在提交前运行代码检查",
  },
  "github-remote": {
    id: "github-remote",
    title: "复制GitHub远程仓库配置命令",
    command: "git remote add github https://github.com/username/project-name.git && git remote -v",
    description: "此命令将添加GitHub远程仓库，并查看远程仓库列表",
  },
  "github-sync": {
    id: "github-sync",
    title: "复制GitHub同步脚本命令",
    command:
      'cat > ~/sync-to-github.sh << \'EOF\'\n#!/bin/bash\n# 同步所有仓库到GitHub\ncd ~/project-name\ngit fetch origin\ngit push github --all\ngit push github --tags\necho "Sync completed at $(date)"\nEOF\n\nchmod +x ~/sync-to-github.sh\n\n(crontab -l 2>/dev/null; echo "0 * * * * ~/sync-to-github.sh >> ~/sync-log.txt 2>&1") | crontab -',
    description: "此命令将创建GitHub同步脚本，并设置为每小时自动运行",
  },
}

// 使用默认导出
export default function GitSetup() {
  const [activeTab, setActiveTab] = useState("gitea")
  const [actionDialog, setActionDialog] = useState<{ open: boolean; action: StepAction | null }>({
    open: false,
    action: null,
  })

  const handleStepAction = (action: StepAction) => {
    setActionDialog({
      open: true,
      action,
    })
  }

  const executeAction = () => {
    if (actionDialog.action?.command) {
      navigator.clipboard.writeText(actionDialog.action.command)
      toast({
        title: "命令已复制到剪贴板",
        description: "您可以在终端中粘贴并执行此命令",
      })
    }
    setActionDialog({ open: false, action: null })
  }

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h3>3.1 本地Git服务搭建</h3>
        <p>本章将指导您如何在Mac M4上搭建Git服务，并与GitHub集成，实现代码的本地存储和云端备份。</p>
      </div>

      <Alert>
        <GitBranch className="h-4 w-4" />
        <AlertTitle>Git服务选择</AlertTitle>
        <AlertDescription>
          我们将使用Gitea作为本地Git服务，它轻量级、易于配置，并提供完整的Git功能和Web界面。
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="gitea" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="gitea">Gitea安装</TabsTrigger>
          <TabsTrigger value="config">Git配置</TabsTrigger>
          <TabsTrigger value="github">GitHub集成</TabsTrigger>
        </TabsList>

        <TabsContent value="gitea" className="space-y-4">
          <Steps onStepAction={handleStepAction}>
            <Step number={1} title="使用Docker安装Gitea" action={stepActions["gitea-install"]}>
              <p className="text-sm text-muted-foreground mb-2">通过Docker安装Gitea，简化部署和维护。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 创建Gitea数据目录
                <br />
                mkdir -p ~/gitea/data
                <br />
                <br /># 启动Gitea容器
                <br />
                {"docker run -d --name=gitea \\"}
                <br />
                {"-p 3000:3000 -p 22:22 \\"}
                <br />
                {"-v ~/gitea/data:/data \\"}
                <br />
                {"-e USER_UID=1000 -e USER_GID=1000 \\"}
                <br />
                {"--restart always \\"}
                <br />
                gitea/gitea:latest
              </div>
            </Step>

            <Step number={2} title="初始化Gitea">
              <p className="text-sm text-muted-foreground mb-2">完成Gitea的初始化设置。</p>
              <p className="text-sm">
                1. 打开浏览器访问 <span className="font-mono">http://mac-server:3000</span>
                <br />
                2. 按照界面提示完成初始设置：
                <br />- 数据库类型：SQLite3
                <br />- 站点名称：Mac Git Server
                <br />- 创建管理员账户
              </p>
            </Step>

            <Step number={3} title="配置Gitea服务" action={stepActions["gitea-config"]}>
              <p className="text-sm text-muted-foreground mb-2">调整Gitea配置，优化性能和安全性。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 编辑Gitea配置文件
                <br />
                nano ~/gitea/data/gitea/conf/app.ini
              </div>
              <p className="text-sm mt-2">添加或修改以下配置：</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                [server]
                <br />
                DOMAIN = mac-server
                <br />
                ROOT_URL = http://mac-server:3000/
                <br />
                SSH_DOMAIN = mac-server
                <br />
                <br />
                [security]
                <br />
                INSTALL_LOCK = true
                <br />
                PASSWORD_HASH_ALGO = pbkdf2
                <br />
                <br />
                [service]
                <br />
                DISABLE_REGISTRATION = true
              </div>
              <p className="text-sm mt-2">保存配置后重启Gitea容器：</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">docker restart gitea</div>
            </Step>
          </Steps>
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <Steps onStepAction={handleStepAction}>
            <Step number={1} title="创建Git仓库">
              <p className="text-sm text-muted-foreground mb-2">在Gitea中创建新的Git仓库。</p>
              <p className="text-sm">
                1. 登录Gitea Web界面
                <br />
                2. 点击右上角"+"图标，选择"新建仓库"
                <br />
                3. 填写仓库信息：
                <br />- 仓库名称：project-name
                <br />- 描述：项目描述
                <br />- 可见性：私有
                <br />
                4. 点击"创建仓库"
              </p>
            </Step>

            <Step number={2} title="配置本地Git客户端" action={stepActions["git-config"]}>
              <p className="text-sm text-muted-foreground mb-2">配置开发机器上的Git客户端，连接到Gitea服务器。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 设置Git全局配置
                <br />
                git config --global user.name "Your Name"
                <br />
                git config --global user.email "your.email@example.com"
                <br />
                <br /># 克隆Gitea仓库
                <br />
                git clone http://mac-server:3000/username/project-name.git
              </div>
            </Step>

            <Step number={3} title="配置Git钩子" action={stepActions["git-hook"]}>
              <p className="text-sm text-muted-foreground mb-2">设置Git钩子，实现自动化操作。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 创建pre-commit钩子
                <br />
                {"cat > .git/hooks/pre-commit << 'EOF'"}
                <br />
                #!/bin/sh
                <br /># 运行代码检查
                <br />
                echo "Running code linting..."
                <br /># 添加您的代码检查命令
                <br /># 如果检查失败，返回非零状态码阻止提交
                <br />
                exit 0<br />
                {"EOF"}
                <br />
                <br /># 设置执行权限
                <br />
                chmod +x .git/hooks/pre-commit
              </div>
            </Step>
          </Steps>
        </TabsContent>

        <TabsContent value="github" className="space-y-4">
          <Steps onStepAction={handleStepAction}>
            <Step number={1} title="设置GitHub仓库">
              <p className="text-sm text-muted-foreground mb-2">在GitHub上创建对应的仓库，用于代码备份和协作。</p>
              <p className="text-sm">
                1. 登录GitHub账户
                <br />
                2. 点击&quot;New repository&quot;创建新仓库
                <br />
                3. 填写与Gitea相同的仓库名称和描述
                <br />
                4. 选择适当的可见性设置
                <br />
                5. 点击&quot;Create repository&quot;
              </p>
            </Step>

            <Step number={2} title="配置GitHub远程仓库" action={stepActions["github-remote"]}>
              <p className="text-sm text-muted-foreground mb-2">将GitHub仓库添加为本地Git的远程仓库。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 添加GitHub远程仓库
                <br />
                git remote add github https://github.com/username/project-name.git
                <br />
                <br /># 查看远程仓库列表
                <br />
                git remote -v
              </div>
            </Step>

            <Step number={3} title="设置自动同步" action={stepActions["github-sync"]}>
              <p className="text-sm text-muted-foreground mb-2">创建自动同步脚本，定期将Gitea仓库同步到GitHub。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 创建同步脚本
                <br />
                {"cat > ~/sync-to-github.sh << 'EOF'"}
                <br />
                #!/bin/bash
                <br /># 同步所有仓库到GitHub
                <br />
                cd ~/project-name
                <br />
                git fetch origin
                <br />
                git push github --all
                <br />
                git push github --tags
                <br />
                {'echo "Sync completed at $(date)"'}
                <br />
                {"EOF"}
                <br />
                <br /># 设置执行权限
                <br />
                chmod +x ~/sync-to-github.sh
                <br />
                <br /># 添加到crontab，每小时同步一次
                <br />
                {'(crontab -l 2>/dev/null; echo "0 * * * * ~/sync-to-github.sh >> ~/sync-log.txt 2>&1") | crontab -'}
              </div>
            </Step>
          </Steps>
        </TabsContent>
      </Tabs>

      <div className="prose max-w-none">
        <h4>下一步</h4>
        <p>完成Git服务搭建后，我们将在下一章节配置Vercel集成，实现自动化部署流程。</p>
      </div>

      {/* 操作对话框 */}
      <Dialog open={actionDialog.open} onOpenChange={(open) => setActionDialog({ ...actionDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionDialog.action?.title || "执行操作"}</DialogTitle>
            <DialogDescription>{actionDialog.action?.description || "您即将执行此操作，请确认。"}</DialogDescription>
          </DialogHeader>

          {actionDialog.action?.command && (
            <div className="bg-muted p-3 rounded text-sm font-mono my-4 max-h-60 overflow-y-auto">
              {actionDialog.action.command.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setActionDialog({ open: false, action: null })}>
              取消
            </Button>
            <Button onClick={executeAction}>复制命令</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
