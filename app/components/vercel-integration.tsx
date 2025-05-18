"use client"

import { useState } from "react"
import { Rocket } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Steps, Step, type StepAction } from "./steps"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// 预设步骤操作
const stepActions: Record<string, StepAction> = {
  "vercel-cli": {
    id: "vercel-cli",
    title: "复制Vercel CLI安装命令",
    command: "npm install -g vercel && vercel login",
    description: "此命令将安装Vercel命令行工具，并登录您的Vercel账户",
  },
  "github-actions": {
    id: "github-actions",
    title: "复制GitHub Actions配置命令",
    command:
      "mkdir -p .github/workflows && cat > .github/workflows/deploy.yml << 'EOF'\nname: Deploy to Vercel\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - name: Deploy to Vercel\n        run: |\n          curl -X POST ${{ secrets.VERCEL_DEPLOY_HOOK }}\nEOF",
    description: "此命令将创建GitHub Actions配置文件，用于自动部署到Vercel",
  },
  "workflow-script": {
    id: "workflow-script",
    title: "复制工作流脚本命令",
    command:
      'cat > ~/dev-workflow.sh << \'EOF\'\n#!/bin/bash\n\n# 项目路径\nPROJECT_PATH=~/project-name\n\n# GitHub仓库\nGITHUB_REPO="github"\n\n# Vercel部署钩子\nVERCEL_HOOK="https://api.vercel.com/v1/integrations/deploy/prj_xxxxxxxxxxxx/yyyyyyyyyyy"\n\n# 切换到项目目录\ncd $PROJECT_PATH\n\n# 拉取最新代码\ngit pull origin main\n\n# 推送到GitHub\ngit push $GITHUB_REPO main\n\n# 触发Vercel部署\ncurl -X POST $VERCEL_HOOK\n\necho "Workflow completed at $(date)"\nEOF\nchmod +x ~/dev-workflow.sh',
    description: "此命令将创建一个自动化工作流脚本，简化整个部署流程",
  },
  notification: {
    id: "notification",
    title: "复制通知配置命令",
    command:
      'curl -X POST \\\n  -H "Content-Type: application/json" \\\n  -d \'{"text":"应用已成功部署到Vercel"}\' \\\n  https://your-notification-webhook-url',
    description: "此命令将发送部署完成通知到指定的Webhook URL",
  },
}

