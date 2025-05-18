import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Server } from "lucide-react"
import { Footer } from "@/app/components/layout/footer"
import { PageHeader } from "@/app/components/layout/page-header"
import { Steps, Step } from "@/app/components/steps"
import { Card, CardContent } from "@/components/ui/card"
import CodeDisplay from "@/app/components/code-display"
import CommandHelper from "@/app/components/command-helper"

export default function GiteaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 yanyu-gradient-bg -z-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl">
            <PageHeader title="Gitea安装与配置" description="在Mac M4上安装和配置轻量级Git服务Gitea" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Server className="h-4 w-4 text-primary" />
            <AlertTitle>系统要求</AlertTitle>
            <AlertDescription>
              Gitea对系统资源要求较低，可在大多数Mac设备上流畅运行。建议至少有2GB内存和10GB可用存储空间。
            </AlertDescription>
          </Alert>

          <Card className="yanyu-section">
            <CardContent className="pt-6">
              <div className="prose max-w-none mb-6">
                <h3>Gitea简介</h3>
                <p>
                  Gitea是一个轻量级的自托管Git服务，类似于GitHub/GitLab，但资源占用更少。它提供了完整的Git仓库管理、问题跟踪、代码审查和CI/CD集成等功能。
                </p>
                <p>
                  在Mac
                  M4上部署Gitea，可以为您提供一个私有的代码托管环境，同时与GitHub等公共平台保持同步，实现代码的本地存储和云端备份。
                </p>
              </div>

              <Steps>
                <Step number={1} title="使用Docker安装Gitea">
                  <p className="text-sm text-muted-foreground mb-2">通过Docker安装Gitea，简化部署和维护。</p>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">安装命令</span>
                    <CommandHelper
                      command={`# 创建Gitea数据目录
mkdir -p ~/gitea/data

# 启动Gitea容器
docker run -d --name=gitea \\
-p 3000:3000 -p 22:22 \\
-v ~/gitea/data:/data \\
-e USER_UID=1000 -e USER_GID=1000 \\
--restart always \\
gitea/gitea:latest`}
                      title="Gitea安装命令"
                      description="使用Docker安装Gitea服务"
                    />
                  </div>
                  <CodeDisplay
                    code={`# 创建Gitea数据目录
mkdir -p ~/gitea/data

# 启动Gitea容器
docker run -d --name=gitea \\
-p 3000:3000 -p 22:22 \\
-v ~/gitea/data:/data \\
-e USER_UID=1000 -e USER_GID=1000 \\
--restart always \\
gitea/gitea:latest`}
                    language="bash"
                    showLineNumbers={true}
                  />
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
                  <div className="mt-4 bg-muted/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">提示</h4>
                    <p className="text-sm text-muted-foreground">
                      如果您使用的是本地开发环境，可以使用 <span className="font-mono">http://localhost:3000</span>{" "}
                      访问Gitea。
                    </p>
                  </div>
                </Step>

                <Step number={3} title="配置Gitea服务">
                  <p className="text-sm text-muted-foreground mb-2">调整Gitea配置，优化性能和安全性。</p>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">配置命令</span>
                    <CommandHelper
                      command={`# 编辑Gitea配置文件
nano ~/gitea/data/gitea/conf/app.ini`}
                      title="Gitea配置命令"
                      description="编辑Gitea配置文件"
                    />
                  </div>
                  <CodeDisplay
                    code={`# 编辑Gitea配置文件
nano ~/gitea/data/gitea/conf/app.ini`}
                    language="bash"
                  />
                  <p className="text-sm mt-2">添加或修改以下配置：</p>
                  <CodeDisplay
                    code={`[server]
DOMAIN = mac-server
ROOT_URL = http://mac-server:3000/
SSH_DOMAIN = mac-server

[security]
INSTALL_LOCK = true
PASSWORD_HASH_ALGO = pbkdf2

[service]
DISABLE_REGISTRATION = true`}
                    language="ini"
                    showLineNumbers={true}
                  />
                  <p className="text-sm mt-2">保存配置后重启Gitea容器：</p>
                  <CodeDisplay code={`docker restart gitea`} language="bash" />
                </Step>
              </Steps>

              <div className="prose max-w-none mt-8">
                <h3>Gitea管理</h3>
                <p>完成安装后，您可以通过Web界面管理Gitea。以下是一些常用的管理任务：</p>
                <ul>
                  <li>创建新的组织和仓库</li>
                  <li>管理用户和权限</li>
                  <li>配置Webhook和集成</li>
                  <li>设置备份和恢复策略</li>
                </ul>
                <p>Gitea还提供了丰富的API，可以与其他工具和服务集成，实现自动化工作流。</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
