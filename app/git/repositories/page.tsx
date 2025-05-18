import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Database } from "lucide-react"
import { Footer } from "@/app/components/layout/footer"
import { PageHeader } from "@/app/components/layout/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeDisplay from "@/app/components/code-display"

export default function RepositoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 yanyu-gradient-bg -z-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl">
            <PageHeader title="Git仓库管理" description="创建和管理Git仓库，实现代码版本控制和团队协作" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Database className="h-4 w-4 text-primary" />
            <AlertTitle>仓库管理</AlertTitle>
            <AlertDescription>
              有效的仓库管理是Git工作流的基础。本指南将帮助您创建和管理仓库，设置权限，并实现与GitHub的同步。
            </AlertDescription>
          </Alert>

          <Card className="yanyu-section">
            <CardContent className="pt-6">
              <Tabs defaultValue="create">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="create" className="yanyu-tab">
                    创建仓库
                  </TabsTrigger>
                  <TabsTrigger value="manage" className="yanyu-tab">
                    管理仓库
                  </TabsTrigger>
                  <TabsTrigger value="sync" className="yanyu-tab">
                    GitHub同步
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="create">
                  <div className="prose max-w-none mb-6">
                    <h3>创建Git仓库</h3>
                    <p>在Gitea中创建仓库有两种方式：通过Web界面创建，或者通过命令行创建并推送到Gitea。</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-3">通过Web界面创建</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        <li>登录Gitea Web界面</li>
                        <li>点击右上角"+"图标，选择"新建仓库"</li>
                        <li>
                          填写仓库信息：
                          <ul className="list-disc pl-5 mt-1">
                            <li>仓库名称：project-name</li>
                            <li>描述：项目描述</li>
                            <li>可见性：私有或公开</li>
                            <li>初始化仓库：可选择添加README、.gitignore和许可证</li>
                          </ul>
                        </li>
                        <li>点击"创建仓库"</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">通过命令行创建</h4>
                      <CodeDisplay
                        code={`# 创建本地仓库
mkdir project-name
cd project-name
git init

# 添加一些文件
echo "# Project Name" > README.md
git add README.md
git commit -m "Initial commit"

# 添加远程仓库
git remote add origin http://mac-server:3000/username/project-name.git

# 推送到Gitea
git push -u origin master`}
                        language="bash"
                        showLineNumbers={true}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="manage">
                  <div className="prose max-w-none mb-6">
                    <h3>管理Git仓库</h3>
                    <p>有效的仓库管理包括设置权限、保护分支、配置Webhook等。</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-3">设置仓库权限</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        在Gitea中，您可以为不同的用户和团队设置不同的权限级别。
                      </p>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        <li>进入仓库设置页面</li>
                        <li>选择"协作者"选项卡</li>
                        <li>添加用户或团队，并设置权限级别（读取、写入、管理）</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">保护分支</h4>
                      <p className="text-sm text-muted-foreground mb-2">保护重要分支，防止意外修改或删除。</p>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        <li>进入仓库设置页面</li>
                        <li>选择"分支"选项卡</li>
                        <li>
                          添加保护规则，例如：
                          <ul className="list-disc pl-5 mt-1">
                            <li>禁止强制推送</li>
                            <li>要求拉取请求审核</li>
                            <li>限制特定用户或团队可以推送</li>
                          </ul>
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">配置Webhook</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Webhook可以在仓库发生特定事件时触发外部服务。
                      </p>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        <li>进入仓库设置页面</li>
                        <li>选择"Webhook"选项卡</li>
                        <li>点击"添加Webhook"，选择类型（Gitea、Slack、Discord等）</li>
                        <li>配置目标URL和触发事件</li>
                      </ol>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sync">
                  <div className="prose max-w-none mb-6">
                    <h3>GitHub同步</h3>
                    <p>将Gitea仓库与GitHub同步，实现代码的本地存储和云端备份。</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-3">配置GitHub远程仓库</h4>
                      <CodeDisplay
                        code={`# 添加GitHub远程仓库
git remote add github https://github.com/username/project-name.git

# 查看远程仓库列表
git remote -v`}
                        language="bash"
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">手动同步</h4>
                      <CodeDisplay
                        code={`# 推送到Gitea
git push origin master

# 推送到GitHub
git push github master`}
                        language="bash"
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">自动同步脚本</h4>
                      <CodeDisplay
                        code={`#!/bin/bash
# 保存为 ~/sync-to-github.sh

# 项目路径
PROJECT_PATH=~/project-name

# GitHub仓库
GITHUB_REPO="github"

# 切换到项目目录
cd $PROJECT_PATH

# 拉取最新代码
git fetch origin

# 推送到GitHub
git push $GITHUB_REPO --all
git push $GITHUB_REPO --tags

echo "Sync completed at $(date)"`}
                        language="bash"
                        showLineNumbers={true}
                      />
                      <p className="text-sm mt-2">设置定时任务，每小时自动同步：</p>
                      <CodeDisplay
                        code={`# 设置执行权限
chmod +x ~/sync-to-github.sh

# 添加到crontab
(crontab -l 2>/dev/null; echo "0 * * * * ~/sync-to-github.sh >> ~/sync-log.txt 2>&1") | crontab -`}
                        language="bash"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