// 使用默认导出
export default function VercelIntegration() {
  const [activeTab, setActiveTab] = useState("setup")
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
        <h3>4.1 Vercel集成与自动部署</h3>
        <p>本章将指导您如何将本地Git服务与Vercel集成，实现代码提交后的自动部署流程。</p>
      </div>

      <Alert>
        <Rocket className="h-4 w-4" />
        <AlertTitle>自动化部署</AlertTitle>
        <AlertDescription>
          通过GitHub与Vercel的集成，我们可以实现代码提交后的自动构建和部署，简化开发流程。
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="setup" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="setup">Vercel设置</TabsTrigger>
          <TabsTrigger value="github">GitHub集成</TabsTrigger>
          <TabsTrigger value="workflow">自动化工作流</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-4">
          <Steps onStepAction={handleStepAction}>
            <Step number={1} title="创建Vercel账户">
              <p className="text-sm text-muted-foreground mb-2">如果还没有Vercel账户，需要先创建一个。</p>
              <p className="text-sm">
                1. 访问{" "}
                <a
                  href="https://vercel.com"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://vercel.com
                </a>
                <br />
                2. 点击"Sign Up"注册账户
                <br />
                3. 可以使用GitHub账户直接登录
              </p>
            </Step>

            <Step number={2} title="安装Vercel CLI" action={stepActions["vercel-cli"]}>
              <p className="text-sm text-muted-foreground mb-2">安装Vercel命令行工具，方便本地操作。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 安装Vercel CLI
                <br />
                npm install -g vercel
                <br />
                <br /># 登录Vercel账户
                <br />
                vercel login
              </div>
            </Step>

            <Step number={3} title="创建Vercel项目">
              <p className="text-sm text-muted-foreground mb-2">在Vercel上创建新项目，准备部署应用。</p>
              <p className="text-sm">
                1. 登录Vercel控制台
                <br />
                2. 点击"Add New..."，选择"Project"
                <br />
                3. 导入GitHub仓库
                <br />
                4. 配置项目设置：
                <br />- 项目名称
                <br />- 构建命令
                <br />- 输出目录
                <br />- 环境变量
                <br />
                5. 点击"Deploy"开始首次部署
              </p>
            </Step>
          </Steps>
        </TabsContent>

        <TabsContent value="github" className="space-y-4">
          <Steps onStepAction={handleStepAction}>
            <Step number={1} title="配置GitHub与Vercel集成">
              <p className="text-sm text-muted-foreground mb-2">确保GitHub仓库与Vercel正确集成。</p>
              <p className="text-sm">
                1. 在Vercel控制台，进入项目设置
                <br />
                2. 选择"Git Integration"选项卡
                <br />
                3. 确认GitHub仓库已连接
                <br />
                4. 配置部署分支（通常是main或master）
              </p>
            </Step>

            <Step number={2} title="配置部署钩子">
              <p className="text-sm text-muted-foreground mb-2">设置Vercel部署钩子，用于触发自动部署。</p>
              <p className="text-sm">
                1. 在Vercel项目设置中，找到"Git"部分
                <br />
                2. 复制"Deploy Hook" URL
                <br />
                3. 这个URL可以通过HTTP POST请求触发部署
              </p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 部署钩子URL格式
                <br />
                https://api.vercel.com/v1/integrations/deploy/prj_xxxxxxxxxxxx/yyyyyyyyyyy
              </div>
            </Step>

            <Step number={3} title="设置GitHub Actions" action={stepActions["github-actions"]}>
              <p className="text-sm text-muted-foreground mb-2">配置GitHub Actions，实现更复杂的CI/CD流程。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 在GitHub仓库中创建.github/workflows/deploy.yml文件
                <br />
                name: Deploy to Vercel
                <br />
                <br />
                on:
                <br />
                {"  push:"}
                <br />
                {"    branches: [ main ]"}
                <br />
                <br />
                jobs:
                <br />
                {"  deploy:"}
                <br />
                {"    runs-on: ubuntu-latest"}
                <br />
                {"    steps:"}
                <br />
                {"      - uses: actions/checkout@v2"}
                <br />
                {"      - name: Deploy to Vercel"}
                <br />
                {"        run: |"}
                <br />
                {"          curl -X POST ${{ secrets.VERCEL_DEPLOY_HOOK }}"}
              </div>
              <p className="text-sm mt-2">注意：需要在GitHub仓库的Secrets中添加VERCEL_DEPLOY_HOOK变量。</p>
            </Step>
          </Steps>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <Steps onStepAction={handleStepAction}>
            <Step number={1} title="设计自动化工作流">
              <p className="text-sm text-muted-foreground mb-2">设计完整的自动化工作流，从本地开发到Vercel部署。</p>
              <div className="bg-muted p-3 rounded text-sm">
                <strong>完整工作流程：</strong>
                <br />
                <br />
                1. 在本地开发机器上编写代码
                <br />
                2. 提交代码到本地Gitea仓库
                <br />
                3. Gitea自动同步到GitHub
                <br />
                4. GitHub触发Vercel部署
                <br />
                5. Vercel构建并部署应用
                <br />
                6. 部署完成后通知开发团队
              </div>
            </Step>

            <Step number={2} title="创建自动化脚本" action={stepActions["workflow-script"]}>
              <p className="text-sm text-muted-foreground mb-2">创建一个综合自动化脚本，简化整个工作流程。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 创建自动化脚本
                <br />
                {"cat > ~/dev-workflow.sh << 'EOF'"}
                <br />
                #!/bin/bash
                <br />
                <br /># 项目路径
                <br />
                PROJECT_PATH=~/project-name
                <br />
                <br /># GitHub仓库
                <br />
                GITHUB_REPO="github"
                <br />
                <br /># Vercel部署钩子
                <br />
                VERCEL_HOOK="https://api.vercel.com/v1/integrations/deploy/prj_xxxxxxxxxxxx/yyyyyyyyyyy"
                <br />
                <br /># 切换到项目目录
                <br />
                cd $PROJECT_PATH
                <br />
                <br /># 拉取最新代码
                <br />
                git pull origin main
                <br />
                <br /># 推送到GitHub
                <br />
                git push $GITHUB_REPO main
                <br />
                <br /># 触发Vercel部署
                <br />
                curl -X POST $VERCEL_HOOK
                <br />
                <br />
                {'echo "Workflow completed at $(date)"'}
                <br />
                {"EOF"}
                <br /># 设置执行权限
                <br />
                chmod +x ~/dev-workflow.sh
              </div>
            </Step>

            <Step number={3} title="设置部署通知" action={stepActions["notification"]}>
              <p className="text-sm text-muted-foreground mb-2">配置部署完成后的通知机制，及时获取部署状态。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 在Vercel项目设置中配置通知
                <br /># 1. 进入项目设置 → Notifications
                <br /># 2. 添加通知渠道：
                <br /># - Email
                <br /># - Slack
                <br /># - Discord
                <br /># - Microsoft Teams
                <br />
                <br /># 也可以通过API实现自定义通知
                <br />
                {"curl -X POST \\"}
                <br />
                {'  -H "Content-Type: application/json" \\'}
                <br />
                {'  -d \'{"text":"应用已成功部署到Vercel"}\' \\'}
                <br />
                {"  https://your-notification-webhook-url"}
              </div>
            </Step>
          </Steps>
        </TabsContent>
      </Tabs>

      <div className="prose max-w-none">
        <h4>总结</h4>
        <p>
          通过本教程，我们已经完成了从基础环境准备到Vercel自动部署的完整配置。这套系统充分利用了您的Mac设备性能，实现了本地开发、代码存储与云端部署的无缝集成。
        </p>
        <p>您现在拥有了一个功能完善的开发环境，可以专注于应用开发，而将繁琐的部署工作交给自动化流程处理。</p>
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
