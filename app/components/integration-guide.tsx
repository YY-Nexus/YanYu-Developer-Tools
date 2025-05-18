import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, BellIcon as Vercel, Server, RefreshCw } from "lucide-react"

export function IntegrationGuide() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="github">
        <TabsList>
          <TabsTrigger value="github">GitHub集成</TabsTrigger>
          <TabsTrigger value="vercel">Vercel集成</TabsTrigger>
          <TabsTrigger value="sync">自动同步</TabsTrigger>
        </TabsList>

        <TabsContent value="github" className="space-y-4">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            <h3 className="font-medium">GitHub仓库设置</h3>
          </div>

          <div className="space-y-2">
            <p className="text-sm">1. 在Mac M4上设置Git远程仓库</p>
            <div className="bg-muted p-2 rounded text-sm font-mono">
              git remote add github https://github.com/username/repo.git
            </div>

            <p className="text-sm">2. 配置SSH密钥认证</p>
            <div className="bg-muted p-2 rounded text-sm font-mono">
              ssh-keygen -t ed25519 -C "your_email@example.com"
              <br />
              cat ~/.ssh/id_ed25519.pub
            </div>

            <p className="text-sm">3. 添加SSH密钥到GitHub账户</p>
          </div>
        </TabsContent>

        <TabsContent value="vercel" className="space-y-4">
          <div className="flex items-center gap-2">
            <Vercel className="h-5 w-5" />
            <h3 className="font-medium">Vercel项目配置</h3>
          </div>

          <div className="space-y-2">
            <p className="text-sm">1. 在Vercel中导入GitHub仓库</p>
            <p className="text-sm">2. 配置环境变量</p>
            <div className="bg-muted p-2 rounded text-sm font-mono">
              DATABASE_URL=xxx
              <br />
              API_KEY=xxx
            </div>

            <p className="text-sm">3. 设置自定义部署钩子</p>
            <div className="bg-muted p-2 rounded text-sm font-mono">
              https://api.vercel.com/v1/integrations/deploy/prj_xxxx
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            <h3 className="font-medium">自动同步配置</h3>
          </div>

          <div className="space-y-2">
            <p className="text-sm">1. 创建自动同步脚本</p>
            <div className="bg-muted p-2 rounded text-sm font-mono">
              #!/bin/bash
              <br />
              cd /path/to/repo
              <br />
              git fetch origin
              <br />
              git push --mirror github
              <br />
              curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_xxxx
            </div>

            <p className="text-sm">2. 设置定时任务</p>
            <div className="bg-muted p-2 rounded text-sm font-mono">
              # 编辑crontab
              <br />
              crontab -e
              <br />
              <br /># 每小时同步一次
              <br />0 * * * * /path/to/sync-script.sh
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Server className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">本地服务器</h3>
              <p className="text-sm text-muted-foreground mt-1">Mac M4作为核心服务器</p>
              <Button variant="outline" className="mt-4 w-full">
                配置指南
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Github className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">GitHub</h3>
              <p className="text-sm text-muted-foreground mt-1">代码存储与版本控制</p>
              <Button variant="outline" className="mt-4 w-full">
                连接设置
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Vercel className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-medium">Vercel</h3>
              <p className="text-sm text-muted-foreground mt-1">应用部署与托管</p>
              <Button variant="outline" className="mt-4 w-full">
                部署配置
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
